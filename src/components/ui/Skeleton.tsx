'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-[var(--color-cream-dark)] animate-pulse',
        className
      )}
    />
  );
}

export function PuppyCardSkeleton() {
  return (
    <div className="border border-[var(--color-cream-dark)]">
      <Skeleton className="aspect-[4/5]" />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="border border-[var(--color-cream-dark)]">
      <Skeleton className="aspect-[16/10]" />
      <div className="p-6 space-y-3">
        <div className="flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
