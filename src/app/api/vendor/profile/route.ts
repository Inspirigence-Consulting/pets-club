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

const createVendorSchema = z.object({
  shopName: z.string().min(2, "Le nom de la boutique doit contenir au moins 2 caractères"),
  description: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  photo: z.string().optional(),
});

const updateVendorSchema = z.object({
  shopName: z.string().min(2).optional(),
  description: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
});

export async function GET() {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: { name: true, email: true, image: true },
        },
        _count: { select: { listings: true } },
      },
    });

    if (!vendor) {
      return errorResponse("Profil vendeur non trouvé", 404);
    }

    return jsonResponse(vendor);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);

    // Check if vendor profile already exists
    const existing = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });
    if (existing) {
      return errorResponse("Un profil vendeur existe déjà pour cet utilisateur", 409);
    }

    const body = await request.json();
    const data = validateBody(createVendorSchema, body);

    const vendor = await prisma.vendor.create({
      data: {
        userId: session.user.id,
        shopName: data.shopName,
        description: data.description,
        phone: data.phone,
        city: data.city,
        photo: data.photo,
        status: "PENDING",
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return jsonResponse(vendor, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);

    const existing = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });
    if (!existing) {
      return errorResponse("Profil vendeur non trouvé", 404);
    }

    const body = await request.json();
    const data = validateBody(updateVendorSchema, body);

    const vendor = await prisma.vendor.update({
      where: { userId: session.user.id },
      data,
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return jsonResponse(vendor);
  } catch (error) {
    return handleApiError(error);
  }
}
