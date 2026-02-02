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

const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().nullable().optional(),
  categoryId: z.string().min(1).optional(),
  quantity: z.number().nonnegative().optional(),
  minQuantity: z.number().nonnegative().optional(),
  unit: z.enum(["KG", "UNIT", "LITER", "BOX", "BAG", "DOSE"]).optional(),
  costPrice: z.number().nonnegative().nullable().optional(),
  supplier: z.string().nullable().optional(),
  expiryDate: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
  notes: z.string().nullable().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const item = await prisma.stockItem.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        movements: {
          orderBy: { date: "desc" },
          take: 20,
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!item) {
      return errorResponse("Article non trouvé", 404);
    }

    return jsonResponse(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.stockItem.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Article non trouvé", 404);
    }

    const body = await request.json();
    const data = validateBody(updateItemSchema, body);

    // Validate category if changing
    if (data.categoryId) {
      const category = await prisma.stockCategory.findUnique({
        where: { id: data.categoryId },
      });
      if (!category) return errorResponse("Catégorie non trouvée", 404);
    }

    // Check unique SKU if changing
    if (data.sku) {
      const duplicate = await prisma.stockItem.findFirst({
        where: { sku: data.sku, id: { not: id } },
      });
      if (duplicate) {
        return errorResponse("Un article avec ce SKU existe déjà", 409);
      }
    }

    const item = await prisma.stockItem.update({
      where: { id },
      data,
      include: {
        category: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.stockItem.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Article non trouvé", 404);
    }

    // Delete associated movements first
    await prisma.stockMovement.deleteMany({ where: { itemId: id } });
    await prisma.stockItem.delete({ where: { id } });

    return jsonResponse({ message: "Article supprimé avec succès" });
  } catch (error) {
    return handleApiError(error);
  }
}
