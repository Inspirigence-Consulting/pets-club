"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PawPrint,
  LayoutDashboard,
  Megaphone,
  UserCircle,
  LogOut,
  Menu,
  X,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const navItems = [
  {
    label: "Tableau de bord",
    href: "/vendor",
    icon: LayoutDashboard,
  },
  {
    label: "Mes annonces",
    href: "/vendor/annonces",
    icon: Megaphone,
  },
  {
    label: "Mon profil",
    href: "/vendor/profil",
    icon: UserCircle,
  },
];

export default function VendorNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/" });
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[var(--color-cream)]">
        <div className="border-b border-[var(--color-cream-dark)] bg-white px-4 py-3">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl p-6">
          <Skeleton className="mb-4 h-8 w-48 rounded" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-cream-dark)] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link
            href="/vendor"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <PawPrint className="size-6 text-[var(--color-primary)]" />
            <span
              className="text-lg font-bold text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pet&apos;s Club
            </span>
            <span className="hidden rounded-full bg-[var(--color-gold)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] sm:inline-block">
              Espace Vendeur
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/vendor"
                  ? pathname === "/vendor"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                      : "text-[var(--color-text-light)] hover:bg-[var(--color-cream)] hover:text-[var(--color-text)]"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: user info + logout */}
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[var(--color-text-light)] lg:inline-block">
              {session?.user?.name || session?.user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="hidden border-[var(--color-cream-dark)] text-[var(--color-text-light)] hover:text-red-600 md:inline-flex"
            >
              {isSigningOut ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}
              Déconnexion
            </Button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-1.5 text-[var(--color-text-light)] hover:bg-[var(--color-cream)] md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[var(--color-cream-dark)] bg-white px-4 pb-4 pt-2 md:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/vendor"
                    ? pathname === "/vendor"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                        : "text-[var(--color-text-light)] hover:bg-[var(--color-cream)]"
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Separator className="my-3 bg-[var(--color-cream-dark)]" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">
                {session?.user?.name || session?.user?.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                {isSigningOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}
                Déconnexion
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
