import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonResponse, handleApiError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const breed = searchParams.get("breed");
    const city = searchParams.get("city");
    const gender = searchParams.get("gender");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "12", 10);
    const sort = searchParams.get("sort") ?? "recent";

    const where: Record<string, unknown> = {
      status: "PUBLISHED",
    };

    if (breed) {
      where.breed = { contains: breed, mode: "insensitive" };
    }
    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }
    if (gender && (gender === "MALE" || gender === "FEMALE")) {
      where.gender = gender;
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice)
        (where.price as Record<string, unknown>).gte = parseFloat(minPrice);
      if (maxPrice)
        (where.price as Record<string, unknown>).lte = parseFloat(maxPrice);
    }

    // Determine sort order
    let orderBy: Record<string, string>;
    switch (sort) {
      case "price_asc":
        orderBy = { price: "asc" };
        break;
      case "price_desc":
        orderBy = { price: "desc" };
        break;
      case "recent":
      default:
        orderBy = { publishedAt: "desc" };
        break;
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          breed: true,
          gender: true,
          age: true,
          price: true,
          photos: true,
          city: true,
          slug: true,
          publishedAt: true,
          vendor: {
            select: {
              id: true,
              shopName: true,
              photo: true,
              city: true,
            },
          },
          _count: { select: { favorites: true } },
        },
      }),
      prisma.listing.count({ where }),
    ]);

    return jsonResponse({
      data: listings,
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
