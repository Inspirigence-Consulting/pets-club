"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/admin": "Tableau de bord",
  "/admin/chiens": "Gestion des chiens",
  "/admin/portees": "Gestion des portees",
  "/admin/chiots": "Gestion des chiots",
  "/admin/veterinaire": "Suivi veterinaire",
  "/admin/reproduction": "Programme de reproduction",
  "/admin/stocks": "Gestion des stocks",
  "/admin/annonces": "Moderation des annonces",
  "/admin/parametres": "Parametres",
}

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname]
  for (const [key, value] of Object.entries(pageTitles)) {
    if (pathname.startsWith(key + "/")) return value
  }
  return "Administration"
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-white px-6">
          <SidebarTrigger className="-ml-2 text-[var(--color-text-light)] hover:text-[var(--color-primary)]" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-sm font-semibold text-[var(--color-charcoal)]">
            {pageTitle}
          </h1>
        </header>
        <div className="flex-1 overflow-auto bg-[var(--color-cream)] p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
