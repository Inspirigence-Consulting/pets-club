"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  Clock,
  Plus,
  ArrowRight,
  Loader2,
  AlertCircle,
  UserCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  activeCount: number;
  pendingCount: number;
  totalCount: number;
}

export default function VendorDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/vendor/dashboard");
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError("Impossible de charger le tableau de bord. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tableau de bord
          </h1>
          <p className="text-sm text-[var(--color-text-light)]">
            Vue d&apos;ensemble de votre activité
          </p>
        </div>
        <Button
          asChild
          className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white"
        >
          <Link href="/vendor/annonces/nouveau">
            <Plus className="size-4" />
            Déposer une annonce
          </Link>
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setError("");
              setIsLoading(true);
              fetch("/api/vendor/dashboard")
                .then((r) => r.json())
                .then(setData)
                .catch(() =>
                  setError("Impossible de charger le tableau de bord.")
                )
                .finally(() => setIsLoading(false));
            }}
            className="ml-auto text-red-700 hover:text-red-800"
          >
            Réessayer
          </Button>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Active listings */}
        <Card className="border-[var(--color-cream-dark)]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-[var(--color-text-light)]">
              <Megaphone className="size-4 text-green-600" />
              Annonces publiées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-9 w-16 rounded" />
            ) : (
              <p className="text-3xl font-bold text-[var(--color-primary)]">
                {data?.activeCount ?? 0}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pending listings */}
        <Card className="border-[var(--color-cream-dark)]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-[var(--color-text-light)]">
              <Clock className="size-4 text-[var(--color-gold)]" />
              En attente de validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-9 w-16 rounded" />
            ) : (
              <p className="text-3xl font-bold text-[var(--color-primary)]">
                {data?.pendingCount ?? 0}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Total listings */}
        <Card className="border-[var(--color-cream-dark)] sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-[var(--color-text-light)]">
              <Megaphone className="size-4 text-[var(--color-text-muted)]" />
              Total annonces
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-9 w-16 rounded" />
            ) : (
              <p className="text-3xl font-bold text-[var(--color-primary)]">
                {data?.totalCount ?? 0}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="border-[var(--color-cream-dark)]">
        <CardHeader>
          <CardTitle
            className="text-lg text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/vendor/annonces/nouveau"
              className="group flex items-center gap-3 rounded-lg border border-[var(--color-cream-dark)] bg-white p-4 transition-all hover:border-[var(--color-gold)]/30 hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-gold)]/10">
                <Plus className="size-5 text-[var(--color-gold-dark)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-text)]">
                  Nouvelle annonce
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Déposer une annonce
                </p>
              </div>
              <ArrowRight className="size-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/vendor/annonces"
              className="group flex items-center gap-3 rounded-lg border border-[var(--color-cream-dark)] bg-white p-4 transition-all hover:border-[var(--color-gold)]/30 hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/5">
                <Megaphone className="size-5 text-[var(--color-primary)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-text)]">
                  Mes annonces
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Gérer mes annonces
                </p>
              </div>
              <ArrowRight className="size-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/vendor/profil"
              className="group flex items-center gap-3 rounded-lg border border-[var(--color-cream-dark)] bg-white p-4 transition-all hover:border-[var(--color-gold)]/30 hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-accent-sage)]/10">
                <UserCircle className="size-5 text-[var(--color-accent-sage)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-text)]">
                  Mon profil
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Modifier mon profil vendeur
                </p>
              </div>
              <ArrowRight className="size-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
