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

const updatePuppySchema = z.object({
  name: z.string().min(1).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  color: z.string().min(1).optional(),
  dateOfBirth: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  microchipNumber: z.string().nullable().optional(),
  weight: z.number().positive().nullable().optional(),
  price: z.number().nonnegative().nullable().optional(),
  description: z.string().nullable().optional(),
  photos: z.array(z.string()).optional(),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "KEPT"]).optional(),
  litterId: z.string().min(1).optional(),
  buyerName: z.string().nullable().optional(),
  buyerEmail: z.string().email().nullable().optional(),
  buyerPhone: z.string().nullable().optional(),
  soldAt: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const puppy = await prisma.puppy.findUnique({
      where: { id },
      include: {
        litter: {
          include: {
            sire: {
              select: { id: true, name: true, breed: true, photo: true },
            },
            dam: {
              select: { id: true, name: true, breed: true, photo: true },
            },
          },
        },
        vetRecords: { orderBy: { date: "desc" } },
      },
    });

    if (!puppy) {
      return errorResponse("Chiot non trouvé", 404);
    }

    return jsonResponse(puppy);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.puppy.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Chiot non trouvé", 404);
    }

    const body = await request.json();
    const data = validateBody(updatePuppySchema, body);

    // Validate litter if changing
    if (data.litterId) {
      const litter = await prisma.litter.findUnique({
        where: { id: data.litterId },
      });
      if (!litter) return errorResponse("Portée non trouvée", 404);
    }

    // Auto-set soldAt if status changes to SOLD
    const updateData: Record<string, unknown> = { ...data };
    if (data.status === "SOLD" && !existing.soldAt && !data.soldAt) {
      updateData.soldAt = new Date();
    }

    const puppy = await prisma.puppy.update({
      where: { id },
      data: updateData,
      include: {
        litter: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(puppy);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.puppy.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Chiot non trouvé", 404);
    }

    // Delete associated vet records first
    await prisma.vetRecord.deleteMany({ where: { puppyId: id } });
    await prisma.puppy.delete({ where: { id } });

    return jsonResponse({ message: "Chiot supprimé avec succès" });
  } catch (error) {
    return handleApiError(error);
  }
}
