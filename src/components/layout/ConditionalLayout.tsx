"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isVendor = pathname.startsWith("/vendor");
  const hideChrome = isAdmin || isVendor;
  const isHome = pathname === "/";

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header solid={!isHome} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
