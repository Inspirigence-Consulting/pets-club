"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import {
  UserPlus,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Veuillez entrer un email valide"),
    phone: z
      .string()
      .min(1, "Le téléphone est requis")
      .regex(
        /^(\+212|0)[5-7]\d{8}$/,
        "Numéro de téléphone marocain invalide (ex: 0612345678)"
      ),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
    isVendor: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isVendor: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterForm, string>>
  >({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  }

  function handleVendorToggle(checked: boolean | "indeterminate") {
    setForm((prev) => ({ ...prev, isVendor: checked === true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setErrors({});

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterForm;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          isVendor: form.isVendor,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.error || "Une erreur est survenue. Veuillez réessayer."
        );
        setIsLoading(false);
        return;
      }

      // Auto-login after registration
      const signInRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInRes?.ok) {
        if (form.isVendor) {
          router.push("/vendor");
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        // Registration succeeded but auto-login failed, redirect to login
        router.push("/login");
      }
    } catch {
      setServerError("Erreur de connexion. Veuillez réessayer.");
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-[var(--color-cream-dark)] shadow-[var(--shadow-card)] rounded-2xl">
      <CardHeader className="text-center">
        <CardTitle
          className="text-xl text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Créer un compte
        </CardTitle>
        <CardDescription className="text-[var(--color-text-light)]">
          Rejoignez la communauté Pet&apos;s Club Maroc
        </CardDescription>
      </CardHeader>

      <CardContent>
        {serverError && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <AlertCircle className="size-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.name}
              className="h-10"
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.email}
              className="h-10"
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0612345678"
              value={form.phone}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.phone}
              className="h-10"
            />
            {errors.phone && (
              <p className="text-xs text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="8 caractères minimum"
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
                aria-invalid={!!errors.password}
                className="h-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                aria-invalid={!!errors.confirmPassword}
                className="h-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Vendor checkbox */}
          <div className="flex items-start gap-3 rounded-md border border-[var(--color-cream-dark)] bg-[var(--color-warm-white)] p-3">
            <Checkbox
              id="isVendor"
              checked={form.isVendor}
              onCheckedChange={handleVendorToggle}
              disabled={isLoading}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label
                htmlFor="isVendor"
                className="cursor-pointer text-sm font-medium text-[var(--color-text)]"
              >
                Je souhaite vendre sur la marketplace
              </Label>
              <p className="text-xs text-[var(--color-text-muted)]">
                Vous pourrez publier des annonces et gérer vos ventes
              </p>
            </div>
          </div>

          {form.isVendor && (
            <div className="flex items-center gap-2 rounded-md bg-[var(--color-primary)]/5 px-3 py-2 text-xs text-[var(--color-primary)]">
              <CheckCircle2 className="size-3.5 shrink-0" />
              <span>
                Votre compte vendeur sera créé et vous pourrez configurer votre
                profil
              </span>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <UserPlus className="size-4" />
            )}
            {isLoading ? "Création en cours..." : "Créer mon compte"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Separator className="bg-[var(--color-cream-dark)]" />
        <p className="text-sm text-[var(--color-text-light)]">
          Vous avez déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--color-gold-dark)] underline-offset-4 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
