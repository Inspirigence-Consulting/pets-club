"use client"

import { useState, useEffect, useMemo } from "react"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Baby } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

const litterSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  sireId: z.string().min(1, "Le pere est requis"),
  damId: z.string().min(1, "La mere est requise"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  puppyCount: z.string().min(1, "Le nombre de chiots est requis"),
  status: z.enum(["PLANNED", "EXPECTED", "BORN", "WEANED", "CLOSED"]),
  notes: z.string().optional(),
})

type LitterFormData = z.infer<typeof litterSchema>

interface LitterRecord {
  id: string
  name: string
  sire?: { id: string; name: string; breed: string }
  dam?: { id: string; name: string; breed: string }
  fatherName: string
  motherName: string
  birthDate: string
  puppyCount: number
  status: "PLANNED" | "EXPECTED" | "BORN" | "WEANED" | "CLOSED"
  _count?: { puppies: number }
  notes?: string
}

const mockLitters: LitterRecord[] = [
  {
    id: "1",
    name: "Portee Alpha 2025",
    sire: { id: "2", name: "Max", breed: "Berger Allemand" },
    dam: { id: "1", name: "Luna", breed: "Berger Allemand" },
    fatherName: "Max",
    motherName: "Luna",
    birthDate: "2025-01-20",
    puppyCount: 4,
    status: "WEANED",
  },
  {
    id: "2",
    name: "Portee Beta 2025",
    sire: { id: "4", name: "Rocky", breed: "Golden Retriever" },
    dam: { id: "3", name: "Bella", breed: "Golden Retriever" },
    fatherName: "Rocky",
    motherName: "Bella",
    birthDate: "2025-06-15",
    puppyCount: 3,
    status: "CLOSED",
  },
  {
    id: "3",
    name: "Portee Gamma 2026",
    sire: { id: "6", name: "Thor", breed: "Husky" },
    dam: { id: "1", name: "Luna", breed: "Berger Allemand" },
    fatherName: "Thor",
    motherName: "Luna",
    birthDate: "2026-02-10",
    puppyCount: 0,
    status: "EXPECTED",
    notes: "Date estimee, echographie prevue le 07/02",
  },
  {
    id: "4",
    name: "Portee Delta 2025",
    sire: { id: "2", name: "Max", breed: "Berger Allemand" },
    dam: { id: "5", name: "Daisy", breed: "Labrador" },
    fatherName: "Max",
    motherName: "Daisy",
    birthDate: "2025-09-05",
    puppyCount: 5,
    status: "BORN",
  },
]

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-8 w-8 ml-auto" />
        </div>
      ))}
    </div>
  )
}

const emptyLitterForm: LitterFormData = {
  name: "",
  sireId: "",
  damId: "",
  birthDate: "",
  puppyCount: "",
  status: "PLANNED",
  notes: "",
}

export default function PorteesPage() {
  const [litters, setLitters] = useState<LitterRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingLitter, setEditingLitter] = useState<LitterRecord | null>(null)
  const [form, setForm] = useState<LitterFormData>(emptyLitterForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dogs, setDogs] = useState<{ id: string; name: string; gender: string }[]>([])

  useEffect(() => {
    async function loadDogs() {
      try {
        const res = await fetch("/api/admin/dogs")
        if (res.ok) {
          const data = await res.json()
          setDogs(data)
        }
      } catch {
        // silently fail - form selects will be empty
      }
    }
    loadDogs()
  }, [])

  useEffect(() => {
    async function loadLitters() {
      try {
        const res = await fetch("/api/admin/litters")
        if (res.ok) {
          const data = await res.json()
          const mapped: LitterRecord[] = data.map((litter: Record<string, unknown>) => ({
            ...litter,
            fatherName: (litter.sire as { name?: string } | undefined)?.name || "",
            motherName: (litter.dam as { name?: string } | undefined)?.name || "",
            birthDate: litter.birthDate
              ? new Date(litter.birthDate as string).toISOString().split("T")[0]
              : "",
            puppyCount: litter.puppyCount ?? (litter._count as { puppies?: number } | undefined)?.puppies ?? 0,
          }))
          setLitters(mapped)
        } else {
          setLitters(mockLitters)
        }
      } catch {
        setLitters(mockLitters)
      } finally {
        setIsLoading(false)
      }
    }
    loadLitters()
  }, [])

  const filteredLitters = useMemo(() => {
    return litters.filter((litter) => {
      const matchSearch =
        !search ||
        litter.name.toLowerCase().includes(search.toLowerCase()) ||
        litter.fatherName.toLowerCase().includes(search.toLowerCase()) ||
        litter.motherName.toLowerCase().includes(search.toLowerCase())
      const matchStatus =
        filterStatus === "all" || litter.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [litters, search, filterStatus])

  const fathers = dogs.filter((d) => d.gender === "MALE")
  const mothers = dogs.filter((d) => d.gender === "FEMALE")

  function openCreateDialog() {
    setEditingLitter(null)
    setForm(emptyLitterForm)
    setErrors({})
    setDialogOpen(true)
  }

  function openEditDialog(litter: LitterRecord) {
    setEditingLitter(litter)
    setForm({
      name: litter.name,
      sireId: litter.sire?.id || "",
      damId: litter.dam?.id || "",
      birthDate: litter.birthDate,
      puppyCount: litter.puppyCount.toString(),
      status: litter.status,
      notes: litter.notes || "",
    })
    setErrors({})
    setDialogOpen(true)
  }

  async function handleSubmit() {
    const result = litterSchema.safeParse(form)
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
      const url = editingLitter
        ? `/api/admin/litters/${editingLitter.id}`
        : "/api/admin/litters"
      const method = editingLitter ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          puppyCount: result.data.puppyCount ? parseInt(result.data.puppyCount) : undefined,
        }),
      })

      if (res.ok) {
        const saved = await res.json()
        const mapped: LitterRecord = {
          ...saved,
          fatherName: saved.sire?.name || "",
          motherName: saved.dam?.name || "",
          birthDate: saved.birthDate
            ? new Date(saved.birthDate).toISOString().split("T")[0]
            : "",
          puppyCount: saved.puppyCount ?? saved._count?.puppies ?? 0,
        }
        if (editingLitter) {
          setLitters((prev) =>
            prev.map((l) => (l.id === editingLitter.id ? mapped : l))
          )
        } else {
          setLitters((prev) => [...prev, mapped])
        }
      } else {
        const sireName =
          dogs.find((d) => d.id === result.data.sireId)?.name || ""
        const damName =
          dogs.find((d) => d.id === result.data.damId)?.name || ""
        const newLitter: LitterRecord = {
          id: editingLitter?.id || Date.now().toString(),
          name: result.data.name,
          sire: { id: result.data.sireId, name: sireName, breed: "" },
          dam: { id: result.data.damId, name: damName, breed: "" },
          fatherName: sireName,
          motherName: damName,
          birthDate: result.data.birthDate,
          puppyCount: parseInt(result.data.puppyCount),
          status: result.data.status,
          notes: result.data.notes,
        }
        if (editingLitter) {
          setLitters((prev) =>
            prev.map((l) => (l.id === editingLitter.id ? newLitter : l))
          )
        } else {
          setLitters((prev) => [...prev, newLitter])
        }
      }
      setDialogOpen(false)
    } catch {
      setDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(litterId: string) {
    if (!confirm("Etes-vous sur de vouloir supprimer cette portee ?")) return
    try {
      await fetch(`/api/admin/litters/${litterId}`, { method: "DELETE" })
    } catch {
      // continue
    }
    setLitters((prev) => prev.filter((l) => l.id !== litterId))
  }

  const statusConfig: Record<string, { label: string; className: string }> = {
    PLANNED: {
      label: "Planifiee",
      className: "border-gray-200 bg-gray-50 text-gray-700",
    },
    EXPECTED: {
      label: "En attente",
      className: "border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)]",
    },
    BORN: {
      label: "Nee",
      className: "border-blue-200 bg-blue-50 text-blue-700",
    },
    WEANED: {
      label: "Sevree",
      className: "border-purple-200 bg-purple-50 text-purple-700",
    },
    CLOSED: {
      label: "Complete",
      className: "border-green-200 bg-green-50 text-green-700",
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
            Portees ({litters.length})
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Gerez les portees de votre elevage
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
        >
          <Plus className="mr-2 size-4" />
          Nouvelle portee
        </Button>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl bg-white border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <Input
                placeholder="Rechercher par nom, pere, mere..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="PLANNED">Planifiee</SelectItem>
                <SelectItem value="EXPECTED">En attente</SelectItem>
                <SelectItem value="BORN">Nee</SelectItem>
                <SelectItem value="WEANED">Sevree</SelectItem>
                <SelectItem value="CLOSED">Complete</SelectItem>
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
        ) : filteredLitters.length === 0 ? (
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <Baby className="size-10 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Aucune portee trouvee
              </p>
            </div>
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Pere</TableHead>
                <TableHead>Mere</TableHead>
                <TableHead>Date naissance</TableHead>
                <TableHead>Nb chiots</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLitters.map((litter) => (
                <TableRow key={litter.id}>
                  <TableCell className="font-medium text-[var(--color-charcoal)]">
                    {litter.name}
                  </TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {litter.sire?.name || litter.fatherName}
                  </TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {litter.dam?.name || litter.motherName}
                  </TableCell>
                  <TableCell>
                    {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-[var(--color-charcoal)]">
                      {litter.puppyCount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[litter.status]?.className}
                    >
                      {statusConfig[litter.status]?.label || litter.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(litter)}>
                          <Pencil className="mr-2 size-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(litter.id)}
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
              {editingLitter ? "Modifier la portee" : "Nouvelle portee"}
            </DialogTitle>
            <DialogDescription>
              {editingLitter
                ? "Modifiez les informations de la portee."
                : "Enregistrez une nouvelle portee."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="litter-name">Nom de la portee *</Label>
              <Input
                id="litter-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Portee Alpha 2026"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Pere *</Label>
                <Select
                  value={form.sireId}
                  onValueChange={(v) => setForm({ ...form, sireId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez le pere" />
                  </SelectTrigger>
                  <SelectContent>
                    {fathers.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sireId && (
                  <p className="text-xs text-red-600">{errors.sireId}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Mere *</Label>
                <Select
                  value={form.damId}
                  onValueChange={(v) => setForm({ ...form, damId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez la mere" />
                  </SelectTrigger>
                  <SelectContent>
                    {mothers.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.damId && (
                  <p className="text-xs text-red-600">{errors.damId}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="litter-birth">Date de naissance *</Label>
                <Input
                  id="litter-birth"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) =>
                    setForm({ ...form, birthDate: e.target.value })
                  }
                />
                {errors.birthDate && (
                  <p className="text-xs text-red-600">{errors.birthDate}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="litter-count">Nombre de chiots *</Label>
                <Input
                  id="litter-count"
                  type="number"
                  min="0"
                  value={form.puppyCount}
                  onChange={(e) =>
                    setForm({ ...form, puppyCount: e.target.value })
                  }
                  placeholder="0"
                />
                {errors.puppyCount && (
                  <p className="text-xs text-red-600">{errors.puppyCount}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Statut</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    status: v as LitterFormData["status"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNED">Planifiee</SelectItem>
                  <SelectItem value="EXPECTED">En attente</SelectItem>
                  <SelectItem value="BORN">Nee</SelectItem>
                  <SelectItem value="WEANED">Sevree</SelectItem>
                  <SelectItem value="CLOSED">Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="litter-notes">Notes</Label>
              <Textarea
                id="litter-notes"
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
                : editingLitter
                  ? "Mettre a jour"
                  : "Creer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
