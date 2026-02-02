"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  Dog,
  Heart,
  Share2,
  Shield,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface ListingDetail {
  id: string;
  title: string;
  description: string;
  breed: string;
  gender: string;
  age: string;
  price: number;
  city: string;
  phone: string | null;
  photos: string[];
  slug: string;
  publishedAt: string;
  vendor: {
    shopName: string;
    description: string | null;
    photo: string | null;
    city: string | null;
  };
}

export default function ListingDetailPage() {
  const params = useParams();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setListing(data);
        }
      } catch {
        console.error("Failed to fetch listing");
      } finally {
        setIsLoading(false);
      }
    }
    if (params.slug) fetchListing();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="container-luxury py-10">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Dog className="mb-4 size-16 text-[var(--color-cream-dark)]" />
        <h2
          className="mb-2 text-xl font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Annonce introuvable
        </h2>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/marketplace">
            <ArrowLeft className="mr-2 size-4" />
            Retour aux annonces
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)]">
      <div className="container-luxury py-8">
        {/* Back button */}
        <Link
          href="/marketplace"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
        >
          <ArrowLeft className="size-4" />
          Retour aux annonces
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Photos */}
          <div className="lg:col-span-2">
            {/* Main photo */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-cream)]">
              {listing.photos[selectedPhoto] ? (
                <Image
                  src={listing.photos[selectedPhoto]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Dog className="size-24 text-[var(--color-cream-dark)]" />
                </div>
              )}
            </div>

            {/* Photo thumbnails */}
            {listing.photos.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {listing.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhoto(i)}
                    className={`relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedPhoto === i
                        ? "border-[var(--color-gold)]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`Photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h2
                className="mb-4 text-xl font-semibold text-[var(--color-charcoal)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Description
              </h2>
              <p className="whitespace-pre-wrap leading-relaxed text-[var(--color-text)]">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price + Actions */}
            <Card className="border-[var(--color-cream-dark)]">
              <CardContent className="pt-6">
                <p className="mb-1 text-3xl font-bold text-[var(--color-primary)]">
                  {listing.price.toLocaleString("fr-MA")} MAD
                </p>
                <h1 className="mb-4 text-lg font-semibold text-[var(--color-charcoal)]">
                  {listing.title}
                </h1>

                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{listing.breed}</Badge>
                  <Badge variant="secondary">
                    {listing.gender === "MALE" ? "Mâle" : "Femelle"}
                  </Badge>
                  <Badge variant="secondary">{listing.age}</Badge>
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                  <MapPin className="size-4" />
                  {listing.city}
                </div>

                {listing.phone && (
                  <Button
                    asChild
                    className="mb-3 w-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
                    size="lg"
                  >
                    <a href={`tel:${listing.phone}`}>
                      <Phone className="mr-2 size-4" />
                      Appeler le vendeur
                    </a>
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Heart className="size-4" />
                    Favoris
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share2 className="size-4" />
                    Partager
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vendor card */}
            <Card className="border-[var(--color-cream-dark)]">
              <CardHeader>
                <CardTitle
                  className="text-base"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Vendeur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                    <User className="size-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-charcoal)]">
                      {listing.vendor.shopName}
                    </p>
                    {listing.vendor.city && (
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {listing.vendor.city}
                      </p>
                    )}
                  </div>
                </div>
                {listing.vendor.description && (
                  <>
                    <Separator className="my-3" />
                    <p className="text-sm text-[var(--color-text-light)]">
                      {listing.vendor.description}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Safety notice */}
            <Card className="border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Shield className="size-5 shrink-0 text-[var(--color-gold-dark)]" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-[var(--color-charcoal)]">
                      Annonce vérifiée
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Cette annonce a été vérifiée par notre équipe. La
                      transaction se fait directement entre vous et le vendeur.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Published date */}
            {listing.publishedAt && (
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <Calendar className="size-3.5" />
                Publié le{" "}
                {new Date(listing.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
