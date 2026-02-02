"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Eye, Pencil, Trash2, Dog } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
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

const dogSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  breed: z.string().min(1, "La race est requise"),
  gender: z.enum(["MALE", "FEMALE"], { message: "Le genre est requis" }),
  dateOfBirth: z.string().min(1, "La date de naissance est requise"),
  status: z.enum(["ACTIVE", "RETIRED", "DECEASED"]),
  color: z.string().min(1, "La couleur est requise"),
  weight: z.string().optional(),
  microchipNumber: z.string().optional(),
  description: z.string().optional(),
})

type DogFormData = z.infer<typeof dogSchema>

interface DogRecord {
  id: string
  name: string
  breed: string
  gender: "MALE" | "FEMALE"
  dateOfBirth: string
  status: "ACTIVE" | "RETIRED" | "DECEASED"
  color: string
  weight?: number
  microchipNumber?: string
  description?: string
  photoUrl?: string
}

const mockDogs: DogRecord[] = [
  {
    id: "1",
    name: "Luna",
    breed: "Pomeranian",
    gender: "FEMALE",
    dateOfBirth: "2022-03-15",
    status: "ACTIVE",
    color: "Orange sable",
    weight: 2.8,
    microchipNumber: "250268500123456",
    photoUrl: "/images/dogs/luna.jpg",
  },
  {
    id: "2",
    name: "Max",
    breed: "Berger Australien",
    gender: "MALE",
    dateOfBirth: "2021-07-20",
    status: "ACTIVE",
    color: "Blue merle",
    weight: 27,
    microchipNumber: "250268500789012",
    photoUrl: "/images/dogs/max.jpg",
  },
  {
    id: "3",
    name: "Bella",
    breed: "Pomeranian",
    gender: "FEMALE",
    dateOfBirth: "2023-01-10",
    status: "ACTIVE",
    color: "Creme",
    weight: 2.5,
    microchipNumber: "250268500345678",
  },
  {
    id: "4",
    name: "Rocky",
    breed: "Berger Australien",
    gender: "MALE",
    dateOfBirth: "2020-11-05",
    status: "ACTIVE",
    color: "Red tricolor",
    weight: 29,
    microchipNumber: "250268500901234",
  },
  {
    id: "5",
    name: "Daisy",
    breed: "Pomeranian",
    gender: "FEMALE",
    dateOfBirth: "2019-06-22",
    status: "RETIRED",
    color: "Noir",
    weight: 3.1,
    microchipNumber: "250268500567890",
  },
  {
    id: "6",
    name: "Thor",
    breed: "Berger Australien",
    gender: "MALE",
    dateOfBirth: "2022-09-14",
    status: "ACTIVE",
    color: "Black tricolor",
    weight: 25.5,
    microchipNumber: "250268500234567",
  },
]

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-8 w-8 ml-auto" />
        </div>
      ))}
    </div>
  )
}

const emptyDogForm: DogFormData = {
  name: "",
  breed: "",
  gender: "MALE",
  dateOfBirth: "",
  status: "ACTIVE",
  color: "",
  weight: "",
  microchipNumber: "",
  description: "",
}

export default function ChiensPage() {
  const [dogs, setDogs] = useState<DogRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterBreed, setFilterBreed] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDog, setEditingDog] = useState<DogRecord | null>(null)
  const [form, setForm] = useState<DogFormData>(emptyDogForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadDogs() {
      try {
        const res = await fetch("/api/admin/dogs")
        if (res.ok) {
          const data = await res.json()
          setDogs(data)
        } else {
          setDogs(mockDogs)
        }
      } catch {
        setDogs(mockDogs)
      } finally {
        setIsLoading(false)
      }
    }
    loadDogs()
  }, [])

  const filteredDogs = useMemo(() => {
    return dogs.filter((dog) => {
      const matchSearch =
        !search ||
        dog.name.toLowerCase().includes(search.toLowerCase()) ||
        dog.breed.toLowerCase().includes(search.toLowerCase()) ||
        dog.color.toLowerCase().includes(search.toLowerCase())
      const matchBreed = filterBreed === "all" || dog.breed === filterBreed
      const matchStatus = filterStatus === "all" || dog.status === filterStatus
      return matchSearch && matchBreed && matchStatus
    })
  }, [dogs, search, filterBreed, filterStatus])

  const breeds = useMemo(() => {
    return [...new Set(dogs.map((d) => d.breed))]
  }, [dogs])

  function openCreateDialog() {
    setEditingDog(null)
    setForm(emptyDogForm)
    setErrors({})
    setDialogOpen(true)
  }

  function openEditDialog(dog: DogRecord) {
    setEditingDog(dog)
    setForm({
      name: dog.name,
      breed: dog.breed,
      gender: dog.gender,
      dateOfBirth: dog.dateOfBirth,
      status: dog.status,
      color: dog.color,
      weight: dog.weight != null ? String(dog.weight) : "",
      microchipNumber: dog.microchipNumber || "",
      description: dog.description || "",
    })
    setErrors({})
    setDialogOpen(true)
  }

  async function handleSubmit() {
    const result = dogSchema.safeParse(form)
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
      const url = editingDog
        ? `/api/admin/dogs/${editingDog.id}`
        : "/api/admin/dogs"
      const method = editingDog ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          weight: result.data.weight ? parseFloat(result.data.weight) : undefined,
        }),
      })

      if (res.ok) {
        const saved = await res.json()
        if (editingDog) {
          setDogs((prev) =>
            prev.map((d) => (d.id === editingDog.id ? saved : d))
          )
        } else {
          setDogs((prev) => [...prev, saved])
        }
      } else {
        // Fallback to local update
        if (editingDog) {
          setDogs((prev) =>
            prev.map((d) =>
              d.id === editingDog.id ? { ...d, ...result.data } as DogRecord : d
            )
          )
        } else {
          setDogs((prev) => [
            ...prev,
            { ...result.data, id: Date.now().toString() } as DogRecord,
          ])
        }
      }
      setDialogOpen(false)
    } catch {
      // Fallback
      if (editingDog) {
        setDogs((prev) =>
          prev.map((d) =>
            d.id === editingDog.id ? { ...d, ...form } as DogRecord : d
          )
        )
      } else {
        setDogs((prev) => [
          ...prev,
          { ...form, id: Date.now().toString() } as DogRecord,
        ])
      }
      setDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(dogId: string) {
    if (!confirm("Etes-vous sur de vouloir supprimer ce chien ?")) return
    try {
      await fetch(`/api/admin/dogs/${dogId}`, { method: "DELETE" })
    } catch {
      // continue
    }
    setDogs((prev) => prev.filter((d) => d.id !== dogId))
  }

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ACTIVE: "bg-[var(--color-accent-sage)] text-white",
      RETIRED: "bg-[var(--color-gold)] text-white",
      DECEASED: "bg-gray-400 text-white",
    }
    const labels: Record<string, string> = {
      ACTIVE: "Actif",
      RETIRED: "Retraite",
      DECEASED: "Decede",
    }
    return (
      <Badge className={styles[status] || "bg-gray-400 text-white"}>
        {labels[status] || status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
            Chiens ({dogs.length})
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Gerez vos chiens reproducteurs et retraites
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
        >
          <Plus className="mr-2 size-4" />
          Ajouter un chien
        </Button>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl bg-white border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <Input
                placeholder="Rechercher par nom, race, couleur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBreed} onValueChange={setFilterBreed}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Race" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les races</SelectItem>
                {breeds.map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="ACTIVE">Actif</SelectItem>
                <SelectItem value="RETIRED">Retraite</SelectItem>
                <SelectItem value="DECEASED">Decede</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl overflow-hidden bg-white border-0 shadow-sm">
        {isLoading ? (
          <CardContent className="pt-6">
            <TableSkeleton />
          </CardContent>
        ) : filteredDogs.length === 0 ? (
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <Dog className="size-10 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Aucun chien trouve
              </p>
            </div>
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Race</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Couleur</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDogs.map((dog) => (
                <TableRow key={dog.id}>
                  <TableCell>
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-primary)]">
                      <Dog className="size-5" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-[var(--color-charcoal)]">
                    {dog.name}
                  </TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {dog.breed}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs capitalize">
                      {dog.gender === "MALE" ? "Male" : "Femelle"}
                    </Badge>
                  </TableCell>
                  <TableCell>{statusBadge(dog.status)}</TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {dog.color}
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
                          <Link href={`/admin/chiens/${dog.id}`}>
                            <Eye className="mr-2 size-4" />
                            Voir details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(dog)}>
                          <Pencil className="mr-2 size-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(dog.id)}
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
        )}
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDog ? "Modifier le chien" : "Ajouter un chien"}
            </DialogTitle>
            <DialogDescription>
              {editingDog
                ? "Modifiez les informations du chien."
                : "Remplissez les informations pour ajouter un nouveau chien."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Ex: Luna"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="breed">Race *</Label>
                <Select
                  value={form.breed}
                  onValueChange={(v) => setForm({ ...form, breed: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pomeranian">Pomeranian</SelectItem>
                    <SelectItem value="Berger Australien">
                      Berger Australien
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.breed && (
                  <p className="text-xs text-red-600">{errors.breed}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">Genre *</Label>
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
                {errors.gender && (
                  <p className="text-xs text-red-600">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                <Input
                  id="dateOfBirth"
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
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm({
                      ...form,
                      status: v as "ACTIVE" | "RETIRED" | "DECEASED",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Actif</SelectItem>
                    <SelectItem value="RETIRED">Retraite</SelectItem>
                    <SelectItem value="DECEASED">Decede</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="color">Couleur *</Label>
                <Input
                  id="color"
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

              <div className="grid gap-2">
                <Label htmlFor="weight">Poids (kg)</Label>
                <Input
                  id="weight"
                  value={form.weight}
                  onChange={(e) =>
                    setForm({ ...form, weight: e.target.value })
                  }
                  placeholder="Ex: 2.8"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="microchipNumber">Numero de puce</Label>
              <Input
                id="microchipNumber"
                value={form.microchipNumber}
                onChange={(e) =>
                  setForm({ ...form, microchipNumber: e.target.value })
                }
                placeholder="Ex: 250268500123456"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Notes</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
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
                : editingDog
                  ? "Mettre a jour"
                  : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
