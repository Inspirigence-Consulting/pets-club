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

const createItemSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  sku: z.string().optional(),
  categoryId: z.string().min(1, "La catégorie est requise"),
  quantity: z.number().nonnegative().optional(),
  minQuantity: z.number().nonnegative().optional(),
  unit: z.enum(["KG", "UNIT", "LITER", "BOX", "BAG", "DOSE"]).optional(),
  costPrice: z.number().nonnegative().optional(),
  supplier: z.string().optional(),
  expiryDate: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const { searchParams } = new URL(request.url);
    const lowStock = searchParams.get("lowStock");
    const categoryId = searchParams.get("categoryId");

    const where: Record<string, unknown> = {};
    if (categoryId) where.categoryId = categoryId;

    const items = await prisma.stockItem.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    // Filter low stock items if requested
    const result =
      lowStock === "true"
        ? items.filter(
            (item: { quantity: number; minQuantity: number }) =>
              item.quantity <= item.minQuantity
          )
        : items;

    return jsonResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createItemSchema, body);

    // Validate category exists
    const category = await prisma.stockCategory.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      return errorResponse("Catégorie non trouvée", 404);
    }

    // Check unique SKU if provided
    if (data.sku) {
      const existingSku = await prisma.stockItem.findUnique({
        where: { sku: data.sku },
      });
      if (existingSku) {
        return errorResponse("Un article avec ce SKU existe déjà", 409);
      }
    }

    const item = await prisma.stockItem.create({
      data: {
        name: data.name,
        sku: data.sku,
        categoryId: data.categoryId,
        quantity: data.quantity ?? 0,
        minQuantity: data.minQuantity ?? 0,
        unit: data.unit ?? "UNIT",
        costPrice: data.costPrice,
        supplier: data.supplier,
        expiryDate: data.expiryDate,
        notes: data.notes,
      },
      include: {
        category: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(item, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
