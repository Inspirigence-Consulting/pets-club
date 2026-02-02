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

const createHeatCycleSchema = z.object({
  dogId: z.string().min(1, "Le chien est requis"),
  startDate: z.string().transform((s) => new Date(s)),
  endDate: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  matingDate: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  matingPartnerId: z.string().optional(),
  litterId: z.string().optional(),
  successful: z.boolean().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    await requireAuth(["ADMIN"]);

    const cycles = await prisma.heatCycle.findMany({
      orderBy: { startDate: "desc" },
      include: {
        dog: { select: { id: true, name: true, breed: true } },
        matingPartner: { select: { id: true, name: true, breed: true } },
      },
    });

    return jsonResponse(cycles);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createHeatCycleSchema, body);

    // Validate dog exists and is female
    const dog = await prisma.dog.findUnique({ where: { id: data.dogId } });
    if (!dog) return errorResponse("Chien non trouvé", 404);
    if (dog.gender !== "FEMALE") {
      return errorResponse(
        "Les cycles de chaleur ne s'appliquent qu'aux femelles",
        400
      );
    }

    // Validate mating partner if provided
    if (data.matingPartnerId) {
      const partner = await prisma.dog.findUnique({
        where: { id: data.matingPartnerId },
      });
      if (!partner) return errorResponse("Partenaire non trouvé", 404);
      if (partner.gender !== "MALE") {
        return errorResponse("Le partenaire doit être un mâle", 400);
      }
    }

    const cycle = await prisma.heatCycle.create({
      data: {
        dogId: data.dogId,
        startDate: data.startDate,
        endDate: data.endDate,
        matingDate: data.matingDate,
        matingPartnerId: data.matingPartnerId,
        litterId: data.litterId,
        successful: data.successful,
        notes: data.notes,
      },
      include: {
        dog: { select: { id: true, name: true } },
        matingPartner: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(cycle, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
