"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Loader2,
  AlertCircle,
  Save,
  CheckCircle2,
  Store,
  UserCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const profileSchema = z.object({
  shopName: z
    .string()
    .min(1, "Le nom de la boutique est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),
  city: z.string().min(1, "La ville est requise"),
  phone: z
    .string()
    .min(1, "Le téléphone est requis")
    .regex(
      /^(\+212|0)[5-7]\d{8}$/,
      "Numéro de téléphone marocain invalide (ex: 0612345678)"
    ),
  photo: z
    .string()
    .url("URL de photo invalide")
    .optional()
    .or(z.literal("")),
});

type ProfileForm = z.infer<typeof profileSchema>;
type FormErrors = Partial<Record<keyof ProfileForm, string>>;

export default function VendorProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    shopName: "",
    description: "",
    city: "",
    phone: "",
    photo: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/vendor/profile");
        if (res.status === 404) {
          // No profile yet
          setHasProfile(false);
          setIsLoading(false);
          return;
        }
        if (!res.ok) throw new Error();
        const data = await res.json();
        setForm({
          shopName: data.shopName || "",
          description: data.description || "",
          city: data.city || "",
          phone: data.phone || "",
          photo: data.photo || "",
        });
        setHasProfile(true);
      } catch {
        setLoadError(
          "Impossible de charger votre profil. Veuillez réessayer."
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
    setSuccessMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    setErrors({});

    const result = profileSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ProfileForm;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/vendor/profile", {
        method: hasProfile ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.error || "Une erreur est survenue. Veuillez réessayer."
        );
        setIsSaving(false);
        return;
      }

      setHasProfile(true);
      setSuccessMessage(
        hasProfile
          ? "Profil mis à jour avec succès !"
          : "Profil vendeur créé avec succès !"
      );

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch {
      setServerError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="mb-2 h-8 w-48 rounded" />
          <Skeleton className="h-4 w-72 rounded" />
        </div>
        <Card className="border-[var(--color-cream-dark)]">
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-6">
        <div>
          <h1
            className="text-2xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mon profil vendeur
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{loadError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Mon profil vendeur
        </h1>
        <p className="text-sm text-[var(--color-text-light)]">
          {hasProfile
            ? "Gérez les informations de votre boutique"
            : "Créez votre profil vendeur pour commencer à vendre"}
        </p>
      </div>

      {/* No profile info */}
      {!hasProfile && (
        <div className="flex items-start gap-3 rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 px-4 py-3">
          <Store className="mt-0.5 size-4 shrink-0 text-[var(--color-gold-dark)]" />
          <div>
            <p className="text-sm font-medium text-[var(--color-gold-dark)]">
              Profil vendeur requis
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-light)]">
              Remplissez les informations ci-dessous pour créer votre profil
              vendeur et commencer à publier des annonces.
            </p>
          </div>
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error */}
      {serverError && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main form */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-[var(--color-cream-dark)]">
              <CardHeader>
                <CardTitle className="text-base text-[var(--color-primary)]">
                  Informations de la boutique
                </CardTitle>
                <CardDescription>
                  Ces informations seront visibles par les acheteurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Shop name */}
                <div className="space-y-2">
                  <Label htmlFor="shopName">Nom de la boutique</Label>
                  <Input
                    id="shopName"
                    name="shopName"
                    placeholder="Ex: Mon Élevage Premium"
                    value={form.shopName}
                    onChange={handleChange}
                    disabled={isSaving}
                    aria-invalid={!!errors.shopName}
                    className="h-10"
                  />
                  {errors.shopName && (
                    <p className="text-xs text-red-600">{errors.shopName}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description{" "}
                    <span className="text-[var(--color-text-muted)]">
                      (optionnel)
                    </span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Décrivez votre activité, vos spécialités..."
                    value={form.description}
                    onChange={handleChange}
                    disabled={isSaving}
                    aria-invalid={!!errors.description}
                    rows={4}
                  />
                  <div className="flex justify-between">
                    {errors.description ? (
                      <p className="text-xs text-red-600">
                        {errors.description}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {(form.description || "").length}/500
                    </span>
                  </div>
                </div>

                {/* City + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Ex: Casablanca"
                      value={form.city}
                      onChange={handleChange}
                      disabled={isSaving}
                      aria-invalid={!!errors.city}
                      className="h-10"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-600">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0612345678"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={isSaving}
                      aria-invalid={!!errors.phone}
                      className="h-10"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <Label htmlFor="photo">
                    Photo de la boutique{" "}
                    <span className="text-[var(--color-text-muted)]">
                      (URL, optionnel)
                    </span>
                  </Label>
                  <Input
                    id="photo"
                    name="photo"
                    placeholder="https://exemple.com/ma-boutique.jpg"
                    value={form.photo}
                    onChange={handleChange}
                    disabled={isSaving}
                    aria-invalid={!!errors.photo}
                    className="h-10"
                  />
                  {errors.photo && (
                    <p className="text-xs text-red-600">{errors.photo}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview sidebar */}
          <div className="space-y-6">
            <Card className="border-[var(--color-cream-dark)]">
              <CardHeader>
                <CardTitle className="text-base text-[var(--color-primary)]">
                  Aperçu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Photo preview */}
                <div className="mx-auto size-20 overflow-hidden rounded-full border-2 border-[var(--color-cream-dark)] bg-[var(--color-cream)]">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt="Boutique"
                      className="size-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <UserCircle className="size-10 text-[var(--color-text-muted)]" />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-[var(--color-text)]">
                    {form.shopName || "Nom de la boutique"}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--color-text-light)]">
                    {form.city || "Ville"}
                  </p>
                </div>

                {form.description && (
                  <>
                    <Separator className="bg-[var(--color-cream-dark)]" />
                    <p className="line-clamp-4 text-xs text-[var(--color-text-light)]">
                      {form.description}
                    </p>
                  </>
                )}

                {form.phone && (
                  <p className="text-center text-xs text-[var(--color-text-muted)]">
                    {form.phone}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
            >
              {isSaving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {isSaving
                ? "Enregistrement..."
                : hasProfile
                  ? "Mettre à jour le profil"
                  : "Créer mon profil vendeur"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
