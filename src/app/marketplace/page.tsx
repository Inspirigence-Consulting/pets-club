"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, SlidersHorizontal, Heart, Dog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Listing {
  id: string;
  title: string;
  breed: string;
  gender: string;
  age: string;
  price: number;
  city: string;
  photos: string[];
  slug: string;
  publishedAt: string;
  vendor: {
    id: string;
    shopName: string;
    photo: string | null;
    city: string;
  };
  _count: { favorites: number };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [breedFilter, setBreedFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [breedFilter, cityFilter, genderFilter, search]);

  useEffect(() => {
    async function fetchListings() {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (breedFilter !== "all") params.set("breed", breedFilter);
        if (cityFilter !== "all") params.set("city", cityFilter);
        if (genderFilter !== "all") params.set("gender", genderFilter);
        if (search) params.set("search", search);
        params.set("page", currentPage.toString());

        const res = await fetch(`/api/listings?${params}`);
        if (res.ok) {
          const json = await res.json();
          setListings(json.data);
          setPagination(json.pagination);
        }
      } catch {
        console.error("Failed to fetch listings");
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
  }, [breedFilter, cityFilter, genderFilter, search, currentPage]);

  const breeds = [...new Set(listings.map((l) => l.breed))];
  const cities = [...new Set(listings.map((l) => l.city))];

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)]">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] pt-36 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] to-transparent" />
        </div>
        <div className="container-luxury relative">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-[var(--color-gold)] text-white border-none">
              Marketplace
            </Badge>
            <h1
              className="mb-4 text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Trouvez votre compagnon
            </h1>
            <p className="mb-8 text-lg text-white/80">
              Des annonces vérifiées par notre équipe. Chiots et chiens de
              qualité, vendus par des particuliers et éleveurs.
            </p>

            {/* Search bar */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <Input
                placeholder="Rechercher par race, ville..."
                className="h-14 rounded-full border-none bg-white pl-12 pr-6 text-base shadow-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Results */}
      <div className="container-luxury py-10">
        {/* Filter bar */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "gap-2 bg-[var(--color-primary)] text-white" : "gap-2"}
          >
            <SlidersHorizontal className="size-4" />
            Filtres
          </Button>

          {showFilters && (
            <div className="flex w-full flex-wrap gap-3 pt-3 sm:w-auto sm:pt-0">
              <Select value={breedFilter} onValueChange={setBreedFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Race" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les races</SelectItem>
                  {breeds.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="MALE">Mâle</SelectItem>
                  <SelectItem value="FEMALE">Femelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="ml-auto text-sm text-[var(--color-text-muted)]">
            {pagination ? pagination.total : listings.length} annonce{(pagination ? pagination.total : listings.length) !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Results grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-56 w-full" />
                <CardContent className="space-y-3 pt-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Dog className="mb-4 size-16 text-[var(--color-cream-dark)]" />
            <h3
              className="mb-2 text-xl font-semibold text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Aucune annonce trouvée
            </h3>
            <p className="text-[var(--color-text-muted)]">
              Essayez de modifier vos filtres ou revenez plus tard.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/marketplace/${listing.slug}`}>
                <Card className="group cursor-pointer overflow-hidden border-[var(--color-cream-dark)] transition-all duration-300 hover:border-[var(--color-gold)]/30 hover:shadow-lg hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream)] rounded-xl">
                    {listing.photos[0] ? (
                      <Image
                        src={listing.photos[0]}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Dog className="size-16 text-[var(--color-cream-dark)]" />
                      </div>
                    )}

                    {/* Price badge */}
                    <div className="absolute right-3 top-3">
                      <Badge className="bg-[var(--color-primary)] text-white border-none font-semibold">
                        {listing.price.toLocaleString("fr-MA")} MAD
                      </Badge>
                    </div>

                    {/* Favorite button */}
                    <button
                      className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: toggle favorite
                      }}
                    >
                      <Heart className="size-4 text-[var(--color-text-muted)]" />
                    </button>
                  </div>

                  {/* Content */}
                  <CardContent className="space-y-2 pt-4">
                    <h3 className="line-clamp-1 font-semibold text-[var(--color-charcoal)]">
                      {listing.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {listing.breed}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {listing.gender === "MALE" ? "Mâle" : "Femelle"}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {listing.age}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                        <MapPin className="size-3.5" />
                        {listing.city}
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {listing.vendor.shopName}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Précédent
            </Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  className={
                    pageNum === currentPage
                      ? "bg-[var(--color-primary)] text-white"
                      : ""
                  }
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= pagination.totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
              }
            >
              Suivant
            </Button>
          </div>
        )}

        {/* CTA Vendre */}
        <div className="mt-16 rounded-2xl bg-[var(--color-primary)] p-8 text-center md:p-12">
          <h2
            className="mb-3 text-2xl font-bold text-white md:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Vous avez un chien à vendre ?
          </h2>
          <p className="mb-6 text-white/80">
            Déposez votre annonce sur notre marketplace et touchez des milliers
            d&apos;acheteurs potentiels.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)]"
          >
            <Link href="/register">Déposer une annonce</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
