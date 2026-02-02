"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Package,
  ArrowDown,
  ArrowUp,
  AlertTriangle,
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

const stockItemSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  categoryId: z.string().min(1, "La categorie est requise"),
  quantity: z.string().min(1, "La quantite est requise"),
  unit: z.enum(["KG", "UNIT", "LITER", "BOX", "BAG", "DOSE"]),
  minQuantity: z.string().min(1, "Le seuil minimum est requis"),
  supplier: z.string().optional(),
  notes: z.string().optional(),
})

const movementSchema = z.object({
  itemId: z.string().min(1, "Le produit est requis"),
  type: z.enum(["IN", "OUT", "ADJUSTMENT"]),
  quantity: z.string().min(1, "La quantite est requise"),
  reason: z.string().optional(),
})

type StockFormData = z.infer<typeof stockItemSchema>
type MovementFormData = z.infer<typeof movementSchema>

interface StockItem {
  id: string
  name: string
  sku?: string
  categoryId: string
  category?: { id: string; name: string; slug: string }
  quantity: number
  minQuantity: number
  unit: "KG" | "UNIT" | "LITER" | "BOX" | "BAG" | "DOSE"
  costPrice?: number
  supplier?: string
  expiryDate?: string
  notes?: string
  updatedAt: string
}

interface StockCategory {
  id: string
  name: string
  slug: string
}

const unitLabels: Record<string, string> = {
  KG: "kg",
  UNIT: "unite(s)",
  LITER: "litre(s)",
  BOX: "boite(s)",
  BAG: "sac(s)",
  DOSE: "dose(s)",
}

const mockStock: StockItem[] = [
  {
    id: "1",
    name: "Croquettes Premium Adulte",
    categoryId: "cat-1",
    category: { id: "cat-1", name: "Alimentation", slug: "alimentation" },
    quantity: 3,
    unit: "BAG",
    minQuantity: 5,
    supplier: "Royal Canin",
    updatedAt: "2026-01-28",
  },
  {
    id: "2",
    name: "Croquettes Chiot",
    categoryId: "cat-1",
    category: { id: "cat-1", name: "Alimentation", slug: "alimentation" },
    quantity: 8,
    unit: "BAG",
    minQuantity: 4,
    supplier: "Royal Canin",
    updatedAt: "2026-01-25",
  },
  {
    id: "3",
    name: "Pate pour chiots",
    categoryId: "cat-1",
    category: { id: "cat-1", name: "Alimentation", slug: "alimentation" },
    quantity: 12,
    unit: "BOX",
    minQuantity: 10,
    supplier: "Hill's",
    updatedAt: "2026-01-20",
  },
  {
    id: "4",
    name: "Vermifuge Milbemax",
    categoryId: "cat-2",
    category: { id: "cat-2", name: "Sante", slug: "sante" },
    quantity: 2,
    unit: "BOX",
    minQuantity: 5,
    supplier: "Elanco",
    updatedAt: "2026-01-15",
  },
  {
    id: "5",
    name: "Shampooing antiparasitaire",
    categoryId: "cat-3",
    category: { id: "cat-3", name: "Hygiene", slug: "hygiene" },
    quantity: 6,
    unit: "UNIT",
    minQuantity: 3,
    supplier: "Francodex",
    updatedAt: "2026-01-22",
  },
  {
    id: "6",
    name: "Pipettes anti-puces",
    categoryId: "cat-2",
    category: { id: "cat-2", name: "Sante", slug: "sante" },
    quantity: 4,
    unit: "BOX",
    minQuantity: 6,
    supplier: "Frontline",
    updatedAt: "2026-01-18",
  },
  {
    id: "7",
    name: "Tapis absorbants",
    categoryId: "cat-3",
    category: { id: "cat-3", name: "Hygiene", slug: "hygiene" },
    quantity: 15,
    unit: "UNIT",
    minQuantity: 10,
    supplier: "Generic",
    updatedAt: "2026-01-26",
  },
  {
    id: "8",
    name: "Colliers d'identification",
    categoryId: "cat-4",
    category: { id: "cat-4", name: "Accessoires", slug: "accessoires" },
    quantity: 20,
    unit: "UNIT",
    minQuantity: 10,
    supplier: "PetID",
    updatedAt: "2026-01-10",
  },
  {
    id: "9",
    name: "Lait maternise chiot",
    categoryId: "cat-1",
    category: { id: "cat-1", name: "Alimentation", slug: "alimentation" },
    quantity: 1,
    unit: "BOX",
    minQuantity: 3,
    supplier: "Beaphar",
    updatedAt: "2026-01-29",
  },
  {
    id: "10",
    name: "Seringues 5ml",
    categoryId: "cat-2",
    category: { id: "cat-2", name: "Sante", slug: "sante" },
    quantity: 50,
    unit: "UNIT",
    minQuantity: 20,
    supplier: "Medical Supply",
    updatedAt: "2026-01-12",
  },
]

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-8 w-8 ml-auto" />
        </div>
      ))}
    </div>
  )
}

const emptyStockForm: StockFormData = {
  name: "",
  categoryId: "",
  quantity: "",
  unit: "UNIT",
  minQuantity: "",
  supplier: "",
  notes: "",
}

const emptyMovementForm: MovementFormData = {
  itemId: "",
  type: "IN",
  quantity: "",
  reason: "",
}

export default function StocksPage() {
  const [stock, setStock] = useState<StockItem[]>([])
  const [categories, setCategories] = useState<StockCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [stockDialogOpen, setStockDialogOpen] = useState(false)
  const [movementDialogOpen, setMovementDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<StockItem | null>(null)
  const [stockForm, setStockForm] = useState<StockFormData>(emptyStockForm)
  const [movementForm, setMovementForm] = useState<MovementFormData>(emptyMovementForm)
  const [stockErrors, setStockErrors] = useState<Record<string, string>>({})
  const [movementErrors, setMovementErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadStock() {
      try {
        const res = await fetch("/api/admin/stock/items")
        if (res.ok) {
          const data = await res.json()
          setStock(data)
        } else {
          setStock(mockStock)
        }
      } catch {
        setStock(mockStock)
      } finally {
        setIsLoading(false)
      }
    }
    loadStock()
  }, [])

  useEffect(() => {
    fetch("/api/admin/stock/categories")
      .then((r) => (r.ok ? r.json() : []))
      .then(setCategories)
      .catch(() => {})
  }, [])

  const filteredStock = useMemo(() => {
    return stock.filter((item) => {
      const matchSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(search.toLowerCase())
      const matchCategory =
        activeCategory === "all" ||
        item.categoryId === activeCategory ||
        item.category?.name === activeCategory
      return matchSearch && matchCategory
    })
  }, [stock, search, activeCategory])

  const lowStockCount = useMemo(
    () => stock.filter((i) => i.quantity <= i.minQuantity).length,
    [stock]
  )

  function isLowStock(item: StockItem) {
    return item.quantity <= item.minQuantity
  }

  function openCreateStockDialog() {
    setEditingItem(null)
    setStockForm(emptyStockForm)
    setStockErrors({})
    setStockDialogOpen(true)
  }

  function openEditStockDialog(item: StockItem) {
    setEditingItem(item)
    setStockForm({
      name: item.name,
      categoryId: item.categoryId,
      quantity: item.quantity.toString(),
      unit: item.unit,
      minQuantity: item.minQuantity.toString(),
      supplier: item.supplier || "",
      notes: item.notes || "",
    })
    setStockErrors({})
    setStockDialogOpen(true)
  }

  function openMovementDialog(itemId?: string) {
    setMovementForm({
      ...emptyMovementForm,
      itemId: itemId || "",
    })
    setMovementErrors({})
    setMovementDialogOpen(true)
  }

  async function handleStockSubmit() {
    const result = stockItemSchema.safeParse(stockForm)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const err of result.error.issues) {
        const key = err.path[0]
        if (key) fieldErrors[String(key)] = err.message
      }
      setStockErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingItem
        ? `/api/admin/stock/items/${editingItem.id}`
        : "/api/admin/stock/items"
      const method = editingItem ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          quantity: parseFloat(result.data.quantity),
          minQuantity: parseFloat(result.data.minQuantity),
        }),
      })

      if (res.ok) {
        const saved = await res.json()
        if (editingItem) {
          setStock((prev) =>
            prev.map((s) => (s.id === editingItem.id ? saved : s))
          )
        } else {
          setStock((prev) => [...prev, saved])
        }
      } else {
        const matchedCategory = categories.find(
          (c) => c.id === result.data.categoryId
        )
        const newItem: StockItem = {
          id: editingItem?.id || Date.now().toString(),
          name: result.data.name,
          categoryId: result.data.categoryId,
          category: matchedCategory
            ? { id: matchedCategory.id, name: matchedCategory.name, slug: matchedCategory.slug }
            : undefined,
          quantity: parseFloat(result.data.quantity),
          unit: result.data.unit,
          minQuantity: parseFloat(result.data.minQuantity),
          supplier: result.data.supplier,
          notes: result.data.notes,
          updatedAt: new Date().toISOString(),
        }
        if (editingItem) {
          setStock((prev) =>
            prev.map((s) => (s.id === editingItem.id ? newItem : s))
          )
        } else {
          setStock((prev) => [...prev, newItem])
        }
      }
      setStockDialogOpen(false)
    } catch {
      setStockDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleMovementSubmit() {
    const result = movementSchema.safeParse(movementForm)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const err of result.error.issues) {
        const key = err.path[0]
        if (key) fieldErrors[String(key)] = err.message
      }
      setMovementErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await fetch("/api/admin/stock/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          quantity: parseFloat(result.data.quantity),
        }),
      })
    } catch {
      // continue with local update
    }

    const qty = parseFloat(result.data.quantity)
    setStock((prev) =>
      prev.map((item) =>
        item.id === result.data.itemId
          ? {
              ...item,
              quantity:
                result.data.type === "IN"
                  ? item.quantity + qty
                  : result.data.type === "OUT"
                    ? Math.max(0, item.quantity - qty)
                    : qty,
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    )

    setMovementDialogOpen(false)
    setIsSubmitting(false)
  }

  async function handleDelete(itemId: string) {
    if (!confirm("Etes-vous sur de vouloir supprimer cet article ?")) return
    try {
      await fetch(`/api/admin/stock/items/${itemId}`, { method: "DELETE" })
    } catch {
      // continue
    }
    setStock((prev) => prev.filter((s) => s.id !== itemId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
            Gestion des stocks
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            {lowStockCount > 0 ? (
              <span className="text-red-600 font-medium">
                {lowStockCount} article(s) en stock bas
              </span>
            ) : (
              "Tous les stocks sont suffisants"
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => openMovementDialog()}
            className="gap-2"
          >
            <ArrowDown className="size-4" />
            Mouvement
          </Button>
          <Button
            onClick={openCreateStockDialog}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
          >
            <Plus className="mr-2 size-4" />
            Nouvel article
          </Button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50/50 border-0 shadow-sm rounded-2xl">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-4 text-red-600" />
              <h3 className="text-sm font-semibold text-red-800">
                Alerte stock bas
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stock
                .filter((i) => isLowStock(i))
                .map((item) => (
                  <Badge
                    key={item.id}
                    variant="outline"
                    className="border-red-200 bg-white text-red-700 text-xs"
                  >
                    {item.name}: {item.quantity} {unitLabels[item.unit] || item.unit}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card className="bg-white border-0 shadow-sm rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <Input
              placeholder="Rechercher par nom, fournisseur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs + Table */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">Tout</TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.name}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory}>
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
            {isLoading ? (
              <CardContent className="pt-6">
                <TableSkeleton />
              </CardContent>
            ) : filteredStock.length === 0 ? (
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Package className="size-10 text-[var(--color-text-muted)]" />
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Aucun article trouve
                  </p>
                </div>
              </CardContent>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Quantite</TableHead>
                    <TableHead>Seuil min.</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Derniere MAJ</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStock.map((item) => (
                    <TableRow
                      key={item.id}
                      className={
                        isLowStock(item) ? "bg-red-50/50" : ""
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isLowStock(item) && (
                            <AlertTriangle className="size-3.5 text-red-500" />
                          )}
                          <span
                            className={`font-medium ${
                              isLowStock(item)
                                ? "text-red-700"
                                : "text-[var(--color-charcoal)]"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.category?.name || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${
                            isLowStock(item)
                              ? "text-red-600"
                              : "text-[var(--color-charcoal)]"
                          }`}
                        >
                          {item.quantity}
                        </span>{" "}
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {unitLabels[item.unit] || item.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-[var(--color-text-muted)]">
                        {item.minQuantity}
                      </TableCell>
                      <TableCell className="text-[var(--color-text-light)]">
                        {item.supplier || "-"}
                      </TableCell>
                      <TableCell className="text-[var(--color-text-muted)] text-xs">
                        {new Date(item.updatedAt).toLocaleDateString(
                          "fr-FR"
                        )}
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
                              onClick={() => openMovementDialog(item.id)}
                            >
                              <ArrowUp className="mr-2 size-4" />
                              Ajouter un mouvement
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openEditStockDialog(item)}
                            >
                              <Pencil className="mr-2 size-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleDelete(item.id)}
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
      </Tabs>

      {/* Add/Edit Stock Item Dialog */}
      <Dialog open={stockDialogOpen} onOpenChange={setStockDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Modifier l'article" : "Nouvel article"}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? "Modifiez les informations de l'article."
                : "Ajoutez un nouvel article au stock."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="stock-name">Nom *</Label>
              <Input
                id="stock-name"
                value={stockForm.name}
                onChange={(e) =>
                  setStockForm({ ...stockForm, name: e.target.value })
                }
                placeholder="Ex: Croquettes Premium"
              />
              {stockErrors.name && (
                <p className="text-xs text-red-600">{stockErrors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Categorie *</Label>
                <Select
                  value={stockForm.categoryId}
                  onValueChange={(v) =>
                    setStockForm({ ...stockForm, categoryId: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {stockErrors.categoryId && (
                  <p className="text-xs text-red-600">
                    {stockErrors.categoryId}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Unite *</Label>
                <Select
                  value={stockForm.unit}
                  onValueChange={(v) =>
                    setStockForm({ ...stockForm, unit: v as StockFormData["unit"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KG">kg</SelectItem>
                    <SelectItem value="UNIT">unite(s)</SelectItem>
                    <SelectItem value="LITER">litre(s)</SelectItem>
                    <SelectItem value="BOX">boite(s)</SelectItem>
                    <SelectItem value="BAG">sac(s)</SelectItem>
                    <SelectItem value="DOSE">dose(s)</SelectItem>
                  </SelectContent>
                </Select>
                {stockErrors.unit && (
                  <p className="text-xs text-red-600">{stockErrors.unit}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock-qty">Quantite *</Label>
                <Input
                  id="stock-qty"
                  type="number"
                  min="0"
                  value={stockForm.quantity}
                  onChange={(e) =>
                    setStockForm({ ...stockForm, quantity: e.target.value })
                  }
                />
                {stockErrors.quantity && (
                  <p className="text-xs text-red-600">
                    {stockErrors.quantity}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stock-min">Seuil minimum *</Label>
                <Input
                  id="stock-min"
                  type="number"
                  min="0"
                  value={stockForm.minQuantity}
                  onChange={(e) =>
                    setStockForm({
                      ...stockForm,
                      minQuantity: e.target.value,
                    })
                  }
                />
                {stockErrors.minQuantity && (
                  <p className="text-xs text-red-600">
                    {stockErrors.minQuantity}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock-supplier">Fournisseur</Label>
              <Input
                id="stock-supplier"
                value={stockForm.supplier}
                onChange={(e) =>
                  setStockForm({ ...stockForm, supplier: e.target.value })
                }
                placeholder="Ex: Royal Canin"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock-notes">Notes</Label>
              <Textarea
                id="stock-notes"
                value={stockForm.notes}
                onChange={(e) =>
                  setStockForm({ ...stockForm, notes: e.target.value })
                }
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStockDialogOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleStockSubmit}
              disabled={isSubmitting}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
            >
              {isSubmitting
                ? "Enregistrement..."
                : editingItem
                  ? "Mettre a jour"
                  : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Movement Dialog */}
      <Dialog open={movementDialogOpen} onOpenChange={setMovementDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nouveau mouvement de stock</DialogTitle>
            <DialogDescription>
              Enregistrez une entree ou sortie de stock.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Article *</Label>
              <Select
                value={movementForm.itemId}
                onValueChange={(v) =>
                  setMovementForm({ ...movementForm, itemId: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {stock.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} ({item.quantity} {unitLabels[item.unit] || item.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {movementErrors.itemId && (
                <p className="text-xs text-red-600">
                  {movementErrors.itemId}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Type</Label>
                <Select
                  value={movementForm.type}
                  onValueChange={(v) =>
                    setMovementForm({
                      ...movementForm,
                      type: v as "IN" | "OUT" | "ADJUSTMENT",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN">
                      <span className="flex items-center gap-2">
                        <ArrowDown className="size-3 text-green-600" />
                        Entree
                      </span>
                    </SelectItem>
                    <SelectItem value="OUT">
                      <span className="flex items-center gap-2">
                        <ArrowUp className="size-3 text-red-600" />
                        Sortie
                      </span>
                    </SelectItem>
                    <SelectItem value="ADJUSTMENT">
                      Ajustement
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mvt-qty">Quantite *</Label>
                <Input
                  id="mvt-qty"
                  type="number"
                  min="1"
                  value={movementForm.quantity}
                  onChange={(e) =>
                    setMovementForm({
                      ...movementForm,
                      quantity: e.target.value,
                    })
                  }
                />
                {movementErrors.quantity && (
                  <p className="text-xs text-red-600">
                    {movementErrors.quantity}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mvt-reason">Raison</Label>
              <Input
                id="mvt-reason"
                value={movementForm.reason || ""}
                onChange={(e) =>
                  setMovementForm({
                    ...movementForm,
                    reason: e.target.value,
                  })
                }
                placeholder="Ex: Reapprovisionnement, Utilisation quotidienne..."
              />
              {movementErrors.reason && (
                <p className="text-xs text-red-600">
                  {movementErrors.reason}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMovementDialogOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleMovementSubmit}
              disabled={isSubmitting}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
