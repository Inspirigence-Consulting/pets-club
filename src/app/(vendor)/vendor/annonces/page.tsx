"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
  Megaphone,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Listing {
  id: string;
  title: string;
  breed: string;
  gender: "MALE" | "FEMALE";
  age: string;
  price: number;
  city: string;
  status: string;
  rejectionReason?: string | null;
  photos: string[];
  createdAt: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  DRAFT: {
    label: "Brouillon",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  PENDING_REVIEW: {
    label: "En attente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  PUBLISHED: {
    label: "Publiée",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  REJECTED: {
    label: "Rejetée",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  SOLD: {
    label: "Vendue",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  EXPIRED: {
    label: "Expirée",
    className: "bg-gray-50 text-gray-500 border-gray-200",
  },
};

export default function VendorListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      setError("");
      const res = await fetch("/api/vendor/listings");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setListings(data);
    } catch {
      setError("Impossible de charger vos annonces. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) return;

    setDeletingId(id);
    setDeleteError("");

    try {
      const res = await fetch(`/api/vendor/listings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Erreur lors de la suppression"
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canEdit = (status: string) =>
    ["DRAFT", "REJECTED"].includes(status);

  const canDelete = (status: string) =>
    ["DRAFT", "REJECTED"].includes(status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mes annonces
          </h1>
          <p className="text-sm text-[var(--color-text-light)]">
            Gérez vos annonces sur la marketplace
          </p>
        </div>
        <Button
          asChild
          className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white"
        >
          <Link href="/vendor/annonces/nouveau">
            <Plus className="size-4" />
            Nouvelle annonce
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <Input
          placeholder="Rechercher une annonce..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 pl-9"
        />
      </div>

      {/* Error states */}
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsLoading(true);
              fetchListings();
            }}
            className="ml-auto text-red-700"
          >
            Réessayer
          </Button>
        </div>
      )}

      {deleteError && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{deleteError}</span>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-[var(--color-cream-dark)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="size-16 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && listings.length === 0 && (
        <Card className="border-[var(--color-cream-dark)]">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-[var(--color-cream)]">
              <Megaphone className="size-8 text-[var(--color-text-muted)]" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-[var(--color-text)]">
              Aucune annonce
            </h3>
            <p className="mb-6 text-sm text-[var(--color-text-muted)]">
              Commencez par créer votre première annonce
            </p>
            <Button
              asChild
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white"
            >
              <Link href="/vendor/annonces/nouveau">
                <Plus className="size-4" />
                Déposer une annonce
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No search results */}
      {!isLoading &&
        !error &&
        listings.length > 0 &&
        filteredListings.length === 0 && (
          <Card className="border-[var(--color-cream-dark)]">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="mb-3 size-8 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Aucune annonce ne correspond à votre recherche
              </p>
            </CardContent>
          </Card>
        )}

      {/* Listings */}
      {!isLoading && filteredListings.length > 0 && (
        <div className="space-y-3">
          {filteredListings.map((listing) => {
            const statusInfo = STATUS_CONFIG[listing.status] || {
              label: listing.status,
              className: "bg-gray-100 text-gray-700 border-gray-200",
            };

            return (
              <Card
                key={listing.id}
                className="border-[var(--color-cream-dark)] transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Photo thumbnail */}
                    <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-[var(--color-cream)]">
                      {listing.photos[0] ? (
                        <img
                          src={listing.photos[0]}
                          alt={listing.title}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <Megaphone className="size-6 text-[var(--color-text-muted)]" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-[var(--color-text)]">
                          {listing.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "shrink-0 rounded-md border text-[10px] font-semibold",
                            statusInfo.className
                          )}
                        >
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-[var(--color-text-light)]">
                        {listing.breed} &middot;{" "}
                        {listing.gender === "MALE" ? "Mâle" : "Femelle"}{" "}
                        &middot; {listing.age} &middot; {listing.city}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-gold-dark)]">
                        {listing.price.toLocaleString("fr-MA")} MAD
                      </p>

                      {/* Rejection reason */}
                      {listing.status === "REJECTED" &&
                        listing.rejectionReason && (
                          <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
                            <span className="font-medium">
                              Motif du rejet :{" "}
                            </span>
                            {listing.rejectionReason}
                          </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2">
                      {canEdit(listing.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-[var(--color-cream-dark)]"
                        >
                          <Link
                            href={`/vendor/annonces/${listing.id}`}
                          >
                            <Pencil className="size-3.5" />
                            Modifier
                          </Link>
                        </Button>
                      )}
                      {!canEdit(listing.status) &&
                        !canDelete(listing.status) && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-[var(--color-cream-dark)]"
                          >
                            <Link
                              href={`/vendor/annonces/${listing.id}`}
                            >
                              Voir
                            </Link>
                          </Button>
                        )}
                      {canDelete(listing.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(listing.id)}
                          disabled={deletingId === listing.id}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          {deletingId === listing.id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="size-3.5" />
                          )}
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
