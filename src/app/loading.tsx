export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-[var(--color-cream-dark)] rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-[var(--color-gold)] rounded-full animate-spin" />
        </div>
        <span className="text-sm text-[var(--color-text-muted)] tracking-wider">
          Chargement...
        </span>
      </div>
    </div>
  );
}
