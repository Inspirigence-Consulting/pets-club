import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  handleApiError,
  requireAuth,
  validateBody,
  slugify,
  errorResponse,
} from "@/lib/api-utils";

const createCategorySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
});

export async function GET() {
  try {
    await requireAuth(["ADMIN"]);

    const categories = await prisma.stockCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { items: true } },
      },
    });

    return jsonResponse(categories);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createCategorySchema, body);

    const slug = slugify(data.name);

    // Check for duplicate slug
    const existing = await prisma.stockCategory.findUnique({
      where: { slug },
    });
    if (existing) {
      return errorResponse("Une catégorie avec ce nom existe déjà", 409);
    }

    const category = await prisma.stockCategory.create({
      data: {
        name: data.name,
        slug,
      },
    });

    return jsonResponse(category, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
