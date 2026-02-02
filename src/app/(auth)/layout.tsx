import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center px-4 py-12">
      {/* Decorative top accent */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary)]" />

      {/* Logo */}
      <Link
        href="/"
        className="mb-8 flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
      >
        <div className="flex items-center gap-2">
          <PawPrint className="size-8 text-[var(--color-primary)]" />
          <span
            className="text-2xl font-bold tracking-tight text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pet&apos;s Club
          </span>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Maroc
        </span>
      </Link>

      {/* Content */}
      <div className="w-full max-w-md">{children}</div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-[var(--color-text-light)]">
        &copy; {new Date().getFullYear()} Pet&apos;s Club Maroc. Tous droits
        r&eacute;serv&eacute;s.
      </p>
    </div>
  );
}
