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

const createLitterSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  sireId: z.string().min(1, "Le père est requis"),
  damId: z.string().min(1, "La mère est requise"),
  expectedDate: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  birthDate: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  weaningDate: z
    .string()
    .transform((s) => new Date(s))
    .optional(),
  puppyCount: z.number().int().nonnegative().optional(),
  status: z
    .enum(["PLANNED", "EXPECTED", "BORN", "WEANED", "CLOSED"])
    .optional(),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    await requireAuth(["ADMIN"]);

    const litters = await prisma.litter.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        sire: { select: { id: true, name: true, breed: true, photo: true } },
        dam: { select: { id: true, name: true, breed: true, photo: true } },
        _count: { select: { puppies: true } },
      },
    });

    return jsonResponse(litters);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createLitterSchema, body);

    // Validate sire exists and is MALE
    const sire = await prisma.dog.findUnique({ where: { id: data.sireId } });
    if (!sire) {
      return errorResponse("Père non trouvé", 404);
    }
    if (sire.gender !== "MALE") {
      return errorResponse("Le père doit être un mâle", 400);
    }

    // Validate dam exists and is FEMALE
    const dam = await prisma.dog.findUnique({ where: { id: data.damId } });
    if (!dam) {
      return errorResponse("Mère non trouvée", 404);
    }
    if (dam.gender !== "FEMALE") {
      return errorResponse("La mère doit être une femelle", 400);
    }

    const litter = await prisma.litter.create({
      data: {
        name: data.name,
        sireId: data.sireId,
        damId: data.damId,
        expectedDate: data.expectedDate,
        birthDate: data.birthDate,
        weaningDate: data.weaningDate,
        puppyCount: data.puppyCount,
        status: data.status ?? "PLANNED",
        notes: data.notes,
      },
      include: {
        sire: { select: { id: true, name: true, breed: true } },
        dam: { select: { id: true, name: true, breed: true } },
      },
    });

    return jsonResponse(litter, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
