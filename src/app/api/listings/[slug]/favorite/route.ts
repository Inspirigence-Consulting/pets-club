import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  errorResponse,
  handleApiError,
  requireAuth,
} from "@/lib/api-utils";

type RouteParams = { params: Promise<{ slug: string }> };

export async function POST(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    const { slug } = await params;

    const listing = await prisma.listing.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!listing) {
      return errorResponse("Annonce non trouvée", 404);
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: session.user.id,
          listingId: listing.id,
        },
      },
    });

    if (existing) {
      // Remove favorite
      await prisma.favorite.delete({
        where: { id: existing.id },
      });
      return jsonResponse({ favorited: false });
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          listingId: listing.id,
        },
      });
      return jsonResponse({ favorited: true }, 201);
    }
  } catch (error) {
    return handleApiError(error);
  }
}
