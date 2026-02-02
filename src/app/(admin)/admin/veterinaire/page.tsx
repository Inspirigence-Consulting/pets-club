"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Stethoscope,
  Calendar,
  AlertCircle,
} from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const vetSchema = z.object({
  dogId: z.string().optional(),
  puppyId: z.string().optional(),
  type: z.enum(["VACCINE", "DEWORMING", "CHECKUP", "SURGERY", "TREATMENT", "OTHER"]),
  date: z.string().min(1, "La date est requise"),
  description: z.string().min(1, "La description est requise"),
  product: z.string().optional(),
  dose: z.string().optional(),
  cost: z.string().optional(),
  nextDueDate: z.string().optional(),
  vetName: z.string().optional(),
  notes: z.string().optional(),
})

type VetFormData = z.infer<typeof vetSchema>

interface VetRecord {
  id: string
  dogId?: string
  puppyId?: string
  type: string
  date: string
  description: string
  product?: string
  dose?: string
  cost?: number
  nextDueDate?: string
  vetName?: string
  notes?: string
  dog?: { id: string; name: string; breed: string }
  puppy?: { id: string; name: string; slug: string }
}

const typeLabels: Record<string, string> = {
  VACCINE: "Vaccination",
  DEWORMING: "Vermifuge",
  CHECKUP: "Controle",
  SURGERY: "Chirurgie",
  TREATMENT: "Traitement",
  OTHER: "Autre",
}

const vetTypeKeys = ["VACCINE", "DEWORMING", "CHECKUP", "SURGERY", "TREATMENT", "OTHER"] as const

const mockVetRecords: VetRecord[] = [
  {
    id: "1",
    dogId: "1",
    type: "VACCINE",
    date: "2026-02-03",
    description: "Rappel annuel CHPPIL + Rage",
    vetName: "Dr. Amrani",
    notes: "Rappel annuel CHPPIL + Rage",
    nextDueDate: "2026-02-03",
    cost: 500,
    dog: { id: "1", name: "Luna", breed: "Berger Allemand" },
  },
  {
    id: "2",
    dogId: "2",
    type: "CHECKUP",
    date: "2026-02-05",
    description: "Bilan sanguin complet + examen general",
    vetName: "Dr. Amrani",
    notes: "Bilan sanguin complet + examen general",
    nextDueDate: "2026-02-05",
    cost: 800,
    dog: { id: "2", name: "Max", breed: "Golden Retriever" },
  },
  {
    id: "3",
    dogId: "3",
    type: "CHECKUP",
    date: "2026-02-07",
    description: "Echographie de gestation - 3eme semaine",
    vetName: "Dr. Bennani",
    notes: "Echographie de gestation - 3eme semaine",
    nextDueDate: "2026-02-07",
    cost: 600,
    dog: { id: "3", name: "Bella", breed: "Labrador" },
  },
  {
    id: "4",
    dogId: "4",
    type: "SURGERY",
    date: "2026-02-10",
    description: "Detartrage sous anesthesie",
    vetName: "Dr. Amrani",
    notes: "Detartrage sous anesthesie",
    nextDueDate: "2026-02-10",
    cost: 1200,
    dog: { id: "4", name: "Rocky", breed: "Rottweiler" },
  },
  {
    id: "5",
    dogId: "1",
    type: "VACCINE",
    date: "2025-12-15",
    description: "Rappel annuel effectue",
    vetName: "Dr. Amrani",
    notes: "Rappel annuel effectue",
    cost: 450,
    dog: { id: "1", name: "Luna", breed: "Berger Allemand" },
  },
  {
    id: "6",
    dogId: "2",
    type: "DEWORMING",
    date: "2025-12-01",
    description: "Vermifuge trimestriel",
    vetName: "Dr. Bennani",
    notes: "Vermifuge trimestriel",
    cost: 200,
    dog: { id: "2", name: "Max", breed: "Golden Retriever" },
  },
  {
    id: "7",
    dogId: "5",
    type: "CHECKUP",
    date: "2025-11-20",
    description: "Bilan post-retraite, tout normal",
    vetName: "Dr. Amrani",
    notes: "Bilan post-retraite, tout normal",
    cost: 700,
    dog: { id: "5", name: "Daisy", breed: "Caniche" },
  },
  {
    id: "8",
    dogId: "6",
    type: "TREATMENT",
    date: "2025-10-05",
    description: "Legere boiterie - radiographie RAS",
    vetName: "Dr. Bennani",
    notes: "Legere boiterie - radiographie RAS",
    cost: 1500,
    dog: { id: "6", name: "Thor", breed: "Husky" },
  },
]

const emptyForm: VetFormData = {
  dogId: "",
  puppyId: "",
  type: "VACCINE",
  date: "",
  description: "",
  product: "",
  dose: "",
  cost: "",
  nextDueDate: "",
  vetName: "",
  notes: "",
}

function getDogName(record: VetRecord): string {
  return record.dog?.name || record.puppy?.name || ""
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-8 w-8 ml-auto" />
        </div>
      ))}
    </div>
  )
}

export default function VeterinairePage() {
  const [records, setRecords] = useState<VetRecord[]>([])
  const [dogs, setDogs] = useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("list")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<VetRecord | null>(null)
  const [form, setForm] = useState<VetFormData>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadRecords() {
      try {
        const res = await fetch("/api/admin/vet-records")
        if (res.ok) {
          const data = await res.json()
          setRecords(data)
        } else {
          setRecords(mockVetRecords)
        }
      } catch {
        setRecords(mockVetRecords)
      } finally {
        setIsLoading(false)
      }
    }
    loadRecords()
  }, [])

  useEffect(() => {
    async function loadDogs() {
      try {
        const res = await fetch("/api/admin/dogs")
        if (res.ok) {
          const data = await res.json()
          setDogs(data.map((d: { id: string; name: string }) => ({ id: d.id, name: d.name })))
        }
      } catch {
        // fallback: dogs list stays empty
      }
    }
    loadDogs()
  }, [])

  const upcoming = useMemo(
    () =>
      records
        .filter((r) => r.nextDueDate && new Date(r.nextDueDate) > new Date())
        .sort(
          (a, b) =>
            new Date(a.nextDueDate!).getTime() - new Date(b.nextDueDate!).getTime()
        ),
    [records]
  )

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const dogName = getDogName(record)
      const matchSearch =
        !search ||
        dogName.toLowerCase().includes(search.toLowerCase()) ||
        (typeLabels[record.type] || record.type).toLowerCase().includes(search.toLowerCase()) ||
        (record.vetName || "").toLowerCase().includes(search.toLowerCase())
      const matchType = filterType === "all" || record.type === filterType
      return matchSearch && matchType
    })
  }, [records, search, filterType])

  function openCreateDialog() {
    setEditingRecord(null)
    setForm(emptyForm)
    setErrors({})
    setDialogOpen(true)
  }

  function openEditDialog(record: VetRecord) {
    setEditingRecord(record)
    setForm({
      dogId: record.dogId || record.dog?.id || "",
      puppyId: record.puppyId || record.puppy?.id || "",
      type: record.type as VetFormData["type"],
      date: record.date ? record.date.slice(0, 10) : "",
      description: record.description || "",
      product: record.product || "",
      dose: record.dose || "",
      cost: record.cost != null ? String(record.cost) : "",
      nextDueDate: record.nextDueDate ? record.nextDueDate.slice(0, 10) : "",
      vetName: record.vetName || "",
      notes: record.notes || "",
    })
    setErrors({})
    setDialogOpen(true)
  }

  async function handleSubmit() {
    const result = vetSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const err of result.error.issues) {
        const key = err.path[0]
        if (key) fieldErrors[String(key)] = err.message
      }
      // Custom validation: at least dogId or puppyId
      if (!form.dogId && !form.puppyId) {
        fieldErrors.dogId = "Un chien ou chiot est requis"
      }
      setErrors(fieldErrors)
      return
    }

    // Custom validation: at least dogId or puppyId
    if (!result.data.dogId && !result.data.puppyId) {
      setErrors({ dogId: "Un chien ou chiot est requis" })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingRecord
        ? `/api/admin/vet-records/${editingRecord.id}`
        : "/api/admin/vet-records"
      const method = editingRecord ? "PUT" : "POST"

      const payload = {
        ...result.data,
        dogId: result.data.dogId || undefined,
        puppyId: result.data.puppyId || undefined,
        cost: result.data.cost ? parseFloat(result.data.cost) : undefined,
        nextDueDate: result.data.nextDueDate || undefined,
        product: result.data.product || undefined,
        dose: result.data.dose || undefined,
        vetName: result.data.vetName || undefined,
        notes: result.data.notes || undefined,
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
        // Fallback: build record from form data for local state
        const dogMatch = dogs.find((d) => d.id === result.data.dogId)
        const newRecord: VetRecord = {
          id: editingRecord?.id || Date.now().toString(),
          dogId: result.data.dogId || undefined,
          puppyId: result.data.puppyId || undefined,
          type: result.data.type,
          date: result.data.date,
          description: result.data.description,
          product: result.data.product || undefined,
          dose: result.data.dose || undefined,
          cost: result.data.cost ? parseFloat(result.data.cost) : undefined,
          nextDueDate: result.data.nextDueDate || undefined,
          vetName: result.data.vetName || undefined,
          notes: result.data.notes || undefined,
          dog: dogMatch
            ? { id: dogMatch.id, name: dogMatch.name, breed: "" }
            : undefined,
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
      await fetch(`/api/admin/vet-records/${recordId}`, { method: "DELETE" })
    } catch {
      // continue
    }
    setRecords((prev) => prev.filter((r) => r.id !== recordId))
  }

  function isUpcoming(dateStr: string): boolean {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
            Suivi veterinaire
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Consultations, vaccinations et rendez-vous
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
        >
          <Plus className="mr-2 size-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      {/* Upcoming Appointments Alert */}
      {upcoming.length > 0 && (
        <Card className="rounded-2xl border-l-4 border-l-blue-500 bg-blue-50/50 border-0 shadow-sm">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-800">
                {upcoming.length} rendez-vous a venir
              </h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {upcoming.slice(0, 4).map((appt) => (
                <div
                  key={appt.id}
                  className={`rounded-xl bg-white p-3 border ${
                    isUpcoming(appt.nextDueDate!)
                      ? "border-blue-200"
                      : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Stethoscope className="size-3.5 text-blue-600" />
                    <span className="text-sm font-medium text-[var(--color-charcoal)]">
                      {getDogName(appt)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {typeLabels[appt.type] || appt.type}
                  </p>
                  <p className="mt-1 text-xs font-medium text-blue-600">
                    {formatDate(appt.nextDueDate!)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs: List and Calendar */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list" className="gap-1.5">
            <Stethoscope className="size-3.5" />
            Liste
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-1.5">
            <Calendar className="size-3.5" />
            Calendrier
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {/* Filters */}
          <Card className="rounded-2xl mt-4 bg-white border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <Input
                    placeholder="Rechercher par chien, type, veterinaire..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {vetTypeKeys.map((type) => (
                      <SelectItem key={type} value={type}>
                        {typeLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="rounded-2xl overflow-hidden mt-4 bg-white border-0 shadow-sm">
            {isLoading ? (
              <CardContent className="pt-6">
                <TableSkeleton />
              </CardContent>
            ) : filteredRecords.length === 0 ? (
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Stethoscope className="size-10 text-[var(--color-text-muted)]" />
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Aucun enregistrement trouve
                  </p>
                </div>
              </CardContent>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chien</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Veterinaire</TableHead>
                    <TableHead>Cout</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow
                      key={record.id}
                      className={
                        record.nextDueDate && isUpcoming(record.nextDueDate)
                          ? "bg-blue-50/50"
                          : ""
                      }
                    >
                      <TableCell className="font-medium text-[var(--color-charcoal)]">
                        {getDogName(record)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-blue-200 bg-blue-50 text-blue-700"
                        >
                          {typeLabels[record.type] || record.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            record.nextDueDate &&
                            isUpcoming(record.nextDueDate)
                              ? "font-medium text-blue-700"
                              : ""
                          }
                        >
                          {new Date(record.date).toLocaleDateString("fr-FR")}
                        </span>
                      </TableCell>
                      <TableCell className="text-[var(--color-text-light)]">
                        {record.vetName || "-"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {record.cost != null
                          ? `${record.cost.toLocaleString("fr-FR")} MAD`
                          : "-"}
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
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="rounded-2xl mt-4 bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                Rendez-vous a venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcoming.length === 0 ? (
                <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
                  Aucun rendez-vous a venir
                </p>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((appt) => {
                    const date = new Date(appt.nextDueDate!)
                    return (
                      <div
                        key={appt.id}
                        className="flex items-center gap-4 rounded-xl border border-[var(--color-cream-dark)] p-4 transition-colors hover:bg-[var(--color-cream)]"
                      >
                        <div className="flex flex-col items-center rounded-lg bg-[var(--color-primary)] px-3 py-2 text-white">
                          <span className="text-lg font-bold leading-none">
                            {date.getDate()}
                          </span>
                          <span className="text-[10px] uppercase">
                            {date.toLocaleDateString("fr-FR", {
                              month: "short",
                            })}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[var(--color-charcoal)]">
                              {getDogName(appt)}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-[10px] border-blue-200 bg-blue-50 text-blue-700"
                            >
                              {typeLabels[appt.type] || appt.type}
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {appt.vetName || ""}
                            {appt.notes && ` - ${appt.notes}`}
                          </p>
                        </div>
                        {appt.cost != null && (
                          <span className="text-sm font-medium text-[var(--color-text-light)]">
                            {appt.cost.toLocaleString("fr-FR")} MAD
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRecord
                ? "Modifier le rendez-vous"
                : "Nouveau rendez-vous"}
            </DialogTitle>
            <DialogDescription>
              {editingRecord
                ? "Modifiez les informations du rendez-vous."
                : "Planifiez un nouveau rendez-vous veterinaire."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Chien *</Label>
              <Select
                value={form.dogId}
                onValueChange={(v) => setForm({ ...form, dogId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionnez le chien" />
                </SelectTrigger>
                <SelectContent>
                  {dogs.map((dog) => (
                    <SelectItem key={dog.id} value={dog.id}>
                      {dog.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.dogId && (
                <p className="text-xs text-red-600">{errors.dogId}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Type *</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v as VetFormData["type"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {vetTypeKeys.map((type) => (
                      <SelectItem key={type} value={type}>
                        {typeLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-xs text-red-600">{errors.type}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="vet-date">Date *</Label>
                <Input
                  id="vet-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                {errors.date && (
                  <p className="text-xs text-red-600">{errors.date}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="vet-description">Description *</Label>
              <Textarea
                id="vet-description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description du soin ou de la consultation..."
                rows={2}
              />
              {errors.description && (
                <p className="text-xs text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="vet-name">Veterinaire</Label>
                <Input
                  id="vet-name"
                  value={form.vetName}
                  onChange={(e) =>
                    setForm({ ...form, vetName: e.target.value })
                  }
                  placeholder="Ex: Dr. Amrani"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="vet-next-due-date">Prochain RDV</Label>
                <Input
                  id="vet-next-due-date"
                  type="date"
                  value={form.nextDueDate}
                  onChange={(e) =>
                    setForm({ ...form, nextDueDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="vet-product">Produit</Label>
                <Input
                  id="vet-product"
                  value={form.product}
                  onChange={(e) =>
                    setForm({ ...form, product: e.target.value })
                  }
                  placeholder="Ex: Nobivac"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="vet-dose">Dose</Label>
                <Input
                  id="vet-dose"
                  value={form.dose}
                  onChange={(e) =>
                    setForm({ ...form, dose: e.target.value })
                  }
                  placeholder="Ex: 1ml"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="vet-cost">Cout (MAD)</Label>
              <Input
                id="vet-cost"
                type="number"
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: e.target.value })}
                placeholder="Ex: 500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="vet-notes">Notes</Label>
              <Textarea
                id="vet-notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Details du rendez-vous..."
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
