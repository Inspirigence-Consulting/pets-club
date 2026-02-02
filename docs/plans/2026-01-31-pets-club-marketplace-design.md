# Pets Club — Marketplace Élevage Animalier

## Architecture

```
Frontend: Next.js 16 (App Router) + shadcn/ui + Tailwind v4
Backend:  API Routes Next.js + Prisma ORM + PostgreSQL
Auth:     NextAuth v5 (Credentials) + RBAC (ADMIN, VENDOR, USER)
Paiement: Stripe (frais de publication annonces)
```

## 3 Interfaces

| Interface | Route | Accès |
|-----------|-------|-------|
| Storefront | `/` | Public |
| Admin Dashboard | `/admin` | ADMIN only |
| Vendor Portal | `/vendor` | VENDOR + ADMIN |

## Modules

### 1. Élevage (Admin)
- **Reproducteurs** : CRUD chiens, pedigree, titres, tests santé
- **Portées** : Planification, suivi naissance → sevrage
- **Chiots** : Fiche complète, statut vente, pedigree auto via portée
- **Vétérinaire** : Vaccins, vermifuges, chirurgies, rappels calendrier
- **Reproduction** : Cycles chaleurs, saillies, suivi fertilité

### 2. Stocks (Admin)
- **Catégories** : Croquettes, Médicaments, Accessoires, etc.
- **Articles** : Quantité, seuil min (alerte), prix coût, fournisseur, péremption
- **Mouvements** : Entrées/Sorties/Ajustements avec historique

### 3. Marketplace
- **Vendeurs** : Inscription libre, profil boutique
- **Annonces** : Dépôt → Modération admin → Publication
- **Frais** : Paiement Stripe pour publier une annonce
- **Favoris** : Utilisateurs connectés

## Modèle de données

Voir `prisma/schema.prisma` — 16 modèles couvrant auth, élevage, stocks, marketplace.

## Stack technique

| Lib | Version | Usage |
|-----|---------|-------|
| Next.js | 16.1.6 | Framework fullstack |
| React | 19.2.3 | UI |
| Prisma | latest | ORM PostgreSQL |
| NextAuth | v5 | Auth + RBAC |
| shadcn/ui | latest | Composants UI |
| Tailwind CSS | v4 | Styling |
| Zod | latest | Validation |
| Stripe | latest | Paiement |
| Framer Motion | 12.x | Animations |
| Lucide React | latest | Icônes |

## Flux utilisateur

### Éleveur (Admin)
1. Login → Dashboard stats
2. Gestion chiens/portées/chiots
3. Suivi véto + calendrier rappels
4. Gestion stocks + alertes
5. Modération annonces marketplace

### Vendeur externe
1. Inscription (+ option vendeur)
2. Création profil boutique
3. Dépôt annonce (brouillon)
4. Paiement frais publication (Stripe)
5. Soumission pour modération
6. Publication après validation admin

### Acheteur
1. Navigation chiots élevage + marketplace
2. Inscription optionnelle (favoris)
3. Contact vendeur (hors plateforme)
