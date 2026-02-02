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

const updateVendorSchema = z.object({
  status: z.enum(["PENDING", "ACTIVE", "SUSPENDED"]),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const vendor = await prisma.vendor.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        listings: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            status: true,
            price: true,
            createdAt: true,
          },
        },
      },
    });

    if (!vendor) {
      return errorResponse("Vendeur non trouvé", 404);
    }

    return jsonResponse(vendor);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(["ADMIN"]);
    const { id } = await params;

    const existing = await prisma.vendor.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Vendeur non trouvé", 404);
    }

    const body = await request.json();
    const data = validateBody(updateVendorSchema, body);

    const vendor = await prisma.vendor.update({
      where: { id },
      data: { status: data.status },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return jsonResponse(vendor);
  } catch (error) {
    return handleApiError(error);
  }
}
