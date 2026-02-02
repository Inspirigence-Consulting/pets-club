import VendorNav from "@/components/vendor/VendorNav";

export const dynamic = "force-dynamic";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VendorNav>{children}</VendorNav>;
}
