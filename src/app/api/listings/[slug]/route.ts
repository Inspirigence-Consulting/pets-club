import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-utils";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const listing = await prisma.listing.findUnique({
      where: { slug },
      include: {
        vendor: {
          select: {
            id: true,
            shopName: true,
            description: true,
            city: true,
            photo: true,
            phone: true,
            _count: { select: { listings: true } },
          },
        },
        _count: { select: { favorites: true } },
      },
    });

    if (!listing) {
      return errorResponse("Annonce non trouvée", 404);
    }

    // Only show published listings publicly
    if (listing.status !== "PUBLISHED") {
      return errorResponse("Annonce non disponible", 404);
    }

    return jsonResponse(listing);
  } catch (error) {
    return handleApiError(error);
  }
}
