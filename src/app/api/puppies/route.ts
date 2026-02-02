import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonResponse, handleApiError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const breed = searchParams.get("breed");
    const gender = searchParams.get("gender");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "12", 10);

    const where: Record<string, unknown> = {
      status: "AVAILABLE",
    };
    if (breed) where.litter = { sire: { breed: { contains: breed, mode: "insensitive" } } };
    if (gender && (gender === "MALE" || gender === "FEMALE")) {
      where.gender = gender;
    }

    const [puppies, total] = await Promise.all([
      prisma.puppy.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          gender: true,
          color: true,
          dateOfBirth: true,
          price: true,
          photos: true,
          slug: true,
          status: true,
          litter: {
            select: {
              id: true,
              name: true,
              sire: {
                select: {
                  id: true,
                  name: true,
                  breed: true,
                  photo: true,
                },
              },
              dam: {
                select: {
                  id: true,
                  name: true,
                  breed: true,
                  photo: true,
                },
              },
            },
          },
        },
      }),
      prisma.puppy.count({ where }),
    ]);

    return jsonResponse({
      data: puppies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
