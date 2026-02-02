import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  errorResponse,
  handleApiError,
  requireAuth,
  validateBody,
  slugify,
} from "@/lib/api-utils";

const updateCategorySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.stockCategory.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Catégorie non trouvée", 404);
    }

    const body = await request.json();
    const data = validateBody(updateCategorySchema, body);

    const slug = slugify(data.name);

    // Check for duplicate slug (excluding current)
    const duplicate = await prisma.stockCategory.findFirst({
      where: { slug, id: { not: id } },
    });
    if (duplicate) {
      return errorResponse("Une catégorie avec ce nom existe déjà", 409);
    }

    const category = await prisma.stockCategory.update({
      where: { id },
      data: { name: data.name, slug },
    });

    return jsonResponse(category);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.stockCategory.findUnique({
      where: { id },
      include: { _count: { select: { items: true } } },
    });

    if (!existing) {
      return errorResponse("Catégorie non trouvée", 404);
    }

    if (existing._count.items > 0) {
      return errorResponse(
        "Impossible de supprimer une catégorie contenant des articles. Déplacez ou supprimez les articles d'abord.",
        409
      );
    }

    await prisma.stockCategory.delete({ where: { id } });

    return jsonResponse({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    return handleApiError(error);
  }
}
