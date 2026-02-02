"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Plus,
  X,
  Save,
  Send,
  ImageIcon,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const listingSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .min(5, "Le titre doit contenir au moins 5 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .min(20, "La description doit contenir au moins 20 caractères")
    .max(2000, "La description ne peut pas dépasser 2000 caractères"),
  breed: z
    .string()
    .min(1, "La race est requise")
    .min(2, "La race doit contenir au moins 2 caractères"),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Le genre est requis",
  }),
  age: z.string().min(1, "L'âge est requis"),
  price: z
    .string()
    .min(1, "Le prix est requis")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Le prix doit être un nombre positif",
    }),
  city: z.string().min(1, "La ville est requise"),
  phone: z
    .string()
    .min(1, "Le téléphone est requis")
    .regex(
      /^(\+212|0)[5-7]\d{8}$/,
      "Numéro de téléphone marocain invalide"
    ),
  photos: z
    .array(z.string().url("URL de photo invalide"))
    .min(1, "Au moins une photo est requise")
    .max(5, "Maximum 5 photos"),
});

type ListingForm = z.infer<typeof listingSchema>;
type FormErrors = Partial<Record<keyof ListingForm, string>>;

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Brouillon",
  PENDING_REVIEW: "En attente",
  PUBLISHED: "Publiée",
  REJECTED: "Rejetée",
  SOLD: "Vendue",
  EXPIRED: "Expirée",
};

export default function VendorEditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<ListingForm>({
    title: "",
    description: "",
    breed: "",
    gender: "MALE",
    age: "",
    price: "",
    city: "",
    phone: "",
    photos: [],
  });
  const [originalStatus, setOriginalStatus] = useState("");
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [photoInput, setPhotoInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/vendor/listings/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setForm({
          title: data.title || "",
          description: data.description || "",
          breed: data.breed || "",
          gender: data.gender || "MALE",
          age: data.age || "",
          price: String(data.price || ""),
          city: data.city || "",
          phone: data.phone || "",
          photos: data.photos || [],
        });
        setOriginalStatus(data.status);
        setRejectionReason(data.rejectionReason || null);
      } catch {
        setLoadError(
          "Impossible de charger cette annonce. Veuillez réessayer."
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  }

  function handleGenderChange(value: string) {
    setForm((prev) => ({ ...prev, gender: value as "MALE" | "FEMALE" }));
    setErrors((prev) => ({ ...prev, gender: undefined }));
  }

  function addPhoto() {
    if (!photoInput.trim()) return;
    try {
      new URL(photoInput);
    } catch {
      setErrors((prev) => ({ ...prev, photos: "URL invalide" }));
      return;
    }
    if (form.photos.length >= 5) {
      setErrors((prev) => ({ ...prev, photos: "Maximum 5 photos" }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, photoInput.trim()],
    }));
    setPhotoInput("");
    setErrors((prev) => ({ ...prev, photos: undefined }));
  }

  function removePhoto(index: number) {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }

  function validateForm(): boolean {
    const result = listingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ListingForm;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  }

  async function handleSubmit(submitStatus?: "PENDING_REVIEW") {
    setServerError("");
    setErrors({});

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const body: Record<string, unknown> = {
        ...form,
        price: Number(form.price),
      };
      if (submitStatus) {
        body.status = submitStatus;
      }

      const res = await fetch(`/api/vendor/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.error || "Une erreur est survenue. Veuillez réessayer."
        );
        setIsSubmitting(false);
        return;
      }

      router.push("/vendor/annonces");
    } catch {
      setServerError("Erreur de connexion. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  }

  const isEditable = ["DRAFT", "REJECTED"].includes(originalStatus);
  const isReadOnly = !isEditable;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
        </div>
        <Card className="border-[var(--color-cream-dark)]">
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-[var(--color-text-light)]"
          >
            <Link href="/vendor/annonces">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <h1
            className="text-2xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Modifier l&apos;annonce
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
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-[var(--color-text-light)]"
        >
          <Link href="/vendor/annonces">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1
              className="text-2xl font-bold text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isReadOnly ? "Détails de l'annonce" : "Modifier l'annonce"}
            </h1>
            <Badge
              variant="outline"
              className="text-xs"
            >
              {STATUS_LABELS[originalStatus] || originalStatus}
            </Badge>
          </div>
          <p className="text-sm text-[var(--color-text-light)]">
            {isReadOnly
              ? "Cette annonce ne peut pas être modifiée dans son état actuel"
              : "Modifiez les informations de votre annonce"}
          </p>
        </div>
      </div>

      {/* Rejection reason */}
      {originalStatus === "REJECTED" && rejectionReason && (
        <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-700">
              Annonce rejetée
            </p>
            <p className="mt-1 text-sm text-red-600">{rejectionReason}</p>
            <p className="mt-2 text-xs text-red-500">
              Corrigez les problèmes et soumettez à nouveau pour validation.
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {serverError && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic info */}
          <Card className="border-[var(--color-cream-dark)]">
            <CardHeader>
              <CardTitle className="text-base text-[var(--color-primary)]">
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Titre de l&apos;annonce</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Chiot Spitz Nain pure race"
                  value={form.title}
                  onChange={handleChange}
                  disabled={isSubmitting || isReadOnly}
                  aria-invalid={!!errors.title}
                  className="h-10"
                />
                {errors.title && (
                  <p className="text-xs text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez l'animal en détail..."
                  value={form.description}
                  onChange={handleChange}
                  disabled={isSubmitting || isReadOnly}
                  aria-invalid={!!errors.description}
                  rows={5}
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
                    {form.description.length}/2000
                  </span>
                </div>
              </div>

              {/* Race + Gender */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="breed">Race</Label>
                  <Input
                    id="breed"
                    name="breed"
                    placeholder="Ex: Spitz Nain"
                    value={form.breed}
                    onChange={handleChange}
                    disabled={isSubmitting || isReadOnly}
                    aria-invalid={!!errors.breed}
                    className="h-10"
                  />
                  {errors.breed && (
                    <p className="text-xs text-red-600">{errors.breed}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Genre</Label>
                  <Select
                    value={form.gender}
                    onValueChange={handleGenderChange}
                    disabled={isSubmitting || isReadOnly}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Mâle</SelectItem>
                      <SelectItem value="FEMALE">Femelle</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-xs text-red-600">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Age + Price */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age">Âge</Label>
                  <Input
                    id="age"
                    name="age"
                    placeholder="Ex: 3 mois"
                    value={form.age}
                    onChange={handleChange}
                    disabled={isSubmitting || isReadOnly}
                    aria-invalid={!!errors.age}
                    className="h-10"
                  />
                  {errors.age && (
                    <p className="text-xs text-red-600">{errors.age}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (MAD)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="Ex: 5000"
                    value={form.price}
                    onChange={handleChange}
                    disabled={isSubmitting || isReadOnly}
                    aria-invalid={!!errors.price}
                    className="h-10"
                  />
                  {errors.price && (
                    <p className="text-xs text-red-600">{errors.price}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact info */}
          <Card className="border-[var(--color-cream-dark)]">
            <CardHeader>
              <CardTitle className="text-base text-[var(--color-primary)]">
                Coordonnées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Ex: Casablanca"
                    value={form.city}
                    onChange={handleChange}
                    disabled={isSubmitting || isReadOnly}
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
                    disabled={isSubmitting || isReadOnly}
                    aria-invalid={!!errors.phone}
                    className="h-10"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="border-[var(--color-cream-dark)]">
            <CardHeader>
              <CardTitle className="text-base text-[var(--color-primary)]">
                Photos
              </CardTitle>
              <CardDescription>
                Ajoutez jusqu&apos;à 5 photos (URL)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isReadOnly && (
                <div className="flex gap-2">
                  <Input
                    placeholder="https://exemple.com/photo.jpg"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addPhoto();
                      }
                    }}
                    disabled={isSubmitting || form.photos.length >= 5}
                    className="h-10"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPhoto}
                    disabled={
                      isSubmitting ||
                      !photoInput.trim() ||
                      form.photos.length >= 5
                    }
                    className="h-10 shrink-0 border-[var(--color-cream-dark)]"
                  >
                    <Plus className="size-4" />
                    Ajouter
                  </Button>
                </div>
              )}
              {errors.photos && (
                <p className="text-xs text-red-600">{errors.photos}</p>
              )}

              {form.photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {form.photos.map((url, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--color-cream-dark)] bg-[var(--color-cream)]"
                    >
                      <img
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className="size-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {!isReadOnly && (
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          disabled={isSubmitting}
                          className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="size-3.5" />
                        </button>
                      )}
                      <span className="absolute bottom-1.5 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                        {index + 1}/{form.photos.length}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-cream-dark)] py-8 text-[var(--color-text-muted)]">
                  <ImageIcon className="mb-2 size-8" />
                  <p className="text-sm">Aucune photo</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions sidebar */}
        <div className="space-y-6">
          <Card className="border-[var(--color-cream-dark)]">
            <CardHeader>
              <CardTitle className="text-base text-[var(--color-primary)]">
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isEditable ? (
                <>
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full border-[var(--color-cream-dark)]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Save className="size-4" />
                    )}
                    Enregistrer les modifications
                  </Button>
                  <Button
                    onClick={() => handleSubmit("PENDING_REVIEW")}
                    disabled={isSubmitting}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    Soumettre pour validation
                  </Button>
                </>
              ) : (
                <p className="text-center text-sm text-[var(--color-text-muted)]">
                  Cette annonce est en statut{" "}
                  <span className="font-medium">
                    {STATUS_LABELS[originalStatus] || originalStatus}
                  </span>{" "}
                  et ne peut pas être modifiée.
                </p>
              )}
              <Separator className="bg-[var(--color-cream-dark)]" />
              <Button
                variant="ghost"
                asChild
                className="w-full text-[var(--color-text-light)]"
              >
                <Link href="/vendor/annonces">
                  <ArrowLeft className="size-4" />
                  Retour aux annonces
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
