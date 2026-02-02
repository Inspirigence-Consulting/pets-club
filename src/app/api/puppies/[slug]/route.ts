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

    const puppy = await prisma.puppy.findUnique({
      where: { slug },
      include: {
        litter: {
          include: {
            sire: {
              select: {
                id: true,
                name: true,
                breed: true,
                color: true,
                photo: true,
                photos: true,
                titles: true,
                healthTests: true,
              },
            },
            dam: {
              select: {
                id: true,
                name: true,
                breed: true,
                color: true,
                photo: true,
                photos: true,
                titles: true,
                healthTests: true,
              },
            },
          },
        },
        vetRecords: {
          where: {
            type: { in: ["VACCINE", "DEWORMING", "CHECKUP"] },
          },
          orderBy: { date: "desc" },
          select: {
            id: true,
            date: true,
            type: true,
            description: true,
            product: true,
          },
        },
      },
    });

    if (!puppy) {
      return errorResponse("Chiot non trouvé", 404);
    }

    // Only show available puppies publicly
    if (puppy.status !== "AVAILABLE") {
      return errorResponse("Chiot non disponible", 404);
    }

    return jsonResponse(puppy);
  } catch (error) {
    return handleApiError(error);
  }
}
