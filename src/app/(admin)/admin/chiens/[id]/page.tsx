"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Dog,
  Calendar,
  Weight,
  Palette,
  Cpu,
  Stethoscope,
  Heart,
  Baby,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DogDetail {
  id: string
  name: string
  breed: string
  gender: "male" | "femelle"
  dateOfBirth: string
  status: "actif" | "retraite" | "decede"
  color: string
  weight?: string
  microchip?: string
  notes?: string
  litters: LitterRecord[]
  vetRecords: VetRecord[]
  reproductionHistory: ReproductionRecord[]
}

interface LitterRecord {
  id: string
  name: string
  partnerName: string
  date: string
  puppyCount: number
  status: string
}

interface VetRecord {
  id: string
  type: string
  date: string
  veterinarian: string
  notes: string
  status: string
}

interface ReproductionRecord {
  id: string
  partnerName: string
  date: string
  method: string
  result: string
}

const mockDogDetail: DogDetail = {
  id: "1",
  name: "Luna",
  breed: "Pomeranian",
  gender: "femelle",
  dateOfBirth: "2022-03-15",
  status: "actif",
  color: "Orange sable",
  weight: "2.8",
  microchip: "250268500123456",
  notes: "Excellente reproductrice, temperament doux. Lignee championne.",
  litters: [
    {
      id: "1",
      name: "Portee A 2024",
      partnerName: "Max",
      date: "2024-06-10",
      puppyCount: 4,
      status: "complete",
    },
    {
      id: "2",
      name: "Portee B 2025",
      partnerName: "Rocky",
      date: "2025-01-20",
      puppyCount: 3,
      status: "en cours",
    },
  ],
  vetRecords: [
    {
      id: "1",
      type: "Vaccination",
      date: "2025-12-15",
      veterinarian: "Dr. Amrani",
      notes: "Rappel annuel - RCP + Rage",
      status: "complete",
    },
    {
      id: "2",
      type: "Controle annuel",
      date: "2025-11-20",
      veterinarian: "Dr. Amrani",
      notes: "Bilan sanguin normal. Bonne sante generale.",
      status: "complete",
    },
    {
      id: "3",
      type: "Echographie",
      date: "2026-02-07",
      veterinarian: "Dr. Bennani",
      notes: "Echographie de gestation prevue",
      status: "planifie",
    },
  ],
  reproductionHistory: [
    {
      id: "1",
      partnerName: "Max",
      date: "2024-04-05",
      method: "Saillie naturelle",
      result: "Gestation confirmee - 4 chiots",
    },
    {
      id: "2",
      partnerName: "Rocky",
      date: "2025-11-15",
      method: "Saillie naturelle",
      result: "Gestation confirmee - 3 chiots",
    },
  ],
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export default function DogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [dog, setDog] = useState<DogDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDog() {
      try {
        const res = await fetch(`/api/admin/dogs/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setDog(data)
        } else {
          setDog(mockDogDetail)
        }
      } catch {
        setDog(mockDogDetail)
      } finally {
        setIsLoading(false)
      }
    }
    loadDog()
  }, [params.id])

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (!dog) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <Dog className="size-12 text-[var(--color-text-muted)]" />
        <p className="text-[var(--color-text-muted)]">Chien introuvable</p>
        <Button variant="outline" onClick={() => router.push("/admin/chiens")}>
          Retour a la liste
        </Button>
      </div>
    )
  }

  const age = Math.floor(
    (Date.now() - new Date(dog.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  )

  const statusStyles: Record<string, string> = {
    actif: "bg-[var(--color-accent-sage)] text-white",
    retraite: "bg-[var(--color-gold)] text-white",
    decede: "bg-gray-400 text-white",
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/chiens")}
        className="gap-2 text-[var(--color-text-light)] hover:text-[var(--color-charcoal)]"
      >
        <ArrowLeft className="size-4" />
        Retour a la liste
      </Button>

      {/* Dog Profile Header */}
      <Card className="bg-white border-0 shadow-sm rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex size-20 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-primary)]">
              <Dog className="size-10" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
                  {dog.name}
                </h2>
                <Badge className={statusStyles[dog.status]}>
                  {dog.status.charAt(0).toUpperCase() + dog.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {dog.gender === "male" ? "Male" : "Femelle"}
                </Badge>
              </div>
              <p className="mt-1 text-[var(--color-text-light)]">
                {dog.breed} &middot; {age} ans &middot; {dog.color}
              </p>
              {dog.notes && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {dog.notes}
                </p>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                icon: Calendar,
                label: "Date de naissance",
                value: new Date(dog.dateOfBirth).toLocaleDateString("fr-FR"),
              },
              { icon: Dog, label: "Race", value: dog.breed },
              { icon: Palette, label: "Couleur", value: dog.color },
              {
                icon: Weight,
                label: "Poids",
                value: dog.weight ? `${dog.weight} kg` : "N/A",
              },
              {
                icon: Cpu,
                label: "Puce",
                value: dog.microchip || "N/A",
              },
              {
                icon: Baby,
                label: "Portees",
                value: `${dog.litters?.length ?? 0} portee(s)`,
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
                <p className="mt-1 text-sm font-semibold text-[var(--color-charcoal)] truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="portees">
        <TabsList>
          <TabsTrigger value="portees" className="gap-1.5">
            <Baby className="size-3.5" />
            Portees
          </TabsTrigger>
          <TabsTrigger value="veterinaire" className="gap-1.5">
            <Stethoscope className="size-3.5" />
            Veterinaire
          </TabsTrigger>
          <TabsTrigger value="reproduction" className="gap-1.5">
            <Heart className="size-3.5" />
            Reproduction
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portees">
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">
                Portees ({dog.litters?.length ?? 0})
              </CardTitle>
            </CardHeader>
            {!dog.litters?.length ? (
              <CardContent>
                <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
                  Aucune portee enregistree
                </p>
              </CardContent>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Partenaire</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Chiots</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dog.litters?.map((litter) => (
                    <TableRow key={litter.id}>
                      <TableCell className="font-medium">
                        {litter.name}
                      </TableCell>
                      <TableCell>{litter.partnerName}</TableCell>
                      <TableCell>
                        {new Date(litter.date).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>{litter.puppyCount}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            litter.status === "complete"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)]"
                          }
                        >
                          {litter.status === "complete"
                            ? "Complete"
                            : "En cours"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="veterinaire">
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">
                Historique veterinaire ({dog.vetRecords.length})
              </CardTitle>
            </CardHeader>
            {dog.vetRecords.length === 0 ? (
              <CardContent>
                <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
                  Aucun dossier veterinaire
                </p>
              </CardContent>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Veterinaire</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dog.vetRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.type}
                      </TableCell>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>{record.veterinarian}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-[var(--color-text-muted)]">
                        {record.notes}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            record.status === "complete"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-blue-200 bg-blue-50 text-blue-700"
                          }
                        >
                          {record.status === "complete"
                            ? "Complete"
                            : "Planifie"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="reproduction">
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">
                Historique de reproduction ({dog.reproductionHistory.length})
              </CardTitle>
            </CardHeader>
            {dog.reproductionHistory.length === 0 ? (
              <CardContent>
                <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
                  Aucun historique de reproduction
                </p>
              </CardContent>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partenaire</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Methode</TableHead>
                    <TableHead>Resultat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dog.reproductionHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.partnerName}
                      </TableCell>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>{record.method}</TableCell>
                      <TableCell className="text-[var(--color-text-light)]">
                        {record.result}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
