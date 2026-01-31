import type { Metadata } from 'next';
import { Inter, Playfair_Display, Poppins, Roboto } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ScrollToTop from '@/components/layout/ScrollToTop';
import CookieConsent from '@/components/layout/CookieConsent';
import PageTransition from '@/components/layout/PageTransition';
import { GoogleAnalytics, GoogleTagManager, GTMNoscript, FacebookPixel } from '@/components/layout/Analytics';
import { OrganizationSchema, LocalBusinessSchema } from '@/components/layout/StructuredData';
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
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Pet's Club Maroc | Élevage Premium de Spitz Nain & Berger Australien",
    template: "%s | Pet's Club Maroc",
  },
  description: "Élevage premium et éthique de Spitz Nain (Pomeranian) et Berger Australien au Maroc. Lignées championnes, garantie santé, accompagnement à vie.",
  keywords: [
    'éleveur spitz maroc',
    'spitz nain maroc',
    'pomeranian maroc',
    'berger australien maroc',
    'élevage chien maroc',
    'chiot spitz nain',
    'chiot berger australien',
    'éleveur éthique maroc',
    'pet\'s club maroc',
  ],
  openGraph: {
    title: "Pet's Club Maroc | Élevage Premium de Spitz Nain & Berger Australien",
    description: "Des compagnons d'exception, élevés avec amour. Spitz Nain & Berger Australien de lignées championnes.",
    type: 'website',
    locale: 'fr_FR',
    siteName: "Pet's Club Maroc",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://petsclubmaroc.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${roboto.variable}`}>
      <head>
        <GoogleAnalytics />
        <GoogleTagManager />
        <FacebookPixel />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <GTMNoscript />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
