import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  handleApiError,
  requireAuth,
  validateBody,
} from "@/lib/api-utils";

const createDogSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  breed: z.string().min(1, "La race est requise"),
  gender: z.enum(["MALE", "FEMALE"]),
  dateOfBirth: z.string().transform((s) => new Date(s)),
  color: z.string().min(1, "La couleur est requise"),
  weight: z.number().positive().optional(),
  registrationNumber: z.string().optional(),
  microchipNumber: z.string().optional(),
  photo: z.string().optional(),
  photos: z.array(z.string()).optional(),
  titles: z.array(z.string()).optional(),
  healthTests: z.any().optional(),
  isBreeder: z.boolean().optional(),
  status: z.enum(["ACTIVE", "RETIRED", "DECEASED"]).optional(),
  description: z.string().optional(),
});

export async function GET() {
  try {
    await requireAuth(["ADMIN"]);

    const dogs = await prisma.dog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            siredLitters: true,
            damLitters: true,
            vetRecords: true,
          },
        },
      },
    });

    return jsonResponse(dogs);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createDogSchema, body);

    const dog = await prisma.dog.create({
      data: {
        name: data.name,
        breed: data.breed,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        color: data.color,
        weight: data.weight,
        registrationNumber: data.registrationNumber,
        microchipNumber: data.microchipNumber,
        photo: data.photo,
        photos: data.photos ?? [],
        titles: data.titles ?? [],
        healthTests: data.healthTests,
        isBreeder: data.isBreeder ?? true,
        status: data.status ?? "ACTIVE",
        description: data.description,
      },
    });

    return jsonResponse(dog, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
