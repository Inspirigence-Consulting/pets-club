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

const updateLitterSchema = z.object({
  name: z.string().min(1).optional(),
  sireId: z.string().min(1).optional(),
  damId: z.string().min(1).optional(),
  expectedDate: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
  birthDate: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
  weaningDate: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
  puppyCount: z.number().int().nonnegative().nullable().optional(),
  status: z
    .enum(["PLANNED", "EXPECTED", "BORN", "WEANED", "CLOSED"])
    .optional(),
  notes: z.string().nullable().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const litter = await prisma.litter.findUnique({
      where: { id },
      include: {
        sire: { select: { id: true, name: true, breed: true, photo: true } },
        dam: { select: { id: true, name: true, breed: true, photo: true } },
        puppies: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!litter) {
      return errorResponse("Portée non trouvée", 404);
    }

    return jsonResponse(litter);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.litter.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Portée non trouvée", 404);
    }

    const body = await request.json();
    const data = validateBody(updateLitterSchema, body);

    // Validate sire if changing
    if (data.sireId) {
      const sire = await prisma.dog.findUnique({
        where: { id: data.sireId },
      });
      if (!sire) return errorResponse("Père non trouvé", 404);
      if (sire.gender !== "MALE")
        return errorResponse("Le père doit être un mâle", 400);
    }

    // Validate dam if changing
    if (data.damId) {
      const dam = await prisma.dog.findUnique({ where: { id: data.damId } });
      if (!dam) return errorResponse("Mère non trouvée", 404);
      if (dam.gender !== "FEMALE")
        return errorResponse("La mère doit être une femelle", 400);
    }

    const litter = await prisma.litter.update({
      where: { id },
      data,
      include: {
        sire: { select: { id: true, name: true, breed: true } },
        dam: { select: { id: true, name: true, breed: true } },
        _count: { select: { puppies: true } },
      },
    });

    return jsonResponse(litter);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.litter.findUnique({
      where: { id },
      include: { _count: { select: { puppies: true } } },
    });

    if (!existing) {
      return errorResponse("Portée non trouvée", 404);
    }

    if (existing._count.puppies > 0) {
      return errorResponse(
        "Impossible de supprimer une portée contenant des chiots. Supprimez d'abord les chiots.",
        409
      );
    }

    await prisma.litter.delete({ where: { id } });

    return jsonResponse({ message: "Portée supprimée avec succès" });
  } catch (error) {
    return handleApiError(error);
  }
}
