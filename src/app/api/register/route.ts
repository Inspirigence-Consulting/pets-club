import { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  jsonResponse,
  errorResponse,
  handleApiError,
  validateBody,
} from "@/lib/api-utils";

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  phone: z.string().optional(),
  isVendor: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = validateBody(registerSchema, body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return errorResponse("Un compte avec cet email existe déjà", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const role = data.isVendor ? "VENDOR" : "USER";

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (data.isVendor) {
      await prisma.vendor.create({
        data: {
          userId: user.id,
          shopName: `Boutique de ${data.name}`,
          phone: data.phone,
          status: "PENDING",
        },
      });
    }

    return jsonResponse(user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
