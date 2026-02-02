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

const updateDogSchema = z.object({
  name: z.string().min(1).optional(),
  breed: z.string().min(1).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  dateOfBirth: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  color: z.string().min(1).optional(),
  weight: z.number().positive().nullable().optional(),
  registrationNumber: z.string().nullable().optional(),
  microchipNumber: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
  photos: z.array(z.string()).optional(),
  titles: z.array(z.string()).optional(),
  healthTests: z.any().optional(),
  isBreeder: z.boolean().optional(),
  status: z.enum(["ACTIVE", "RETIRED", "DECEASED"]).optional(),
  description: z.string().nullable().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const dog = await prisma.dog.findUnique({
      where: { id },
      include: {
        siredLitters: {
          include: { _count: { select: { puppies: true } } },
        },
        damLitters: {
          include: { _count: { select: { puppies: true } } },
        },
        vetRecords: { orderBy: { date: "desc" } },
        heatCycles: { orderBy: { startDate: "desc" } },
      },
    });

    if (!dog) {
      return errorResponse("Chien non trouvé", 404);
    }

    return jsonResponse(dog);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.dog.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Chien non trouvé", 404);
    }

    const body = await request.json();
    const data = validateBody(updateDogSchema, body);

    const dog = await prisma.dog.update({
      where: { id },
      data,
    });

    return jsonResponse(dog);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.dog.findUnique({
      where: { id },
      include: {
        _count: {
          select: { siredLitters: true, damLitters: true },
        },
      },
    });

    if (!existing) {
      return errorResponse("Chien non trouvé", 404);
    }

    if (existing._count.siredLitters > 0 || existing._count.damLitters > 0) {
      return errorResponse(
        "Impossible de supprimer un chien associé à des portées. Changez son statut en RETIRED.",
        409
      );
    }

    await prisma.dog.delete({ where: { id } });

    return jsonResponse({ message: "Chien supprimé avec succès" });
  } catch (error) {
    return handleApiError(error);
  }
}
