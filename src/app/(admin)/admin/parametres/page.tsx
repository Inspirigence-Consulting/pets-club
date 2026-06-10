"use client"

import { useState } from "react"
import { Save, Building2, Globe, Bell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ParametresPage() {
  const [isSaving, setIsSaving] = useState(false)

  const [businessInfo, setBusinessInfo] = useState({
    name: "Pet's Club Maroc",
    email: "contact@thepetsclub.ma",
    phone: "+212 6 00 00 00 00",
    address: "Casablanca, Maroc",
    website: "https://thepetsclub.ma",
    description:
      "Elevage premium et ethique de Spitz Nain (Pomeranian) et Berger Australien au Maroc.",
  })

  const [siteSettings, setSiteSettings] = useState({
    language: "fr",
    currency: "MAD",
    timezone: "Africa/Casablanca",
    maintenanceMode: "off",
  })

  const [notifications, setNotifications] = useState({
    emailNewReservation: true,
    emailNewListing: true,
    emailLowStock: true,
    emailVetReminder: true,
    smsNewReservation: false,
    smsVetReminder: true,
  })

  async function handleSaveBusinessInfo() {
    setIsSaving(true)
    try {
      await fetch("/api/admin/settings/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessInfo),
      })
    } catch {
      // local save only
    }
    setTimeout(() => setIsSaving(false), 500)
  }

  async function handleSaveSiteSettings() {
    setIsSaving(true)
    try {
      await fetch("/api/admin/settings/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteSettings),
      })
    } catch {
      // local save only
    }
    setTimeout(() => setIsSaving(false), 500)
  }

  function toggleNotification(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
          Parametres
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Configurez votre elevage et les parametres du site
        </p>
      </div>

      <Tabs defaultValue="business">
        <TabsList>
          <TabsTrigger value="business" className="gap-1.5">
            <Building2 className="size-3.5" />
            Elevage
          </TabsTrigger>
          <TabsTrigger value="site" className="gap-1.5">
            <Globe className="size-3.5" />
            Site
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5">
            <Bell className="size-3.5" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5">
            <Shield className="size-3.5" />
            Securite
          </TabsTrigger>
        </TabsList>

        {/* Business Info */}
        <TabsContent value="business">
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">
                Informations de l&apos;elevage
              </CardTitle>
              <CardDescription>
                Ces informations apparaissent sur le site public et dans les
                communications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 max-w-xl">
                <div className="grid gap-2">
                  <Label htmlFor="biz-name">Nom de l&apos;elevage</Label>
                  <Input
                    id="biz-name"
                    value={businessInfo.name}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="biz-email">Email</Label>
                    <Input
                      id="biz-email"
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) =>
                        setBusinessInfo({
                          ...businessInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="biz-phone">Telephone</Label>
                    <Input
                      id="biz-phone"
                      value={businessInfo.phone}
                      onChange={(e) =>
                        setBusinessInfo({
                          ...businessInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="biz-address">Adresse</Label>
                  <Input
                    id="biz-address"
                    value={businessInfo.address}
                    onChange={(e) =>
                      setBusinessInfo({
                        ...businessInfo,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="biz-website">Site web</Label>
                  <Input
                    id="biz-website"
                    value={businessInfo.website}
                    onChange={(e) =>
                      setBusinessInfo({
                        ...businessInfo,
                        website: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="biz-desc">Description</Label>
                  <Textarea
                    id="biz-desc"
                    value={businessInfo.description}
                    onChange={(e) =>
                      setBusinessInfo({
                        ...businessInfo,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSaveBusinessInfo}
                  disabled={isSaving}
                  className="w-fit bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
                >
                  <Save className="mr-2 size-4" />
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings */}
        <TabsContent value="site">
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">
                Parametres du site
              </CardTitle>
              <CardDescription>
                Configuration generale du site web.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 max-w-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Langue</Label>
                    <Select
                      value={siteSettings.language}
                      onValueChange={(v) =>
                        setSiteSettings({ ...siteSettings, language: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Francais</SelectItem>
                        <SelectItem value="ar">Arabe</SelectItem>
                        <SelectItem value="en">Anglais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Devise</Label>
                    <Select
                      value={siteSettings.currency}
                      onValueChange={(v) =>
                        setSiteSettings({ ...siteSettings, currency: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MAD">MAD (Dirham)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                        <SelectItem value="USD">USD (Dollar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Fuseau horaire</Label>
                    <Select
                      value={siteSettings.timezone}
                      onValueChange={(v) =>
                        setSiteSettings({ ...siteSettings, timezone: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Casablanca">
                          Casablanca (GMT+1)
                        </SelectItem>
                        <SelectItem value="Europe/Paris">
                          Paris (GMT+1)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Mode maintenance</Label>
                    <Select
                      value={siteSettings.maintenanceMode}
                      onValueChange={(v) =>
                        setSiteSettings({
                          ...siteSettings,
                          maintenanceMode: v,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="off">Desactive</SelectItem>
                        <SelectItem value="on">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleSaveSiteSettings}
                  disabled={isSaving}
                  className="w-fit bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
                >
                  <Save className="mr-2 size-4" />
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>
                Configurez les notifications que vous souhaitez recevoir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-xl space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-charcoal)] mb-3">
                    Notifications par email
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        key: "emailNewReservation" as const,
                        label: "Nouvelle reservation",
                        desc: "Etre notifie lors d'une nouvelle reservation de chiot",
                      },
                      {
                        key: "emailNewListing" as const,
                        label: "Nouvelle annonce",
                        desc: "Etre notifie lors d'une nouvelle annonce a moderer",
                      },
                      {
                        key: "emailLowStock" as const,
                        label: "Stock bas",
                        desc: "Etre notifie quand un produit passe en stock bas",
                      },
                      {
                        key: "emailVetReminder" as const,
                        label: "Rappel veterinaire",
                        desc: "Recevoir un rappel la veille d'un rendez-vous veto",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-[var(--color-cream-dark)] p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-[var(--color-charcoal)]">
                            {item.label}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {item.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleNotification(item.key)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                            notifications[item.key]
                              ? "bg-[var(--color-primary)]"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition ${
                              notifications[item.key]
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-charcoal)] mb-3">
                    Notifications par SMS
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        key: "smsNewReservation" as const,
                        label: "Nouvelle reservation",
                        desc: "Recevoir un SMS lors d'une nouvelle reservation",
                      },
                      {
                        key: "smsVetReminder" as const,
                        label: "Rappel veterinaire",
                        desc: "Recevoir un SMS de rappel veterinaire",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-[var(--color-cream-dark)] p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-[var(--color-charcoal)]">
                            {item.label}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {item.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleNotification(item.key)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                            notifications[item.key]
                              ? "bg-[var(--color-primary)]"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition ${
                              notifications[item.key]
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="mt-4 bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Securite</CardTitle>
              <CardDescription>
                Gerez votre mot de passe et les parametres de securite.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 max-w-xl">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">
                    Mot de passe actuel
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Entrez votre mot de passe actuel"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">
                      Nouveau mot de passe
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Nouveau mot de passe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmer</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirmez le mot de passe"
                    />
                  </div>
                </div>

                <Button className="w-fit bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white">
                  <Save className="mr-2 size-4" />
                  Changer le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
