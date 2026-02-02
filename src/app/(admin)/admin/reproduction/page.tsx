"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Calendar,
  Heart,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
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

const heatCycleSchema = z.object({
  dogId: z.string().min(1, "La femelle est requise"),
  startDate: z.string().min(1, "La date de debut est requise"),
  endDate: z.string().optional(),
  matingDate: z.string().optional(),
  matingPartnerId: z.string().optional(),
  successful: z.enum(["true", "false", "unknown"]).optional(),
  notes: z.string().optional(),
})

type HeatCycleFormData = z.infer<typeof heatCycleSchema>

interface HeatCycleRecord {
  id: string
  dogId: string
  startDate: string
  endDate?: string
  matingDate?: string
  matingPartnerId?: string
  successful?: boolean | null
  notes?: string
  dog?: { id: string; name: string; breed: string }
  matingPartner?: { id: string; name: string; breed: string }
}

interface DogRecord {
  id: string
  name: string
  breed: string
  gender: "MALE" | "FEMALE"
}

const mockRecords: HeatCycleRecord[] = [
  {
    id: "1",
    dogId: "1",
    startDate: "2025-11-15",
    endDate: "2025-11-30",
    matingDate: "2025-11-20",
    matingPartnerId: "6",
    successful: true,
    notes: "Gestation confirmee par echographie a J28. 3-4 chiots attendus.",
    dog: { id: "1", name: "Luna", breed: "Berger Allemand" },
    matingPartner: { id: "6", name: "Thor", breed: "Berger Allemand" },
  },
  {
    id: "2",
    dogId: "3",
    startDate: "2026-03-10",
    matingPartnerId: "2",
    successful: null,
    notes: "Attente prochaines chaleurs de Bella, prevues debut mars.",
    dog: { id: "3", name: "Bella", breed: "Golden Retriever" },
    matingPartner: { id: "2", name: "Max", breed: "Golden Retriever" },
  },
  {
    id: "3",
    dogId: "1",
    startDate: "2026-06-01",
    matingPartnerId: "4",
    successful: null,
    notes: "Planifie apres repos post-portee de Luna.",
    dog: { id: "1", name: "Luna", breed: "Berger Allemand" },
    matingPartner: { id: "4", name: "Rocky", breed: "Rottweiler" },
  },
  {
    id: "4",
    dogId: "5",
    startDate: "2025-06-20",
    endDate: "2025-07-05",
    matingDate: "2025-06-25",
    matingPartnerId: "2",
    successful: false,
    notes: "Pas de gestation confirmee. A reprogrammer.",
    dog: { id: "5", name: "Daisy", breed: "Labrador" },
    matingPartner: { id: "2", name: "Max", breed: "Golden Retriever" },
  },
]

function getSuccessfulKey(successful: boolean | null | undefined): string {
  if (successful === true) return "true"
  if (successful === false) return "false"
  return "unknown"
}

const statusConfig: Record<string, { label: string; className: string; icon: typeof Heart }> = {
  unknown: {
    label: "En cours",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Clock,
  },
  true: {
    label: "Confirmee",
    className: "border-green-200 bg-green-50 text-green-700",
    icon: CheckCircle2,
  },
  false: {
    label: "Echouee",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: XCircle,
  },
}

const emptyForm: HeatCycleFormData = {
  dogId: "",
  startDate: "",
  endDate: "",
  matingDate: "",
  matingPartnerId: "",
  successful: "unknown",
  notes: "",
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-8 w-8 ml-auto" />
        </div>
      ))}
    </div>
  )
}

export default function ReproductionPage() {
  const [records, setRecords] = useState<HeatCycleRecord[]>([])
  const [dogs, setDogs] = useState<DogRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<HeatCycleRecord | null>(null)
  const [form, setForm] = useState<HeatCycleFormData>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const [cyclesRes, dogsRes] = await Promise.all([
          fetch("/api/admin/heat-cycles"),
          fetch("/api/admin/dogs"),
        ])

        if (cyclesRes.ok) {
          const data = await cyclesRes.json()
          setRecords(data)
        } else {
          setRecords(mockRecords)
        }

        if (dogsRes.ok) {
          const data = await dogsRes.json()
          setDogs(data)
        }
      } catch {
        setRecords(mockRecords)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const dogName = r.dog?.name || ""
      const partnerName = r.matingPartner?.name || ""
      const matchSearch =
        !search ||
        dogName.toLowerCase().includes(search.toLowerCase()) ||
        partnerName.toLowerCase().includes(search.toLowerCase())
      const key = getSuccessfulKey(r.successful)
      const matchStatus =
        filterStatus === "all" || key === filterStatus
      return matchSearch && matchStatus
    })
  }, [records, search, filterStatus])

  const females = useMemo(() => dogs.filter((d) => d.gender === "FEMALE"), [dogs])
  const males = useMemo(() => dogs.filter((d) => d.gender === "MALE"), [dogs])

  function openCreateDialog() {
    setEditingRecord(null)
    setForm(emptyForm)
    setErrors({})
    setDialogOpen(true)
  }

  function openEditDialog(record: HeatCycleRecord) {
    setEditingRecord(record)
    setForm({
      dogId: record.dogId,
      startDate: record.startDate ? record.startDate.slice(0, 10) : "",
      endDate: record.endDate ? record.endDate.slice(0, 10) : "",
      matingDate: record.matingDate ? record.matingDate.slice(0, 10) : "",
      matingPartnerId: record.matingPartnerId || "",
      successful: record.successful === true ? "true" : record.successful === false ? "false" : "unknown",
      notes: record.notes || "",
    })
    setErrors({})
    setDialogOpen(true)
  }

  async function handleSubmit() {
    const result = heatCycleSchema.safeParse(form)
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
      const url = editingRecord
        ? `/api/admin/heat-cycles/${editingRecord.id}`
        : "/api/admin/heat-cycles"
      const method = editingRecord ? "PUT" : "POST"

      const payload: Record<string, unknown> = {
        dogId: result.data.dogId,
        startDate: result.data.startDate,
      }
      if (result.data.endDate) payload.endDate = result.data.endDate
      if (result.data.matingDate) payload.matingDate = result.data.matingDate
      if (result.data.matingPartnerId) payload.matingPartnerId = result.data.matingPartnerId
      if (result.data.notes) payload.notes = result.data.notes
      if (result.data.successful === "true") {
        payload.successful = true
      } else if (result.data.successful === "false") {
        payload.successful = false
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const saved = await res.json()
        if (editingRecord) {
          setRecords((prev) =>
            prev.map((r) => (r.id === editingRecord.id ? saved : r))
          )
        } else {
          setRecords((prev) => [...prev, saved])
        }
      } else {
        const dogObj = dogs.find((d) => d.id === result.data.dogId)
        const partnerObj = dogs.find((d) => d.id === result.data.matingPartnerId)
        const newRecord: HeatCycleRecord = {
          id: editingRecord?.id || Date.now().toString(),
          dogId: result.data.dogId,
          startDate: result.data.startDate,
          endDate: result.data.endDate,
          matingDate: result.data.matingDate,
          matingPartnerId: result.data.matingPartnerId,
          successful: result.data.successful === "true" ? true : result.data.successful === "false" ? false : null,
          notes: result.data.notes,
          dog: dogObj ? { id: dogObj.id, name: dogObj.name, breed: dogObj.breed } : undefined,
          matingPartner: partnerObj ? { id: partnerObj.id, name: partnerObj.name, breed: partnerObj.breed } : undefined,
        }
        if (editingRecord) {
          setRecords((prev) =>
            prev.map((r) => (r.id === editingRecord.id ? newRecord : r))
          )
        } else {
          setRecords((prev) => [...prev, newRecord])
        }
      }
      setDialogOpen(false)
    } catch {
      setDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(recordId: string) {
    if (!confirm("Etes-vous sur de vouloir supprimer cet enregistrement ?"))
      return
    try {
      await fetch(`/api/admin/heat-cycles/${recordId}`, { method: "DELETE" })
    } catch {
      // continue
    }
    setRecords((prev) => prev.filter((r) => r.id !== recordId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
            Programme de reproduction
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Planifiez et suivez les accouplements
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
        >
          <Plus className="mr-2 size-4" />
          Nouvel accouplement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = records.filter((r) => getSuccessfulKey(r.successful) === key).length
          const Icon = config.icon
          return (
            <Card key={key} className="rounded-2xl bg-white border-0 shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                      {config.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[var(--color-charcoal)]">
                      {count}
                    </p>
                  </div>
                  <Icon className="size-5 text-[var(--color-text-muted)]" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="rounded-2xl bg-white border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <Input
                placeholder="Rechercher par nom de la femelle, male..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Resultat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les resultats</SelectItem>
                <SelectItem value="unknown">En cours</SelectItem>
                <SelectItem value="true">Confirmee</SelectItem>
                <SelectItem value="false">Echouee</SelectItem>
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
        ) : filteredRecords.length === 0 ? (
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <Calendar className="size-10 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Aucun enregistrement trouve
              </p>
            </div>
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Femelle</TableHead>
                <TableHead>Male</TableHead>
                <TableHead>Debut chaleurs</TableHead>
                <TableHead>Date saillie</TableHead>
                <TableHead>Resultat</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => {
                const key = getSuccessfulKey(record.successful)
                return (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium text-[var(--color-charcoal)]">
                      {record.dog?.name || "-"}
                    </TableCell>
                    <TableCell className="font-medium text-[var(--color-charcoal)]">
                      {record.matingPartner?.name || "-"}
                    </TableCell>
                    <TableCell>
                      {new Date(record.startDate).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell className="text-[var(--color-text-light)]">
                      {record.matingDate
                        ? new Date(record.matingDate).toLocaleDateString("fr-FR")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          statusConfig[key]?.className || ""
                        }
                      >
                        {statusConfig[key]?.label || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(record)}
                          >
                            <Pencil className="mr-2 size-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(record.id)}
                          >
                            <Trash2 className="mr-2 size-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRecord
                ? "Modifier l'accouplement"
                : "Nouvel accouplement"}
            </DialogTitle>
            <DialogDescription>
              {editingRecord
                ? "Modifiez les informations de l'accouplement."
                : "Planifiez un nouvel accouplement."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Femelle (en chaleur) *</Label>
                <Select
                  value={form.dogId}
                  onValueChange={(v) =>
                    setForm({ ...form, dogId: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {females.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dogId && (
                  <p className="text-xs text-red-600">{errors.dogId}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Male partenaire</Label>
                <Select
                  value={form.matingPartnerId}
                  onValueChange={(v) =>
                    setForm({ ...form, matingPartnerId: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {males.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.matingPartnerId && (
                  <p className="text-xs text-red-600">{errors.matingPartnerId}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Debut chaleurs *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
                {errors.startDate && (
                  <p className="text-xs text-red-600">{errors.startDate}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="end-date">Fin chaleurs</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mating-date">Date saillie</Label>
                <Input
                  id="mating-date"
                  type="date"
                  value={form.matingDate}
                  onChange={(e) =>
                    setForm({ ...form, matingDate: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Resultat</Label>
                <Select
                  value={form.successful}
                  onValueChange={(v) =>
                    setForm({ ...form, successful: v as HeatCycleFormData["successful"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unknown">Inconnu</SelectItem>
                    <SelectItem value="true">Oui</SelectItem>
                    <SelectItem value="false">Non</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="repro-notes">Notes</Label>
              <Textarea
                id="repro-notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
                placeholder="Notes, observations..."
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
                : editingRecord
                  ? "Mettre a jour"
                  : "Creer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
