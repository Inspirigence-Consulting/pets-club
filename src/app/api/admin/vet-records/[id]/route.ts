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

const updateVetRecordSchema = z.object({
  date: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  type: z
    .enum(["VACCINE", "DEWORMING", "CHECKUP", "SURGERY", "TREATMENT", "OTHER"])
    .optional(),
  description: z.string().min(1).optional(),
  product: z.string().nullable().optional(),
  dose: z.string().nullable().optional(),
  cost: z.number().nonnegative().nullable().optional(),
  nextDueDate: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
  vetName: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  dogId: z.string().nullable().optional(),
  puppyId: z.string().nullable().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const record = await prisma.vetRecord.findUnique({
      where: { id },
      include: {
        dog: { select: { id: true, name: true, breed: true, photo: true } },
        puppy: {
          select: { id: true, name: true, slug: true, photos: true },
        },
      },
    });

    if (!record) {
      return errorResponse("Fiche vétérinaire non trouvée", 404);
    }

    return jsonResponse(record);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.vetRecord.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Fiche vétérinaire non trouvée", 404);
    }

    const body = await request.json();
    const data = validateBody(updateVetRecordSchema, body);

    // Validate dog if changing
    if (data.dogId) {
      const dog = await prisma.dog.findUnique({ where: { id: data.dogId } });
      if (!dog) return errorResponse("Chien non trouvé", 404);
    }

    // Validate puppy if changing
    if (data.puppyId) {
      const puppy = await prisma.puppy.findUnique({
        where: { id: data.puppyId },
      });
      if (!puppy) return errorResponse("Chiot non trouvé", 404);
    }

    const record = await prisma.vetRecord.update({
      where: { id },
      data,
      include: {
        dog: { select: { id: true, name: true } },
        puppy: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(record);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.vetRecord.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Fiche vétérinaire non trouvée", 404);
    }

    await prisma.vetRecord.delete({ where: { id } });

    return jsonResponse({ message: "Fiche vétérinaire supprimée avec succès" });
  } catch (error) {
    return handleApiError(error);
  }
}
