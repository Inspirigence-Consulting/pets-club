import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ZodSchema } from "zod";
import type { UserRole } from "@prisma/client";

export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAuth(roles?: UserRole[]) {
  const session = await auth();
  if (!session?.user) {
    throw new AuthError("Non authentifié", 401);
  }
  if (roles && !roles.includes(session.user.role as UserRole)) {
    throw new AuthError("Accès non autorisé", 403);
  }
  return session;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function validateBody<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.issues.map((e) => e.message).join(", "));
  }
  return result.data;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AuthError) {
    return errorResponse(error.message, error.status);
  }
  if (error instanceof ValidationError) {
    return errorResponse(error.message, 400);
  }
  console.error("API Error:", error);
  return errorResponse("Erreur serveur interne", 500);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
