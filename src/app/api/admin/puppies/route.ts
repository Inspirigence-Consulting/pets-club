import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  errorResponse,
  handleApiError,
  requireAuth,
  validateBody,
  slugify,
} from "@/lib/api-utils";

const createPuppySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  gender: z.enum(["MALE", "FEMALE"]),
  color: z.string().min(1, "La couleur est requise"),
  dateOfBirth: z.string().transform((s) => new Date(s)),
  microchipNumber: z.string().optional(),
  weight: z.number().positive().optional(),
  price: z.number().nonnegative().optional(),
  description: z.string().optional(),
  photos: z.array(z.string()).optional(),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "KEPT"]).optional(),
  litterId: z.string().min(1, "La portée est requise"),
  buyerName: z.string().optional(),
  buyerEmail: z.string().email().optional(),
  buyerPhone: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const litterId = searchParams.get("litterId");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (litterId) where.litterId = litterId;

    const puppies = await prisma.puppy.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        litter: {
          select: {
            id: true,
            name: true,
            sire: { select: { id: true, name: true, breed: true } },
            dam: { select: { id: true, name: true, breed: true } },
          },
        },
        _count: { select: { vetRecords: true } },
      },
    });

    return jsonResponse(puppies);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(["ADMIN"]);

    const body = await request.json();
    const data = validateBody(createPuppySchema, body);

    // Verify litter exists
    const litter = await prisma.litter.findUnique({
      where: { id: data.litterId },
    });
    if (!litter) {
      return errorResponse("Portée non trouvée", 404);
    }

    // Generate slug with retry on conflict
    const baseSlug = slugify(data.name);
    let slug = baseSlug;
    let counter = 0;
    let puppy;

    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        puppy = await prisma.puppy.create({
          data: {
            name: data.name,
            gender: data.gender,
            color: data.color,
            dateOfBirth: data.dateOfBirth,
            microchipNumber: data.microchipNumber,
            weight: data.weight,
            price: data.price,
            description: data.description,
            photos: data.photos ?? [],
            status: data.status ?? "AVAILABLE",
            litterId: data.litterId,
            slug,
            buyerName: data.buyerName,
            buyerEmail: data.buyerEmail,
            buyerPhone: data.buyerPhone,
          },
          include: {
            litter: {
              select: { id: true, name: true },
            },
          },
        });
        break;
      } catch (e: unknown) {
        const prismaError = e as { code?: string };
        if (prismaError.code === "P2002" && attempt < 9) {
          counter++;
          slug = `${baseSlug}-${counter}`;
          continue;
        }
        throw e;
      }
    }

    return jsonResponse(puppy, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
