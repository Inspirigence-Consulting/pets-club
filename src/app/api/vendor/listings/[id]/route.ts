import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  errorResponse,
  handleApiError,
  requireAuth,
  validateBody,
} from "@/lib/api-utils";

const updateListingSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(20).optional(),
  breed: z.string().min(1).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  age: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  photos: z.array(z.string()).min(1).optional(),
  city: z.string().min(1).optional(),
  phone: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PENDING_REVIEW"]).optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

async function getVendorListing(session: { user: { id: string } }, id: string) {
  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.user.id },
  });

  if (!vendor) {
    return { error: errorResponse("Profil vendeur requis", 403) };
  }

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) {
    return { error: errorResponse("Annonce non trouvée", 404) };
  }

  if (listing.vendorId !== vendor.id) {
    return { error: errorResponse("Accès non autorisé à cette annonce", 403) };
  }

  return { listing, vendor };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);
    const { id } = await params;

    const result = await getVendorListing(session, id);
    if ("error" in result && result.error) return result.error;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        vendor: {
          select: { id: true, shopName: true, city: true },
        },
        _count: { select: { favorites: true } },
      },
    });

    return jsonResponse(listing);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);
    const { id } = await params;

    const result = await getVendorListing(session, id);
    if ("error" in result && result.error) return result.error;

    const body = await request.json();
    const data = validateBody(updateListingSchema, body);

    // If listing was rejected and vendor resubmits, reset status flow
    const updateData: Record<string, unknown> = { ...data };
    if (
      result.listing!.status === "REJECTED" &&
      data.status === "PENDING_REVIEW"
    ) {
      updateData.rejectionReason = null;
    }

    const listing = await prisma.listing.update({
      where: { id },
      data: updateData,
    });

    return jsonResponse(listing);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);
    const { id } = await params;

    const result = await getVendorListing(session, id);
    if ("error" in result && result.error) return result.error;

    await prisma.$transaction([
      prisma.favorite.deleteMany({ where: { listingId: id } }),
      prisma.listing.delete({ where: { id } }),
    ]);

    return jsonResponse({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    return handleApiError(error);
  }
}
