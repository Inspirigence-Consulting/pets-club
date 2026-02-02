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

const createVetRecordSchema = z
  .object({
    date: z.string().transform((s) => new Date(s)),
    type: z.enum([
      "VACCINE",
      "DEWORMING",
      "CHECKUP",
      "SURGERY",
      "TREATMENT",
      "OTHER",
    ]),
    description: z.string().min(1, "La description est requise"),
    product: z.string().optional(),
    dose: z.string().optional(),
    cost: z.number().nonnegative().optional(),
    nextDueDate: z
      .string()
      .transform((s) => new Date(s))
      .optional(),
    vetName: z.string().optional(),
    notes: z.string().optional(),
    dogId: z.string().optional(),
    puppyId: z.string().optional(),
  })
  .refine((data) => data.dogId || data.puppyId, {
    message: "Un dogId ou puppyId est requis",
  });

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const { searchParams } = new URL(request.url);
    const dogId = searchParams.get("dogId");
    const puppyId = searchParams.get("puppyId");
    const upcoming = searchParams.get("upcoming");

    const where: Record<string, unknown> = {};
    if (dogId) where.dogId = dogId;
    if (puppyId) where.puppyId = puppyId;
    if (upcoming === "true") {
      where.nextDueDate = {
        gte: new Date(),
        lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // next 30 days
      };
    }

    const records = await prisma.vetRecord.findMany({
      where,
      orderBy: { date: "desc" },
      include: {
        dog: { select: { id: true, name: true, breed: true } },
        puppy: { select: { id: true, name: true, slug: true } },
      },
    });

    return jsonResponse(records);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createVetRecordSchema, body);

    // Validate dog exists if provided
    if (data.dogId) {
      const dog = await prisma.dog.findUnique({ where: { id: data.dogId } });
      if (!dog) return errorResponse("Chien non trouvé", 404);
    }

    // Validate puppy exists if provided
    if (data.puppyId) {
      const puppy = await prisma.puppy.findUnique({
        where: { id: data.puppyId },
      });
      if (!puppy) return errorResponse("Chiot non trouvé", 404);
    }

    const record = await prisma.vetRecord.create({
      data: {
        date: data.date,
        type: data.type,
        description: data.description,
        product: data.product,
        dose: data.dose,
        cost: data.cost,
        nextDueDate: data.nextDueDate,
        vetName: data.vetName,
        notes: data.notes,
        dogId: data.dogId,
        puppyId: data.puppyId,
      },
      include: {
        dog: { select: { id: true, name: true } },
        puppy: { select: { id: true, name: true } },
      },
    });

    return jsonResponse(record, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
