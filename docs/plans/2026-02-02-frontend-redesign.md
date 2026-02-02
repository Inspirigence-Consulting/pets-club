# Frontend Redesign — Pet's Club Maroc

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refondre entierement le frontend du site Pet's Club Maroc pour corriger les problemes visuels (texte blanc sur blanc, contrastes faibles, design generique) et obtenir un site premium, moderne, et lisible.

**Architecture:** On travaille fichier par fichier sur le codebase Next.js existant. Pas de nouvelles dependances — on utilise deja shadcn/ui (new-york), Tailwind CSS 4, Framer Motion, Lucide icons, et les 4 Google Fonts (Playfair, Inter, Poppins, Roboto). Le design system repose sur des CSS variables dans globals.css. On garde la palette brand (forest green, gold, cream) mais on ameliore les contrastes et la hierarchie visuelle.

**Tech Stack:** Next.js 16 / React 19 / Tailwind CSS 4 / shadcn/ui / Framer Motion / Lucide React

---

## Diagnostic des problemes identifies

| # | Probleme | Fichiers concernes | Severite |
|---|----------|--------------------|----------|
| 1 | **Texte `text-white/40` et `text-white/25` quasi-invisible** sur fonds sombres | Footer.tsx, Differentiators.tsx, Newsletter.tsx, Testimonials.tsx | CRITIQUE |
| 2 | **`text-[var(--color-text-muted)]` (#999) sur fond cream (#faf7f2)** — contraste WCAG insuffisant | Auth layout, TrustBadges.tsx, PuppyCard.tsx, forms | CRITIQUE |
| 3 | **Nav links `text-white/50`** — trop fade, navigation invisible sans hover | Header.tsx | HAUTE |
| 4 | **Pas de `border-radius` sur les cartes et boutons** — design trop angulaire/brut | globals.css (.card-luxury, .btn-primary, .btn-gold, .btn-outline) | HAUTE |
| 5 | **Hierarchie visuelle plate** — sections se ressemblent toutes | Hero, TrustBadges, FeaturedPuppies, BreedShowcase | MOYENNE |
| 6 | **Marketplace et pages internes** — melange de custom CSS et shadcn sans coherence | marketplace/page.tsx, login, register, admin | MOYENNE |
| 7 | **Responsive gaps** — filtre pills overflow sur mobile dans chiots/page.tsx | chiots/page.tsx | MOYENNE |
| 8 | **Footer bottom bar `text-white/25`** — completement illisible | Footer.tsx | CRITIQUE |
| 9 | **Inconsistances de border-radius** — certains elements ronds, d'autres carres | Globalement tout le site | HAUTE |
| 10 | **Placeholder "Carte interactive"** visible dans contact | contact/page.tsx | BASSE |

---

## Task 1: Corriger les design tokens dans globals.css

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Ameliorer les contrastes des variables de texte**

Remplacer les valeurs de couleur texte pour de meilleurs contrastes WCAG AA :

```css
/* Avant */
--color-text-muted: #999999;

/* Apres */
--color-text-muted: #71717a;
```

Raison : #999 sur #faf7f2 = ratio ~2.8:1 (FAIL). #71717a sur #faf7f2 = ratio ~4.8:1 (PASS AA).

**Step 2: Ajouter un border-radius global aux elements custom**

Ajouter `border-radius: 12px` aux classes `.card-luxury`, `.btn-primary`, `.btn-gold`, `.btn-outline`, `.form-input`, et `border-radius: 16px` aux `.glass-card`. Cela donne un look plus moderne et arrondi.

```css
.btn-primary { border-radius: 10px; }
.btn-gold { border-radius: 10px; }
.btn-outline { border-radius: 10px; }
.card-luxury { border-radius: 16px; overflow: hidden; }
.form-input { border-radius: 10px; }
.glass-card { border-radius: 20px; }
.badge-luxury { border-radius: 8px; }
```

**Step 3: Augmenter `--radius` pour shadcn**

```css
--radius: 0.75rem; /* etait 0.5rem */
```

Cela impacte automatiquement tous les composants shadcn (Card, Button, Input, Dialog, etc.).

**Step 4: Lancer le build pour verifier**

Run: `cd /Users/nadir/pets-club && npx next build 2>&1 | tail -20`
Expected: Build succeed (pas d'erreurs CSS)

**Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: improve contrast ratios, add border-radius to design tokens"
```

---

## Task 2: Corriger le Header — navigation lisible et premium

**Files:**
- Modify: `src/components/layout/Header.tsx`

**Step 1: Augmenter l'opacite des nav links**

Remplacer `text-white/50` par `text-white/70` sur les liens desktop, et `text-white/80` au hover (deja le cas). Remplacer aussi `text-white/70` dans le dropdown par `text-white/80`.

**Step 2: Ajouter un fond plus dense au header au scroll**

Remplacer `bg-black/70` par `bg-black/85` sur l'etat scrolled pour un contraste plus net.

**Step 3: Ameliorer le dropdown "Nos Races"**

Ajouter `rounded-xl` et un leger `border border-white/15` (actuellement `border-white/10`).

**Step 4: Ajouter l'indicateur de page active**

Utiliser `usePathname()` de next/navigation pour comparer et ajouter `text-white` + l'underline active quand on est sur la page courante.

**Step 5: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "fix: improve header nav contrast and add active page indicator"
```

---

## Task 3: Corriger le Footer — texte lisible

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Augmenter l'opacite de tous les textes**

| Avant | Apres | Elements |
|-------|-------|----------|
| `text-white/40` | `text-white/60` | Body text, links, contact info |
| `text-white/25` | `text-white/40` | Copyright, bottom bar |
| `text-white/50` | `text-white/65` | CTA banner paragraph |
| `hover:text-white/50` | `hover:text-white/70` | Bottom bar links |

**Step 2: Ameliorer les icones sociales**

Passer les icones sociales de `text-white/40` a `text-white/50` et le border de `border-white/10` a `border-white/15`.

**Step 3: Arrondir le CTA banner**

Ajouter `rounded-2xl` au CTA banner du footer (actuellement pas de border-radius).

**Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "fix: improve footer text contrast and add border-radius to CTA"
```

---

## Task 4: Corriger les sections homepage — contrastes et polish

**Files:**
- Modify: `src/components/sections/TrustBadges.tsx`
- Modify: `src/components/sections/FeaturedPuppies.tsx`
- Modify: `src/components/sections/Differentiators.tsx`
- Modify: `src/components/sections/Testimonials.tsx`
- Modify: `src/components/sections/Newsletter.tsx`
- Modify: `src/components/sections/InstagramFeed.tsx`

### 4a: TrustBadges.tsx

**Step 1:** Remplacer `text-[var(--color-text-muted)]` sur les labels par `text-[var(--color-text-light)]` pour un meilleur contraste.

**Step 2:** Ajouter `rounded-2xl` au conteneur principal (actuellement pas de border-radius — visuellement carre).

### 4b: Differentiators.tsx

**Step 1:** Remplacer `text-white/40` sur les descriptions par `text-white/60`. Remplacer `group-hover:text-white/60` par `group-hover:text-white/80`.

**Step 2:** Remplacer `text-white/50` sur le sous-titre par `text-white/70`.

**Step 3:** Ajouter `rounded-xl` aux cartes de differenciateurs.

### 4c: Testimonials.tsx

**Step 1:** Remplacer `text-white/40` (location) par `text-white/55`.

**Step 2:** Remplacer `text-white/30` (stat labels) par `text-white/50`.

**Step 3:** Remplacer `text-white/50` (section label) par `text-white/60`.

**Step 4:** Remplacer `text-white/20` (mobile hint) par `text-white/35`.

### 4d: Newsletter.tsx

**Step 1:** Remplacer `text-white/40` sur le paragraphe par `text-white/60`.

### 4e: InstagramFeed.tsx

**Step 1:** Ajouter `rounded-lg` aux photos du grid (actuellement `rounded-sm md:rounded-md`).

### 4f: FeaturedPuppies.tsx

Pas de probleme de contraste majeur, mais ajouter `rounded-2xl overflow-hidden` au wrapper si les PuppyCards ne sont pas deja arrondies.

**Step final: Commit**

```bash
git add src/components/sections/
git commit -m "fix: improve contrast in all homepage sections, add rounded corners"
```

---

## Task 5: Corriger PuppyCard — arrondir et polir

**Files:**
- Modify: `src/components/ui/PuppyCard.tsx`

**Step 1:** Ajouter `rounded-2xl` explicitement dans le wrapper `.card-luxury` (sera deja herite de globals.css Task 1, mais on ajoute aussi `overflow-hidden` pour le clip de l'image).

**Step 2:** Arrondir les badges de statut — ajouter `rounded-md` aux badges dans le variant "feed" (actuellement aucun radius).

**Step 3:** Verifier visuellement sur la page `/chiots`.

**Step 4: Commit**

```bash
git add src/components/ui/PuppyCard.tsx
git commit -m "fix: round puppy cards and status badges"
```

---

## Task 6: Corriger la page Chiots — responsive filters

**Files:**
- Modify: `src/app/chiots/page.tsx`

**Step 1:** Sur les filter pills, ajouter `flex-nowrap` et `scrollbar-hide` pour un scroll horizontal propre sur mobile au lieu d'un overflow cache.

**Step 2:** Ajouter un style CSS utilitaire `.scrollbar-hide` dans globals.css si pas deja present:

```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

**Step 3: Commit**

```bash
git add src/app/chiots/page.tsx src/app/globals.css
git commit -m "fix: horizontal scroll for filter pills on mobile"
```

---

## Task 7: Corriger les pages Auth — contraste et polish

**Files:**
- Modify: `src/app/(auth)/layout.tsx`
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/(auth)/register/page.tsx`

**Step 1:** Dans le layout auth, remplacer `text-[var(--color-text-muted)]` du footer par `text-[var(--color-text-light)]`.

**Step 2:** Dans login/register, verifier que les `CardDescription` utilisent `text-[var(--color-text-light)]` au lieu de la couleur par defaut shadcn `text-muted-foreground` (qui est maintenant #6b6b6b grace a nos tokens — OK). Pas de changement necessaire si les tokens sont corrects.

**Step 3:** Ajouter `rounded-2xl` aux Cards d'authentification pour un look plus moderne.

**Step 4: Commit**

```bash
git add src/app/(auth)/
git commit -m "fix: improve auth pages contrast and add rounded cards"
```

---

## Task 8: Corriger la page Marketplace — coherence visuelle

**Files:**
- Modify: `src/app/marketplace/page.tsx`

**Step 1:** Le hero banner utilise `py-16` mais les autres pages utilisent `pt-40 pb-24`. Ajuster a `pt-36 pb-16` pour un hero plus genereux avec de l'espace pour le header fixe.

**Step 2:** Les Cards du listing n'ont pas de `rounded-xl` explicite (elles heritent du composant shadcn Card). Grace au `--radius: 0.75rem` de Task 1, c'est deja ameliore. Mais ajouter `rounded-2xl` sur l'image container pour un look plus doux.

**Step 3:** Ajouter `rounded-2xl` au CTA "Vous avez un chien a vendre ?" (deja `rounded-2xl` — OK).

**Step 4:** Ajouter un indicateur visuel quand les filtres sont actifs (changer le Button variant/style).

**Step 5: Commit**

```bash
git add src/app/marketplace/page.tsx
git commit -m "fix: marketplace hero spacing and filter state indicator"
```

---

## Task 9: Corriger la page Contact — placeholder carte + polish

**Files:**
- Modify: `src/app/contact/page.tsx`

**Step 1:** Remplacer le placeholder "Carte interactive" par un lien Google Maps embed ou au minimum un block visuellement agreable avec une icone MapPin large et un texte "Voir sur Google Maps".

**Step 2:** Arrondir les FAQ items — ajouter `rounded-xl` au lieu de pas de border-radius.

**Step 3:** Arrondir le bloc de formulaire — ajouter `rounded-2xl` au wrapper `bg-white`.

**Step 4:** Arrondir les info boxes du contact sidebar — ajouter `rounded-lg` aux icones boxes.

**Step 5: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "fix: contact page map placeholder, round FAQ and form containers"
```

---

## Task 10: Corriger le Hero — polish final

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Step 1:** Les glass-btn CTA dans le Hero sont deja corrects (heritent de globals.css). Mais ajouter `rounded-xl` explicitement pour etre certain (les glass-btn ont `border-radius: 9999px` — full rounded, c'est OK pour des pills).

**Step 2:** Verifier que l'image mobile a un gradient suffisant — l'overlay `from-black via-black/70 to-black/40` est correct. Pas de changement.

**Step 3: Commit (si changements)**

```bash
git add src/components/sections/Hero.tsx
git commit -m "fix: hero polish and CTA refinements"
```

---

## Task 11: Corriger le BreedShowcase — contrastes texte

**Files:**
- Modify: `src/components/sections/BreedShowcase.tsx`

**Step 1:** Remplacer `text-white/60` sur la tagline par `text-white/75`.

**Step 2:** Remplacer `text-white/40` sur les stat labels par `text-white/55`.

**Step 3: Commit**

```bash
git add src/components/sections/BreedShowcase.tsx
git commit -m "fix: breed showcase text contrast improvements"
```

---

## Task 12: Build final et verification visuelle

**Files:** Aucun nouveau fichier

**Step 1: Run build**

```bash
cd /Users/nadir/pets-club && npx next build 2>&1 | tail -30
```
Expected: Build succeed

**Step 2: Lancer en dev et verifier visuellement**

```bash
cd /Users/nadir/pets-club && npx next dev
```

Verifier manuellement :
- [ ] Homepage: Hero lisible, TrustBadges arrondis, sections contrastees
- [ ] Nav: liens visibles sans hover, indicateur page active
- [ ] Footer: tout le texte lisible sur le fond sombre
- [ ] /chiots: filtres scrollables sur mobile, cartes arrondies
- [ ] /contact: FAQ arrondies, formulaire arrondi, placeholder carte ameliore
- [ ] /marketplace: hero correct, cartes arrondies
- [ ] /login et /register: cartes arrondies, contraste OK
- [ ] Mobile: tout est responsive et lisible

**Step 3: Commit final si ajustements**

```bash
git add -A
git commit -m "fix: final visual polish after redesign review"
```

---

## Resume des changements par priorite

| Priorite | Quoi | Impact |
|----------|------|--------|
| P0 | Contrastes texte (globals.css + tous les composants) | Lisibilite, accessibilite WCAG |
| P0 | `--color-text-muted` passe de #999 a #71717a | Tous les textes muted du site |
| P1 | Border-radius global (12px-20px sur tous les elements) | Look premium et moderne |
| P1 | Header nav links plus visibles | Navigation utilisable |
| P1 | Footer texte lisible | Information accessible |
| P2 | Responsive filter pills | UX mobile |
| P2 | Contact page placeholder carte | Completude |
| P2 | Marketplace hero spacing | Coherence visuelle |
