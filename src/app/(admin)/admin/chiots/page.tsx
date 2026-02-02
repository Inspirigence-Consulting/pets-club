"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Heart,
  Grid3X3,
  List,
} from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const puppySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  gender: z.enum(["MALE", "FEMALE"]),
  dateOfBirth: z.string().min(1, "La date de naissance est requise"),
  color: z.string().min(1, "La couleur est requise"),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "KEPT"]),
  litterId: z.string().min(1, "La portee est requise"),
  price: z.string().optional(),
  buyerName: z.string().optional(),
  buyerPhone: z.string().optional(),
  notes: z.string().optional(),
})

type PuppyFormData = z.infer<typeof puppySchema>

interface PuppyRecord {
  id: string
  name: string
  breed: string
  gender: "MALE" | "FEMALE"
  dateOfBirth: string
  color: string
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "KEPT"
  litterId?: string
  litterName?: string
  fatherName?: string
  motherName?: string
  price?: number
  buyerName?: string
  buyerPhone?: string
  notes?: string
  litter?: {
    id: string
    name: string
    sire: { id: string; name: string; breed: string }
    dam: { id: string; name: string; breed: string }
  }
}

const mockPuppies: PuppyRecord[] = [
  {
    id: "1",
    name: "Caramel",
    breed: "Pomeranian",
    gender: "MALE",
    dateOfBirth: "2025-01-20",
    color: "Orange",
    status: "AVAILABLE",
    litterId: "litter-1",
    litterName: "Portee Alpha 2025",
    fatherName: "Max",
    motherName: "Luna",
    price: 15000,
    litter: { id: "litter-1", name: "Portee Alpha 2025", sire: { id: "s1", name: "Max", breed: "Pomeranian" }, dam: { id: "d1", name: "Luna", breed: "Pomeranian" } },
  },
  {
    id: "2",
    name: "Neige",
    breed: "Pomeranian",
    gender: "FEMALE",
    dateOfBirth: "2025-01-20",
    color: "Blanc",
    status: "RESERVED",
    litterId: "litter-1",
    litterName: "Portee Alpha 2025",
    fatherName: "Max",
    motherName: "Luna",
    price: 18000,
    buyerName: "Ahmed Benali",
    buyerPhone: "+212 6 12 34 56 78",
    litter: { id: "litter-1", name: "Portee Alpha 2025", sire: { id: "s1", name: "Max", breed: "Pomeranian" }, dam: { id: "d1", name: "Luna", breed: "Pomeranian" } },
  },
  {
    id: "3",
    name: "Shadow",
    breed: "Berger Australien",
    gender: "MALE",
    dateOfBirth: "2025-06-15",
    color: "Blue merle",
    status: "AVAILABLE",
    litterId: "litter-2",
    litterName: "Portee Beta 2025",
    fatherName: "Rocky",
    motherName: "Bella",
    price: 22000,
    litter: { id: "litter-2", name: "Portee Beta 2025", sire: { id: "s2", name: "Rocky", breed: "Berger Australien" }, dam: { id: "d2", name: "Bella", breed: "Berger Australien" } },
  },
  {
    id: "4",
    name: "Milo",
    breed: "Pomeranian",
    gender: "MALE",
    dateOfBirth: "2025-01-20",
    color: "Creme",
    status: "SOLD",
    litterId: "litter-1",
    litterName: "Portee Alpha 2025",
    fatherName: "Max",
    motherName: "Luna",
    price: 16000,
    buyerName: "Fatima Zahri",
    buyerPhone: "+212 6 98 76 54 32",
    litter: { id: "litter-1", name: "Portee Alpha 2025", sire: { id: "s1", name: "Max", breed: "Pomeranian" }, dam: { id: "d1", name: "Luna", breed: "Pomeranian" } },
  },
  {
    id: "5",
    name: "Sunset",
    breed: "Berger Australien",
    gender: "FEMALE",
    dateOfBirth: "2025-06-15",
    color: "Red tricolor",
    status: "KEPT",
    litterId: "litter-2",
    litterName: "Portee Beta 2025",
    fatherName: "Rocky",
    motherName: "Bella",
    notes: "Gardee pour le programme d'elevage",
    litter: { id: "litter-2", name: "Portee Beta 2025", sire: { id: "s2", name: "Rocky", breed: "Berger Australien" }, dam: { id: "d2", name: "Bella", breed: "Berger Australien" } },
  },
  {
    id: "6",
    name: "Cookie",
    breed: "Pomeranian",
    gender: "FEMALE",
    dateOfBirth: "2025-01-20",
    color: "Chocolat",
    status: "AVAILABLE",
    litterId: "litter-1",
    litterName: "Portee Alpha 2025",
    fatherName: "Max",
    motherName: "Luna",
    price: 17000,
    litter: { id: "litter-1", name: "Portee Alpha 2025", sire: { id: "s1", name: "Max", breed: "Pomeranian" }, dam: { id: "d1", name: "Luna", breed: "Pomeranian" } },
  },
  {
    id: "7",
    name: "Storm",
    breed: "Berger Australien",
    gender: "MALE",
    dateOfBirth: "2025-06-15",
    color: "Black tricolor",
    status: "RESERVED",
    litterId: "litter-2",
    litterName: "Portee Beta 2025",
    fatherName: "Rocky",
    motherName: "Bella",
    price: 20000,
    buyerName: "Omar Kadi",
    buyerPhone: "+212 6 55 44 33 22",
    litter: { id: "litter-2", name: "Portee Beta 2025", sire: { id: "s2", name: "Rocky", breed: "Berger Australien" }, dam: { id: "d2", name: "Bella", breed: "Berger Australien" } },
  },
  {
    id: "8",
    name: "Pearl",
    breed: "Pomeranian",
    gender: "FEMALE",
    dateOfBirth: "2025-09-05",
    color: "Blanc perle",
    status: "AVAILABLE",
    litterId: "litter-3",
    litterName: "Portee Delta 2025",
    fatherName: "Max",
    motherName: "Daisy",
    price: 19000,
    litter: { id: "litter-3", name: "Portee Delta 2025", sire: { id: "s1", name: "Max", breed: "Pomeranian" }, dam: { id: "d3", name: "Daisy", breed: "Pomeranian" } },
  },
]

const statusConfig: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  AVAILABLE: {
    label: "Disponible",
    color: "bg-[var(--color-accent-sage)] text-white",
    dot: "bg-[var(--color-accent-sage)]",
  },
  RESERVED: {
    label: "Reserve",
    color: "bg-[var(--color-accent-terracotta)] text-white",
    dot: "bg-[var(--color-accent-terracotta)]",
  },
  SOLD: {
    label: "Vendu",
    color: "bg-gray-500 text-white",
    dot: "bg-gray-500",
  },
  KEPT: {
    label: "Garde",
    color: "bg-[var(--color-gold)] text-white",
    dot: "bg-[var(--color-gold)]",
  },
}

const emptyForm: PuppyFormData = {
  name: "",
  gender: "MALE",
  dateOfBirth: "",
  color: "",
  status: "AVAILABLE",
  litterId: "",
  price: "",
  buyerName: "",
  buyerPhone: "",
  notes: "",
}

function GridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="rounded-2xl bg-white border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function ChiotsPage() {
  const [puppies, setPuppies] = useState<PuppyRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPuppy, setEditingPuppy] = useState<PuppyRecord | null>(null)
  const [form, setForm] = useState<PuppyFormData>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableLitters, setAvailableLitters] = useState<
    { id: string; name: string; sire: { name: string; breed: string }; dam: { name: string; breed: string } }[]
  >([])

  useEffect(() => {
    async function loadPuppies() {
      try {
        const res = await fetch("/api/admin/puppies")
        if (res.ok) {
          const data = await res.json()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped: PuppyRecord[] = data.map((puppy: any) => ({
            ...puppy,
            breed: puppy.litter?.sire?.breed || "",
            litterName: puppy.litter?.name || "",
            fatherName: puppy.litter?.sire?.name || "",
            motherName: puppy.litter?.dam?.name || "",
            litterId: puppy.litter?.id || puppy.litterId,
          }))
          setPuppies(mapped)
        } else {
          setPuppies(mockPuppies)
        }
      } catch {
        setPuppies(mockPuppies)
      } finally {
        setIsLoading(false)
      }
    }

    async function loadLitters() {
      try {
        const res = await fetch("/api/admin/litters")
        if (res.ok) {
          const data = await res.json()
          setAvailableLitters(data)
        }
      } catch {
        // litters unavailable, form will show empty list
      }
    }

    loadPuppies()
    loadLitters()
  }, [])

  const filteredPuppies = useMemo(() => {
    return puppies.filter((puppy) => {
      const matchSearch =
        !search ||
        puppy.name.toLowerCase().includes(search.toLowerCase()) ||
        puppy.breed.toLowerCase().includes(search.toLowerCase()) ||
        puppy.color.toLowerCase().includes(search.toLowerCase())
      const matchStatus =
        filterStatus === "all" || puppy.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [puppies, search, filterStatus])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: puppies.length }
    puppies.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1
    })
    return counts
  }, [puppies])

  function openCreateDialog() {
    setEditingPuppy(null)
    setForm(emptyForm)
    setErrors({})
    setDialogOpen(true)
  }

  function openEditDialog(puppy: PuppyRecord) {
    setEditingPuppy(puppy)
    setForm({
      name: puppy.name,
      gender: puppy.gender,
      dateOfBirth: puppy.dateOfBirth,
      color: puppy.color,
      status: puppy.status,
      litterId: puppy.litterId || "",
      price: puppy.price != null ? String(puppy.price) : "",
      buyerName: puppy.buyerName || "",
      buyerPhone: puppy.buyerPhone || "",
      notes: puppy.notes || "",
    })
    setErrors({})
    setDialogOpen(true)
  }

  async function handleSubmit() {
    const result = puppySchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const err of result.error.issues) {
        const key = err.path[0]
        if (key) fieldErrors[String(key)] = err.message
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingPuppy
        ? `/api/admin/puppies/${editingPuppy.id}`
        : "/api/admin/puppies"
      const method = editingPuppy ? "PUT" : "POST"

      const apiPayload = {
        ...result.data,
        price: result.data.price ? parseFloat(result.data.price) : undefined,
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      })

      if (res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const saved: any = await res.json()
        const mappedSaved: PuppyRecord = {
          ...saved,
          breed: saved.litter?.sire?.breed || "",
          litterName: saved.litter?.name || "",
          fatherName: saved.litter?.sire?.name || "",
          motherName: saved.litter?.dam?.name || "",
          litterId: saved.litter?.id || saved.litterId,
        }
        if (editingPuppy) {
          setPuppies((prev) =>
            prev.map((p) => (p.id === editingPuppy.id ? mappedSaved : p))
          )
        } else {
          setPuppies((prev) => [...prev, mappedSaved])
        }
      } else {
        const selectedLitter = availableLitters.find((l) => l.id === result.data.litterId)
        const newPuppy: PuppyRecord = {
          id: editingPuppy?.id || Date.now().toString(),
          ...result.data,
          price: result.data.price ? parseFloat(result.data.price) : undefined,
          breed: selectedLitter?.sire?.breed || "",
          litterName: selectedLitter?.name || "",
          fatherName: selectedLitter?.sire?.name || "",
          motherName: selectedLitter?.dam?.name || "",
        }
        if (editingPuppy) {
          setPuppies((prev) =>
            prev.map((p) => (p.id === editingPuppy.id ? newPuppy : p))
          )
        } else {
          setPuppies((prev) => [...prev, newPuppy])
        }
      }
      setDialogOpen(false)
    } catch {
      setDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(puppyId: string) {
    if (!confirm("Etes-vous sur de vouloir supprimer ce chiot ?")) return
    try {
      await fetch(`/api/admin/puppies/${puppyId}`, { method: "DELETE" })
    } catch {
      // continue
    }
    setPuppies((prev) => prev.filter((p) => p.id !== puppyId))
  }

  function getAge(dateOfBirth: string): string {
    const birth = new Date(dateOfBirth)
    const now = new Date()
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
    if (months < 1) return "< 1 mois"
    if (months === 1) return "1 mois"
    return `${months} mois`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
            Chiots ({puppies.length})
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Gerez vos chiots, leurs statuts et informations
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border bg-white">
            <Button
              variant="ghost"
              size="icon"
              className={`size-9 ${viewMode === "grid" ? "bg-[var(--color-cream)]" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`size-9 ${viewMode === "table" ? "bg-[var(--color-cream)]" : ""}`}
              onClick={() => setViewMode("table")}
            >
              <List className="size-4" />
            </Button>
          </div>
          <Button
            onClick={openCreateDialog}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
          >
            <Plus className="mr-2 size-4" />
            Ajouter un chiot
          </Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <Tabs
        value={filterStatus}
        onValueChange={setFilterStatus}
      >
        <TabsList>
          <TabsTrigger value="all">
            Tous ({statusCounts.all || 0})
          </TabsTrigger>
          <TabsTrigger value="AVAILABLE">
            Disponible ({statusCounts.AVAILABLE || 0})
          </TabsTrigger>
          <TabsTrigger value="RESERVED">
            Reserve ({statusCounts.RESERVED || 0})
          </TabsTrigger>
          <TabsTrigger value="SOLD">
            Vendu ({statusCounts.SOLD || 0})
          </TabsTrigger>
          <TabsTrigger value="KEPT">
            Garde ({statusCounts.KEPT || 0})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <Card className="rounded-2xl bg-white border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <Input
              placeholder="Rechercher par nom, race, couleur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {isLoading ? (
        <GridSkeleton />
      ) : filteredPuppies.length === 0 ? (
        <Card className="rounded-2xl bg-white border-0 shadow-sm">
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <Heart className="size-10 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Aucun chiot trouve
              </p>
            </div>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPuppies.map((puppy) => (
            <Card
              key={puppy.id}
              className="group rounded-2xl bg-white border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                {/* Placeholder photo area */}
                <div className="relative mb-3 flex aspect-square items-center justify-center rounded-xl bg-[var(--color-cream)]">
                  <Heart className="size-8 text-[var(--color-primary)]/30" />
                  <Badge
                    className={`absolute top-2 right-2 ${statusConfig[puppy.status].color} text-[10px]`}
                  >
                    {statusConfig[puppy.status].label}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[var(--color-charcoal)]">
                      {puppy.name}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/chiots/${puppy.id}`}>
                            <Eye className="mr-2 size-4" />
                            Voir details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(puppy)}>
                          <Pencil className="mr-2 size-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(puppy.id)}
                        >
                          <Trash2 className="mr-2 size-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)]">
                    {puppy.breed} &middot; {puppy.color}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {puppy.gender === "MALE" ? "Male" : "Femelle"} &middot;{" "}
                      {getAge(puppy.dateOfBirth)}
                    </span>
                    {puppy.price != null && (
                      <span className="text-sm font-semibold text-[var(--color-gold-dark)]">
                        {puppy.price.toLocaleString("fr-FR")} MAD
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card className="rounded-2xl overflow-hidden bg-white border-0 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Race</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Couleur</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPuppies.map((puppy) => (
                <TableRow key={puppy.id}>
                  <TableCell className="font-medium text-[var(--color-charcoal)]">
                    {puppy.name}
                  </TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {puppy.breed}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs capitalize">
                      {puppy.gender === "MALE" ? "Male" : "Femelle"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {puppy.color}
                  </TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {getAge(puppy.dateOfBirth)}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[puppy.status].color}>
                      {statusConfig[puppy.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-[var(--color-gold-dark)]">
                    {puppy.price != null
                      ? `${puppy.price.toLocaleString("fr-FR")} MAD`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/chiots/${puppy.id}`}>
                            <Eye className="mr-2 size-4" />
                            Voir details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(puppy)}>
                          <Pencil className="mr-2 size-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(puppy.id)}
                        >
                          <Trash2 className="mr-2 size-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPuppy ? "Modifier le chiot" : "Ajouter un chiot"}
            </DialogTitle>
            <DialogDescription>
              {editingPuppy
                ? "Modifiez les informations du chiot."
                : "Remplissez les informations pour ajouter un nouveau chiot."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="puppy-name">Nom *</Label>
              <Input
                id="puppy-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Caramel"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Portee *</Label>
              <Select
                value={form.litterId}
                onValueChange={(v) => setForm({ ...form, litterId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionnez une portee" />
                </SelectTrigger>
                <SelectContent>
                  {availableLitters.map((litter) => (
                    <SelectItem key={litter.id} value={litter.id}>
                      {litter.name} ({litter.sire?.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.litterId && (
                <p className="text-xs text-red-600">{errors.litterId}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Genre *</Label>
                <Select
                  value={form.gender}
                  onValueChange={(v) =>
                    setForm({ ...form, gender: v as "MALE" | "FEMALE" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Femelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="puppy-color">Couleur *</Label>
                <Input
                  id="puppy-color"
                  value={form.color}
                  onChange={(e) =>
                    setForm({ ...form, color: e.target.value })
                  }
                  placeholder="Ex: Orange sable"
                />
                {errors.color && (
                  <p className="text-xs text-red-600">{errors.color}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="puppy-dob">Date de naissance *</Label>
                <Input
                  id="puppy-dob"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) =>
                    setForm({ ...form, dateOfBirth: e.target.value })
                  }
                />
                {errors.dateOfBirth && (
                  <p className="text-xs text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="puppy-price">Prix (MAD)</Label>
                <Input
                  id="puppy-price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  placeholder="Ex: 15000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Statut</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm({
                      ...form,
                      status: v as PuppyFormData["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Disponible</SelectItem>
                    <SelectItem value="RESERVED">Reserve</SelectItem>
                    <SelectItem value="SOLD">Vendu</SelectItem>
                    <SelectItem value="KEPT">Garde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(form.status === "RESERVED" || form.status === "SOLD") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="buyer-name">Nom de l&apos;acheteur</Label>
                  <Input
                    id="buyer-name"
                    value={form.buyerName}
                    onChange={(e) =>
                      setForm({ ...form, buyerName: e.target.value })
                    }
                    placeholder="Nom complet"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="buyer-phone">Telephone</Label>
                  <Input
                    id="buyer-phone"
                    value={form.buyerPhone}
                    onChange={(e) =>
                      setForm({ ...form, buyerPhone: e.target.value })
                    }
                    placeholder="+212 6..."
                  />
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="puppy-notes">Notes</Label>
              <Textarea
                id="puppy-notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes supplementaires..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
            >
              {isSubmitting
                ? "Enregistrement..."
                : editingPuppy
                  ? "Mettre a jour"
                  : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
