import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function calculateAge(dob: string | Date): string {
  const birth = new Date(dob);
  const now = new Date();
  const diffMs = now.getTime() - birth.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} semaine${weeks > 1 ? 's' : ''}`;
  }
  const months = Math.floor(diffDays / 30);
  return `${months} mois`;
}

export function getWhatsAppUrl(message?: string): string {
  const base = 'https://wa.me/212600000000';
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}
