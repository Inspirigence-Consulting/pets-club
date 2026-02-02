"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Dog,
  Baby,
  Heart,
  Stethoscope,
  Calendar,
  Package,
  Megaphone,
  Settings,
  LogOut,
  ChevronUp,
  PawPrint,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Chiens",
    url: "/admin/chiens",
    icon: Dog,
  },
  {
    title: "Portees",
    url: "/admin/portees",
    icon: Baby,
  },
  {
    title: "Chiots",
    url: "/admin/chiots",
    icon: Heart,
  },
  {
    title: "Veterinaire",
    url: "/admin/veterinaire",
    icon: Stethoscope,
  },
  {
    title: "Reproduction",
    url: "/admin/reproduction",
    icon: Calendar,
  },
  {
    title: "Stocks",
    url: "/admin/stocks",
    icon: Package,
  },
  {
    title: "Annonces",
    url: "/admin/annonces",
    icon: Megaphone,
  },
  {
    title: "Parametres",
    url: "/admin/parametres",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (url: string) => {
    if (url === "/admin") return pathname === "/admin"
    return pathname.startsWith(url)
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0"
      style={{
        ["--sidebar-background" as string]: "#1a3a2a",
        ["--sidebar-foreground" as string]: "rgba(255,255,255,0.85)",
        ["--sidebar-accent" as string]: "rgba(197,165,90,0.15)",
        ["--sidebar-accent-foreground" as string]: "#c5a55a",
        ["--sidebar-border" as string]: "rgba(255,255,255,0.08)",
      }}
    >
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent active:bg-transparent"
            >
              <Link href="/admin">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#c5a55a] text-[#1a3a2a]">
                  <PawPrint className="size-4" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold text-white">
                    Pet&apos;s Club
                  </span>
                  <span className="truncate text-xs text-white/65">
                    Administration
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="bg-white/15 mx-3" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/55 text-[10px] uppercase tracking-wider font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className={
                      isActive(item.url)
                        ? "bg-[rgba(197,165,90,0.15)] text-[#c5a55a] font-medium hover:bg-[rgba(197,165,90,0.2)] hover:text-[#c5a55a]"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator className="bg-white/15 mx-1" />
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="text-white/80 hover:bg-white/5 hover:text-white"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-[#c5a55a]/20 text-[#c5a55a] text-xs font-semibold">
                      PC
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-white">
                      Administrateur
                    </span>
                    <span className="truncate text-xs text-white/65">
                      admin@petsclub.ma
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4 text-white/60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  Parametres du compte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 size-4" />
                  Se deconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
