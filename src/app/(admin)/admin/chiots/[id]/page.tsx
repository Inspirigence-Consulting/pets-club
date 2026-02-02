"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  Calendar,
  Palette,
  User,
  Phone,
  Dog,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface PuppyDetail {
  id: string
  name: string
  breed: string
  gender: "male" | "femelle"
  dateOfBirth: string
  color: string
  status: "disponible" | "reserve" | "vendu" | "garde"
  price?: string
  microchip?: string
  fatherName?: string
  motherName?: string
  litterName?: string
  buyerName?: string
  buyerPhone?: string
  buyerEmail?: string
  notes?: string
  vaccinations: { name: string; date: string; veterinarian: string }[]
}

const mockPuppyDetail: PuppyDetail = {
  id: "1",
  name: "Caramel",
  breed: "Pomeranian",
  gender: "male",
  dateOfBirth: "2025-01-20",
  color: "Orange",
  status: "disponible",
  price: "15000",
  microchip: "250268500999888",
  fatherName: "Max",
  motherName: "Luna",
  litterName: "Portee Alpha 2025",
  notes: "Chiot tres sociable, bon temperament. Pret pour adoption.",
  vaccinations: [
    {
      name: "Primo vaccination (CHPPIL)",
      date: "2025-03-20",
      veterinarian: "Dr. Amrani",
    },
    {
      name: "Rappel CHPPIL",
      date: "2025-04-20",
      veterinarian: "Dr. Amrani",
    },
    { name: "Rage", date: "2025-05-20", veterinarian: "Dr. Bennani" },
  ],
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      <Card className="bg-white border-0 rounded-2xl">
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-6">
            <Skeleton className="size-32 rounded-xl" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PuppyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [puppy, setPuppy] = useState<PuppyDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPuppy() {
      try {
        const res = await fetch(`/api/admin/puppies/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setPuppy(data)
        } else {
          setPuppy(mockPuppyDetail)
        }
      } catch {
        setPuppy(mockPuppyDetail)
      } finally {
        setIsLoading(false)
      }
    }
    loadPuppy()
  }, [params.id])

  if (isLoading) return <DetailSkeleton />

  if (!puppy) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <Heart className="size-12 text-[var(--color-text-muted)]" />
        <p className="text-[var(--color-text-muted)]">Chiot introuvable</p>
        <Button variant="outline" onClick={() => router.push("/admin/chiots")}>
          Retour a la liste
        </Button>
      </div>
    )
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    disponible: {
      label: "Disponible",
      color: "bg-[var(--color-accent-sage)] text-white",
    },
    reserve: {
      label: "Reserve",
      color: "bg-[var(--color-accent-terracotta)] text-white",
    },
    vendu: {
      label: "Vendu",
      color: "bg-gray-500 text-white",
    },
    garde: {
      label: "Garde",
      color: "bg-[var(--color-gold)] text-white",
    },
  }

  const age = (() => {
    const birth = new Date(puppy.dateOfBirth)
    const now = new Date()
    const months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth())
    if (months < 1) return "< 1 mois"
    if (months === 1) return "1 mois"
    return `${months} mois`
  })()

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/chiots")}
        className="gap-2 text-[var(--color-text-light)] hover:text-[var(--color-charcoal)]"
      >
        <ArrowLeft className="size-4" />
        Retour a la liste
      </Button>

      {/* Main Info */}
      <Card className="bg-white border-0 shadow-sm rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex size-32 shrink-0 items-center justify-center rounded-xl bg-[var(--color-cream)]">
              <Heart className="size-12 text-[var(--color-primary)]/30" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
                  {puppy.name}
                </h2>
                <Badge className={statusConfig[puppy.status].color}>
                  {statusConfig[puppy.status].label}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {puppy.gender === "male" ? "Male" : "Femelle"}
                </Badge>
              </div>
              <p className="mt-1 text-[var(--color-text-light)]">
                {puppy.breed} &middot; {puppy.color} &middot; {age}
              </p>
              {puppy.price && (
                <p className="mt-2 text-xl font-bold text-[var(--color-gold-dark)]">
                  {parseInt(puppy.price).toLocaleString("fr-FR")} MAD
                </p>
              )}
              {puppy.notes && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {puppy.notes}
                </p>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Calendar,
                label: "Date de naissance",
                value: new Date(puppy.dateOfBirth).toLocaleDateString("fr-FR"),
              },
              { icon: Palette, label: "Couleur", value: puppy.color },
              { icon: Dog, label: "Race", value: puppy.breed },
              {
                icon: CreditCard,
                label: "Puce",
                value: puppy.microchip || "Non puce",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[var(--color-cream-dark)] bg-[var(--color-cream)] p-3"
              >
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <item.icon className="size-3.5" />
                  <span className="text-[11px] font-medium uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[var(--color-charcoal)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pedigree / Parents */}
        <Card className="bg-white border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Pedigree</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--color-cream-dark)] p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Pere
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-50">
                    <Dog className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-charcoal)]">
                      {puppy.fatherName || "Inconnu"}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {puppy.breed}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-cream-dark)] p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Mere
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-pink-50">
                    <Dog className="size-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-charcoal)]">
                      {puppy.motherName || "Inconnue"}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {puppy.breed}
                    </p>
                  </div>
                </div>
              </div>

              {puppy.litterName && (
                <p className="text-xs text-[var(--color-text-muted)]">
                  Portee : <span className="font-medium">{puppy.litterName}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Buyer / Vaccinations */}
        <div className="space-y-6">
          {(puppy.buyerName || puppy.status === "reserve" || puppy.status === "vendu") && (
            <Card className="bg-white border-0 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">
                  Informations acheteur
                </CardTitle>
              </CardHeader>
              <CardContent>
                {puppy.buyerName ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="size-4 text-[var(--color-text-muted)]" />
                      <span className="text-sm font-medium">
                        {puppy.buyerName}
                      </span>
                    </div>
                    {puppy.buyerPhone && (
                      <div className="flex items-center gap-3">
                        <Phone className="size-4 text-[var(--color-text-muted)]" />
                        <span className="text-sm">{puppy.buyerPhone}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Aucune information acheteur
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">
                Vaccinations ({puppy.vaccinations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {puppy.vaccinations.length === 0 ? (
                <p className="text-sm text-[var(--color-text-muted)]">
                  Aucune vaccination enregistree
                </p>
              ) : (
                <div className="space-y-3">
                  {puppy.vaccinations.map((vax, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-[var(--color-cream-dark)] p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-[var(--color-charcoal)]">
                          {vax.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {vax.veterinarian}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-[var(--color-text-light)]">
                        {new Date(vax.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
