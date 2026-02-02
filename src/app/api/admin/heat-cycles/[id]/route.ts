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

const updateHeatCycleSchema = z.object({
  dogId: z.string().min(1).optional(),
  startDate: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  endDate: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
  matingDate: z
    .string()
    .transform((s) => new Date(s))
    .nullable()
    .optional(),
  matingPartnerId: z.string().nullable().optional(),
  litterId: z.string().nullable().optional(),
  successful: z.boolean().nullable().optional(),
  notes: z.string().nullable().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const cycle = await prisma.heatCycle.findUnique({
      where: { id },
      include: {
        dog: { select: { id: true, name: true, breed: true, photo: true } },
        matingPartner: {
          select: { id: true, name: true, breed: true, photo: true },
        },
      },
    });

    if (!cycle) {
      return errorResponse("Cycle de chaleur non trouvé", 404);
    }

    return jsonResponse(cycle);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.heatCycle.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Cycle de chaleur non trouvé", 404);
    }

    const body = await request.json();
    const data = validateBody(updateHeatCycleSchema, body);

    // Validate dog if changing
    if (data.dogId) {
      const dog = await prisma.dog.findUnique({ where: { id: data.dogId } });
      if (!dog) return errorResponse("Chien non trouvé", 404);
      if (dog.gender !== "FEMALE") {
        return errorResponse(
          "Les cycles de chaleur ne s'appliquent qu'aux femelles",
          400
        );
      }
    }

    // Validate mating partner if changing
    if (data.matingPartnerId) {
      const partner = await prisma.dog.findUnique({
        where: { id: data.matingPartnerId },
      });
      if (!partner) return errorResponse("Partenaire non trouvé", 404);
      if (partner.gender !== "MALE") {
        return errorResponse("Le partenaire doit être un mâle", 400);
      }
    }

    const cycle = await prisma.heatCycle.update({
      where: { id },
      data,
      include: {
        dog: { select: { id: true, name: true } },
        matingPartner: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(cycle);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.heatCycle.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Cycle de chaleur non trouvé", 404);
    }

    await prisma.heatCycle.delete({ where: { id } });

    return jsonResponse({
      message: "Cycle de chaleur supprimé avec succès",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
