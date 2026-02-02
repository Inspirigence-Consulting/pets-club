"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  Megaphone,
  Clock,
  ExternalLink,
} from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"

const rejectSchema = z.object({
  reason: z.string().min(1, "La raison du rejet est requise"),
})

interface Listing {
  id: string
  title: string
  description: string
  breed: string
  gender: "MALE" | "FEMALE"
  age: string
  price: number
  photos: string[]
  city: string
  phone?: string
  status: "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "REJECTED" | "SOLD" | "EXPIRED"
  rejectionReason?: string
  publishedAt?: string
  createdAt: string
  slug: string
  vendor?: {
    id: string
    shopName: string
    city?: string
    user: { name: string; email: string }
  }
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Chiot Pomeranian male 3 mois",
    description:
      "Magnifique chiot Pomeranian orange, vaccine et puce. Tres sociable, habitue aux enfants. Pedigree disponible.",
    breed: "Pomeranian",
    gender: "MALE",
    age: "3 mois",
    price: 15000,
    photos: [],
    city: "Casablanca",
    phone: "+212 6 11 22 33 44",
    status: "PENDING_REVIEW",
    createdAt: "2026-01-30T14:30:00",
    slug: "chiot-pomeranian-male-3-mois",
    vendor: {
      id: "v1",
      shopName: "Pom Paradise",
      city: "Casablanca",
      user: { name: "Youssef El Amrani", email: "youssef@example.com" },
    },
  },
  {
    id: "2",
    title: "Berger Australien femelle a reserver",
    description:
      "Portee prevue pour mars 2026. Reservation possible avec acompte. Parents testes ADN.",
    breed: "Berger Australien",
    gender: "FEMALE",
    age: "2 mois",
    price: 22000,
    photos: [],
    city: "Rabat",
    phone: "+212 6 55 66 77 88",
    status: "PENDING_REVIEW",
    createdAt: "2026-01-29T10:15:00",
    slug: "berger-australien-femelle-a-reserver",
    vendor: {
      id: "v2",
      shopName: "Elevage Bennani",
      city: "Rabat",
      user: { name: "Fatima Bennani", email: "fatima@example.com" },
    },
  },
  {
    id: "3",
    title: "Chiot Golden Retriever - Lot complet",
    description:
      "Chiot Golden Retriever avec accessoires complets: panier, gamelles, laisse, jouets.",
    breed: "Golden Retriever",
    gender: "MALE",
    age: "4 mois",
    price: 800,
    photos: [],
    city: "Marrakech",
    phone: "+212 6 99 88 77 66",
    status: "PENDING_REVIEW",
    createdAt: "2026-01-28T16:45:00",
    slug: "chiot-golden-retriever-lot-complet",
    vendor: {
      id: "v3",
      shopName: "Tazi Pets",
      city: "Marrakech",
      user: { name: "Karim Tazi", email: "karim@example.com" },
    },
  },
  {
    id: "4",
    title: "Caniche Royal femelle toilettee",
    description:
      "Caniche Royal femelle, toilettee professionnellement. Tres douce et sociable.",
    breed: "Caniche Royal",
    gender: "FEMALE",
    age: "1 an",
    price: 300,
    photos: [],
    city: "Casablanca",
    phone: "+212 6 44 33 22 11",
    status: "PUBLISHED",
    createdAt: "2026-01-25T09:00:00",
    slug: "caniche-royal-femelle-toilettee",
    vendor: {
      id: "v4",
      shopName: "Sara Pets",
      city: "Casablanca",
      user: { name: "Sara Idrissi", email: "sara@example.com" },
    },
  },
  {
    id: "5",
    title: "Chihuahua male miniature",
    description:
      "Chihuahua male miniature, 6 mois. Vaccine et puce. Tres affectueux.",
    breed: "Chihuahua",
    gender: "MALE",
    age: "6 mois",
    price: 1200,
    photos: [],
    city: "Fes",
    phone: "+212 6 77 66 55 44",
    status: "PUBLISHED",
    createdAt: "2026-01-22T11:30:00",
    slug: "chihuahua-male-miniature",
    vendor: {
      id: "v5",
      shopName: "Fassi Dogs",
      city: "Fes",
      user: { name: "Ahmed Fassi", email: "ahmed@example.com" },
    },
  },
  {
    id: "6",
    title: "Chiot croise a donner",
    description: "Chiot croise 2 mois, pas de carnet de sante.",
    breed: "Croise",
    gender: "MALE",
    age: "2 mois",
    price: 0,
    photos: [],
    city: "Casablanca",
    phone: "+212 6 00 00 00 00",
    status: "REJECTED",
    createdAt: "2026-01-20T08:00:00",
    slug: "chiot-croise-a-donner",
    rejectionReason:
      "Annonce non conforme: pas de carnet de sante, informations insuffisantes sur le chiot.",
    vendor: {
      id: "v6",
      shopName: "Anonymous Shop",
      city: "Casablanca",
      user: { name: "Anonymous", email: "anon@example.com" },
    },
  },
  {
    id: "7",
    title: "Husky Siberien male 5 mois",
    description:
      "Husky Siberien male, 5 mois, yeux bleus. Carnet de sante a jour.",
    breed: "Husky Siberien",
    gender: "MALE",
    age: "5 mois",
    price: 500,
    photos: [],
    city: "Tanger",
    phone: "+212 6 22 11 00 99",
    status: "PUBLISHED",
    createdAt: "2026-01-18T13:20:00",
    slug: "husky-siberien-male-5-mois",
    vendor: {
      id: "v7",
      shopName: "Rifi Elevage",
      city: "Tanger",
      user: { name: "Nadia Rifi", email: "nadia@example.com" },
    },
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING_REVIEW: {
    label: "En attente",
    color: "border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)]",
  },
  PUBLISHED: {
    label: "Publiee",
    color: "border-green-200 bg-green-50 text-green-700",
  },
  REJECTED: {
    label: "Rejetee",
    color: "border-red-200 bg-red-50 text-red-700",
  },
  DRAFT: {
    label: "Brouillon",
    color: "border-gray-200 bg-gray-50 text-gray-700",
  },
  SOLD: {
    label: "Vendue",
    color: "border-purple-200 bg-purple-50 text-purple-700",
  },
  EXPIRED: {
    label: "Expiree",
    color: "border-orange-200 bg-orange-50 text-orange-700",
  },
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-8 w-8 ml-auto" />
        </div>
      ))}
    </div>
  )
}

export default function AnnoncesPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [detailDialog, setDetailDialog] = useState<Listing | null>(null)
  const [rejectDialog, setRejectDialog] = useState<Listing | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [rejectError, setRejectError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadListings() {
      try {
        const res = await fetch("/api/admin/listings")
        if (res.ok) {
          const data = await res.json()
          setListings(data)
        } else {
          setListings(mockListings)
        }
      } catch {
        setListings(mockListings)
      } finally {
        setIsLoading(false)
      }
    }
    loadListings()
  }, [])

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchSearch =
        !search ||
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        (listing.vendor?.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        listing.breed.toLowerCase().includes(search.toLowerCase())
      const matchStatus =
        filterStatus === "all" || listing.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [listings, search, filterStatus])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: listings.length }
    listings.forEach((l) => {
      counts[l.status] = (counts[l.status] || 0) + 1
    })
    return counts
  }, [listings])

  async function handleApprove(listing: Listing) {
    setIsSubmitting(true)
    try {
      await fetch(`/api/admin/listings/${listing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PUBLISHED" }),
      })
    } catch {
      // continue
    }
    setListings((prev) =>
      prev.map((l) =>
        l.id === listing.id ? { ...l, status: "PUBLISHED" as const } : l
      )
    )
    setIsSubmitting(false)
  }

  async function handleReject() {
    const result = rejectSchema.safeParse({ reason: rejectReason })
    if (!result.success) {
      setRejectError("La raison du rejet est requise")
      return
    }

    if (!rejectDialog) return

    setIsSubmitting(true)
    try {
      await fetch(`/api/admin/listings/${rejectDialog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED", rejectionReason: rejectReason }),
      })
    } catch {
      // continue
    }
    setListings((prev) =>
      prev.map((l) =>
        l.id === rejectDialog.id
          ? { ...l, status: "REJECTED" as const, rejectionReason: rejectReason }
          : l
      )
    )
    setRejectDialog(null)
    setRejectReason("")
    setRejectError("")
    setIsSubmitting(false)
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
          Moderation des annonces
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          {(statusCounts.PENDING_REVIEW || 0) > 0 ? (
            <span className="text-[var(--color-gold-dark)] font-medium">
              {statusCounts.PENDING_REVIEW} annonce(s) en attente de moderation
            </span>
          ) : (
            "Toutes les annonces sont a jour"
          )}
        </p>
      </div>

      {/* Status Filter Tabs */}
      <Tabs value={filterStatus} onValueChange={setFilterStatus}>
        <TabsList>
          <TabsTrigger value="all">
            Toutes ({statusCounts.all || 0})
          </TabsTrigger>
          <TabsTrigger value="PENDING_REVIEW">
            <Clock className="mr-1.5 size-3.5" />
            En attente ({statusCounts.PENDING_REVIEW || 0})
          </TabsTrigger>
          <TabsTrigger value="PUBLISHED">
            Publiees ({statusCounts.PUBLISHED || 0})
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            Rejetees ({statusCounts.REJECTED || 0})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <Card className="bg-white border-0 shadow-sm rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <Input
              placeholder="Rechercher par titre, auteur, race..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
        {isLoading ? (
          <CardContent className="pt-6">
            <TableSkeleton />
          </CardContent>
        ) : filteredListings.length === 0 ? (
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <Megaphone className="size-10 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Aucune annonce trouvee
              </p>
            </div>
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Race</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow
                  key={listing.id}
                  className={
                    listing.status === "PENDING_REVIEW"
                      ? "bg-[var(--color-gold)]/5"
                      : ""
                  }
                >
                  <TableCell>
                    <div className="max-w-[250px]">
                      <p className="font-medium text-[var(--color-charcoal)] truncate">
                        {listing.title}
                      </p>
                      {listing.city && (
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {listing.city}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {listing.breed}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[var(--color-text-light)]">
                    {listing.vendor?.user?.name || listing.vendor?.shopName || "-"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {listing.price === 0
                      ? "Gratuit"
                      : `${listing.price.toLocaleString("fr-FR")} MAD`}
                  </TableCell>
                  <TableCell className="text-xs text-[var(--color-text-muted)]">
                    {formatDate(listing.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        statusConfig[listing.status]?.color || ""
                      }
                    >
                      {statusConfig[listing.status]?.label || listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {listing.status === "PENDING_REVIEW" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(listing)}
                            disabled={isSubmitting}
                            title="Approuver"
                          >
                            <CheckCircle className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setRejectDialog(listing)
                              setRejectReason("")
                              setRejectError("")
                            }}
                            title="Rejeter"
                          >
                            <XCircle className="size-4" />
                          </Button>
                        </>
                      )}
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
                            onClick={() => setDetailDialog(listing)}
                          >
                            <Eye className="mr-2 size-4" />
                            Voir details
                          </DropdownMenuItem>
                          {listing.status === "PENDING_REVIEW" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleApprove(listing)}
                                className="text-green-600 focus:text-green-600"
                              >
                                <CheckCircle className="mr-2 size-4" />
                                Approuver
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setRejectDialog(listing)
                                  setRejectReason("")
                                  setRejectError("")
                                }}
                                className="text-red-600 focus:text-red-600"
                              >
                                <XCircle className="mr-2 size-4" />
                                Rejeter
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!detailDialog}
        onOpenChange={() => setDetailDialog(null)}
      >
        <DialogContent className="max-w-lg">
          {detailDialog && (
            <>
              <DialogHeader>
                <DialogTitle>{detailDialog.title}</DialogTitle>
                <DialogDescription>
                  Par {detailDialog.vendor?.user?.name || detailDialog.vendor?.shopName || "-"} &middot;{" "}
                  {formatDate(detailDialog.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      statusConfig[detailDialog.status]?.color || ""
                    }
                  >
                    {statusConfig[detailDialog.status]?.label}
                  </Badge>
                  <Badge variant="outline">{detailDialog.breed}</Badge>
                  {detailDialog.city && (
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {detailDialog.city}
                    </span>
                  )}
                </div>

                <div className="rounded-xl border border-[var(--color-cream-dark)] bg-[var(--color-cream)] p-4">
                  <p className="text-sm leading-relaxed text-[var(--color-text)]">
                    {detailDialog.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                      Prix
                    </p>
                    <p className="mt-1 font-semibold text-[var(--color-charcoal)]">
                      {detailDialog.price === 0
                        ? "Gratuit"
                        : `${detailDialog.price.toLocaleString("fr-FR")} MAD`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                      Contact
                    </p>
                    <p className="mt-1 text-sm">
                      {detailDialog.phone || "-"}
                    </p>
                  </div>
                </div>

                {detailDialog.rejectionReason && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                    <p className="text-xs font-semibold text-red-700 mb-1">
                      Raison du rejet :
                    </p>
                    <p className="text-sm text-red-600">
                      {detailDialog.rejectionReason}
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter>
                {detailDialog.status === "PENDING_REVIEW" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setDetailDialog(null)
                        setRejectDialog(detailDialog)
                        setRejectReason("")
                        setRejectError("")
                      }}
                    >
                      <XCircle className="mr-2 size-4" />
                      Rejeter
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        handleApprove(detailDialog)
                        setDetailDialog(null)
                      }}
                    >
                      <CheckCircle className="mr-2 size-4" />
                      Approuver
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={!!rejectDialog}
        onOpenChange={() => {
          setRejectDialog(null)
          setRejectReason("")
          setRejectError("")
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rejeter l&apos;annonce</DialogTitle>
            <DialogDescription>
              {rejectDialog?.title} - Indiquez la raison du rejet.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="reject-reason">Raison du rejet *</Label>
              <Textarea
                id="reject-reason"
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value)
                  setRejectError("")
                }}
                placeholder="Expliquez pourquoi cette annonce est rejetee..."
                rows={4}
              />
              {rejectError && (
                <p className="text-xs text-red-600">{rejectError}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialog(null)
                setRejectReason("")
                setRejectError("")
              }}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleReject}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? "Rejet en cours..." : "Confirmer le rejet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
