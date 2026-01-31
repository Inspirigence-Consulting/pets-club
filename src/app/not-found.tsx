import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center container-narrow py-20">
        <span className="text-[120px] font-[var(--font-heading)] font-bold text-[var(--color-cream-dark)] leading-none block">
          404
        </span>
        <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-4 -mt-6">
          Page Introuvable
        </h1>
        <p className="text-[var(--color-text-light)] mb-8 max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Revenez à l&apos;accueil pour découvrir nos compagnons d&apos;exception.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Retour à l&apos;Accueil
          </Link>
          <Link href="/chiots" className="btn-outline">
            Voir Nos Chiots
          </Link>
        </div>
      </div>
    </div>
  );
}
