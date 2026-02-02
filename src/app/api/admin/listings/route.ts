import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonResponse, handleApiError, requireAuth } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const listings = await prisma.listing.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        vendor: {
          select: {
            id: true,
            shopName: true,
            city: true,
            user: { select: { name: true, email: true } },
          },
        },
      },
    });

    return jsonResponse(listings);
  } catch (error) {
    return handleApiError(error);
  }
}
