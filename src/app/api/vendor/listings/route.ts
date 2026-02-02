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

const createListingSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
  breed: z.string().min(1, "La race est requise"),
  gender: z.enum(["MALE", "FEMALE"]),
  age: z.string().min(1, "L'âge est requis"),
  price: z.number().positive("Le prix doit être positif"),
  photos: z.array(z.string()).min(1, "Au moins une photo est requise"),
  city: z.string().min(1, "La ville est requise"),
  phone: z.string().optional(),
  status: z.enum(["DRAFT", "PENDING_REVIEW"]).optional(),
});

export async function GET() {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);

    // Get vendor profile
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return errorResponse(
        "Profil vendeur requis. Créez votre profil vendeur d'abord.",
        403
      );
    }

    const listings = await prisma.listing.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: "desc" },
    });

    return jsonResponse(listings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["VENDOR", "ADMIN"]);

    // Get vendor profile
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return errorResponse(
        "Profil vendeur requis. Créez votre profil vendeur d'abord.",
        403
      );
    }

    if (vendor.status !== "ACTIVE") {
      return errorResponse(
        "Votre profil vendeur n'est pas encore activé. Veuillez attendre la validation.",
        403
      );
    }

    const body = await request.json();
    const data = validateBody(createListingSchema, body);

    // Generate slug with retry on conflict
    const baseSlug = slugify(data.title);
    let slug = baseSlug;
    let counter = 0;
    let listing;

    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        listing = await prisma.listing.create({
          data: {
            vendorId: vendor.id,
            title: data.title,
            description: data.description,
            breed: data.breed,
            gender: data.gender,
            age: data.age,
            price: data.price,
            photos: data.photos,
            city: data.city,
            phone: data.phone ?? vendor.phone,
            status: data.status ?? "DRAFT",
            slug,
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

    return jsonResponse(listing, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
