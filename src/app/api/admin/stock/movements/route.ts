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

const createMovementSchema = z.object({
  itemId: z.string().min(1, "L'article est requis"),
  type: z.enum(["IN", "OUT", "ADJUSTMENT"]),
  quantity: z.number().positive("La quantité doit être positive"),
  reason: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    const where: Record<string, unknown> = {};
    if (itemId) where.itemId = itemId;

    const movements = await prisma.stockMovement.findMany({
      where,
      orderBy: { date: "desc" },
      include: {
        item: { select: { id: true, name: true, sku: true, unit: true } },
        user: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(movements);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createMovementSchema, body);

    // Validate item exists
    const item = await prisma.stockItem.findUnique({
      where: { id: data.itemId },
    });
    if (!item) {
      return errorResponse("Article non trouvé", 404);
    }

    // Calculate new quantity based on movement type
    let newQuantity: number;
    switch (data.type) {
      case "IN":
        newQuantity = item.quantity + data.quantity;
        break;
      case "OUT":
        newQuantity = item.quantity - data.quantity;
        if (newQuantity < 0) {
          return errorResponse(
            `Stock insuffisant. Quantité actuelle: ${item.quantity} ${item.unit}`,
            400
          );
        }
        break;
      case "ADJUSTMENT":
        newQuantity = data.quantity;
        break;
    }

    // Use a transaction to ensure atomicity
    const [movement] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: {
          itemId: data.itemId,
          type: data.type,
          quantity: data.quantity,
          reason: data.reason,
          userId: session.user.id,
        },
        include: {
          item: { select: { id: true, name: true, sku: true, unit: true } },
          user: { select: { id: true, name: true } },
        },
      }),
      prisma.stockItem.update({
        where: { id: data.itemId },
        data: { quantity: newQuantity },
      }),
    ]);

    return jsonResponse(movement, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
