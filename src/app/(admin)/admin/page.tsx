"use client"

import { useState, useEffect } from "react"
import {
  Heart,
  Dog,
  AlertTriangle,
  Megaphone,
  Stethoscope,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Package,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardStats {
  totalPuppies: number
  puppiesByStatus: {
    disponible: number
    reserve: number
    vendu: number
    garde: number
  }
  activeBreedingDogs: number
  lowStockAlerts: number
  pendingListings: number
  upcomingVetAppointments: VetAppointment[]
  recentActivity: ActivityItem[]
}

interface VetAppointment {
  id: string
  dogName: string
  type: string
  date: string
  status: string
}

interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
}

const mockStats: DashboardStats = {
  totalPuppies: 24,
  puppiesByStatus: {
    disponible: 8,
    reserve: 6,
    vendu: 7,
    garde: 3,
  },
  activeBreedingDogs: 12,
  lowStockAlerts: 5,
  pendingListings: 3,
  upcomingVetAppointments: [
    {
      id: "1",
      dogName: "Luna",
      type: "Vaccination",
      date: "2026-02-03",
      status: "planifie",
    },
    {
      id: "2",
      dogName: "Max",
      type: "Controle annuel",
      date: "2026-02-05",
      status: "planifie",
    },
    {
      id: "3",
      dogName: "Bella",
      type: "Echographie",
      date: "2026-02-07",
      status: "planifie",
    },
    {
      id: "4",
      dogName: "Rocky",
      type: "Detartrage",
      date: "2026-02-10",
      status: "planifie",
    },
  ],
  recentActivity: [
    {
      id: "1",
      type: "puppy",
      description: "Nouveau chiot ajoute: Caramel (Pomeranian)",
      timestamp: "2026-01-31T10:30:00",
    },
    {
      id: "2",
      type: "sale",
      description: "Chiot Milo marque comme vendu",
      timestamp: "2026-01-30T15:45:00",
    },
    {
      id: "3",
      type: "vet",
      description: "Vaccination effectuee pour Bella",
      timestamp: "2026-01-30T09:00:00",
    },
    {
      id: "4",
      type: "stock",
      description: "Stock bas: Croquettes Premium (3 restants)",
      timestamp: "2026-01-29T14:20:00",
    },
    {
      id: "5",
      type: "listing",
      description: "Nouvelle annonce en attente de moderation",
      timestamp: "2026-01-29T11:00:00",
    },
  ],
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-48" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-2 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats")
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        } else {
          setStats(mockStats)
        }
      } catch {
        setStats(mockStats)
      } finally {
        setIsLoading(false)
      }
    }
    loadStats()
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  const data = stats ?? mockStats

  const statCards = [
    {
      title: "Total chiots",
      value: data.totalPuppies,
      description: `${data.puppiesByStatus.disponible} disponibles, ${data.puppiesByStatus.reserve} reserves`,
      icon: Heart,
      iconBg: "bg-[var(--color-accent-blush)]",
      iconColor: "text-[var(--color-accent-terracotta)]",
      trend: `+${data.puppiesByStatus.disponible}`,
    },
    {
      title: "Chiens reproducteurs",
      value: data.activeBreedingDogs,
      description: "Chiens actifs dans le programme",
      icon: Dog,
      iconBg: "bg-[var(--color-gold)]/10",
      iconColor: "text-[var(--color-gold-dark)]",
      trend: null,
    },
    {
      title: "Alertes stock",
      value: data.lowStockAlerts,
      description: "Produits en stock bas",
      icon: AlertTriangle,
      iconBg: data.lowStockAlerts > 0 ? "bg-red-50" : "bg-green-50",
      iconColor: data.lowStockAlerts > 0 ? "text-red-600" : "text-green-600",
      trend: null,
    },
    {
      title: "Annonces en attente",
      value: data.pendingListings,
      description: "Annonces a moderer",
      icon: Megaphone,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: null,
    },
  ]

  const statusColors: Record<string, string> = {
    disponible: "bg-[var(--color-accent-sage)] text-white",
    reserve: "bg-[var(--color-accent-terracotta)] text-white",
    vendu: "bg-gray-500 text-white",
    garde: "bg-[var(--color-gold)] text-white",
  }

  const activityIcons: Record<string, typeof Heart> = {
    puppy: Heart,
    sale: TrendingUp,
    vet: Stethoscope,
    stock: Package,
    listing: Megaphone,
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    })
  }

  function formatTimestamp(ts: string) {
    const date = new Date(ts)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return "Il y a moins d'1 heure"
    if (diffHours < 24) return `Il y a ${diffHours}h`
    if (diffDays === 1) return "Hier"
    return `Il y a ${diffDays} jours`
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="rounded-2xl bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                {stat.title}
              </CardDescription>
              <div className={`flex size-9 items-center justify-center rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`size-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[var(--color-charcoal)]">
                  {stat.value}
                </span>
                {stat.trend && (
                  <span className="mb-1 flex items-center text-xs font-medium text-green-600">
                    <ArrowUpRight className="size-3" />
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Puppies Status Breakdown */}
      <Card className="rounded-2xl bg-white border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[var(--color-charcoal)]">
            Repartition des chiots par statut
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.entries(data.puppiesByStatus).map(([status, count]) => (
              <div
                key={status}
                className="flex flex-col items-center gap-2 rounded-xl border border-[var(--color-cream-dark)] bg-[var(--color-cream)] p-4"
              >
                <Badge className={`${statusColors[status]} text-[11px]`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
                <span className="text-2xl font-bold text-[var(--color-charcoal)]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Vet Appointments */}
        <Card className="rounded-2xl bg-white border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-[var(--color-charcoal)]">
                Prochains rendez-vous veto
              </CardTitle>
              <Calendar className="size-4 text-[var(--color-text-muted)]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.upcomingVetAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 rounded-xl border border-[var(--color-cream-dark)] p-3 transition-colors hover:bg-[var(--color-cream)]"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                    <Stethoscope className="size-4 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-charcoal)]">
                      {appointment.dogName}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {appointment.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--color-charcoal)]">
                      {formatDate(appointment.date)}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-[var(--color-gold)]/30 text-[var(--color-gold-dark)]"
                    >
                      Planifie
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-2xl bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--color-charcoal)]">
              Activite recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => {
                const Icon = activityIcons[activity.type] || Heart
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-dark)]">
                      <Icon className="size-3.5 text-[var(--color-text-light)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--color-charcoal)]">
                        {activity.description}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
