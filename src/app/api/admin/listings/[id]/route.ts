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

const moderateListingSchema = z.object({
  status: z.enum(["PUBLISHED", "REJECTED"]),
  rejectionReason: z.string().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.listing.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Annonce non trouvée", 404);
    }

    const body = await request.json();
    const data = validateBody(moderateListingSchema, body);

    // Require a reason when rejecting
    if (data.status === "REJECTED" && !data.rejectionReason) {
      return errorResponse("Une raison de rejet est requise", 400);
    }

    const updateData: Record<string, unknown> = {
      status: data.status,
    };

    if (data.status === "PUBLISHED") {
      updateData.publishedAt = new Date();
      // Set expiry to 30 days from now
      updateData.expiresAt = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      );
      updateData.rejectionReason = null;
    }

    if (data.status === "REJECTED") {
      updateData.rejectionReason = data.rejectionReason;
      updateData.publishedAt = null;
      updateData.expiresAt = null;
    }

    const listing = await prisma.listing.update({
      where: { id },
      data: updateData,
      include: {
        vendor: {
          select: {
            id: true,
            shopName: true,
            user: { select: { name: true, email: true } },
          },
        },
      },
    });

    return jsonResponse(listing);
  } catch (error) {
    return handleApiError(error);
  }
}
