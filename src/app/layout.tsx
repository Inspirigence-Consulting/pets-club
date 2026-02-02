import type { Metadata } from 'next';
import { Inter, Playfair_Display, Poppins } from 'next/font/google';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ScrollToTop from '@/components/layout/ScrollToTop';
import CookieConsent from '@/components/layout/CookieConsent';
import PageTransition from '@/components/layout/PageTransition';
import { GoogleAnalytics, GoogleTagManager, GTMNoscript, FacebookPixel } from '@/components/layout/Analytics';
import { OrganizationSchema, LocalBusinessSchema } from '@/components/layout/StructuredData';
import SessionProvider from '@/components/providers/SessionProvider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Pet's Club Maroc — Éleveur de Spitz Nain & Berger Australien",
    template: "%s | Pet's Club Maroc",
  },
  description: "Éleveur de Spitz Nain (Pomeranian) et Berger Australien au Maroc. Chiots issus de lignées championnes, socialisés 10 semaines en famille, avec suivi vétérinaire complet et accompagnement à vie.",
  keywords: [
    'éleveur spitz nain maroc',
    'spitz nain à vendre maroc',
    'pomeranian maroc',
    'berger australien maroc',
    'chiot berger australien à vendre',
    'élevage chien maroc',
    'acheter chiot spitz nain',
    'acheter chiot berger australien maroc',
    'éleveur éthique chien maroc',
    'pet\'s club maroc',
    'chiot pomeranian casablanca',
    'berger australien rabat',
  ],
  openGraph: {
    title: "Pet's Club Maroc — Éleveur de Spitz Nain & Berger Australien",
    description: "Chiots Spitz Nain et Berger Australien de lignées championnes, élevés en famille au Maroc. Tests génétiques, garantie santé, accompagnement à vie.",
    type: 'website',
    locale: 'fr_FR',
    siteName: "Pet's Club Maroc",
    images: [
      {
        url: 'https://res.cloudinary.com/dlugprv1v/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/visual-showcase/after_WhatsApp%20Image%202026-01-28%20at%2017.25.03',
        width: 1200,
        height: 630,
        alt: "Pet's Club Maroc — Chiots Spitz Nain et Berger Australien de lignées championnes",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pet's Club Maroc — Éleveur de Spitz Nain & Berger Australien",
    description: "Chiots Spitz Nain et Berger Australien de lignées championnes, élevés en famille au Maroc. Tests génétiques, garantie santé, accompagnement à vie.",
    images: ['https://res.cloudinary.com/dlugprv1v/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/visual-showcase/after_WhatsApp%20Image%202026-01-28%20at%2017.25.03'],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://petsclubmaroc.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      <head>
        <GoogleAnalytics />
        <GoogleTagManager />
        <FacebookPixel />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <SessionProvider>
          <GTMNoscript />
          <OrganizationSchema />
          <LocalBusinessSchema />
          <ConditionalLayout>
            <PageTransition>{children}</PageTransition>
          </ConditionalLayout>
          <ScrollToTop />
          <WhatsAppButton />
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  );
}
