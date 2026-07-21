# Citizen Writer — Build Instructions

**Purpose of this document:** Hand this file to Claude (e.g. Claude Code) as the spec for scaffolding and building the project end to end.

---

## 1. Project Overview

- **Name:** Citizen Writer
- **Type:** Minimalist personal essay blog
- **Aesthetic:** Pencil lines, parchment texture, matte art — hand-drawn, analog, understated
- **Content type:** Long-form essays (MDX)
- **Hosting URL:** `citizenwriter.firebaseapp.com` (Firebase default subdomain — no custom domain for now)
- **Firebase account:** eluo.5230@gmail.com

---

## 2. Tech Stack

- **Framework:** Next.js, static export (`output: 'export'` in `next.config.js`)
- **Styling:** Tailwind CSS
- **Content:** MDX files for essays
- **Hosting:** Firebase Hosting (classic, static) — NOT Firebase App Hosting, since there's no server-rendering requirement
- **Data (features only):** Firestore, used only for newsletter signups and/or comments

**Important note on Firebase:** Firebase's legacy "Hosting frameworks" integration for Next.js SSR is closed to new users; Google now directs Next.js SSR use cases to Firebase App Hosting. This project avoids that entirely by using Next.js static export + classic Firebase Hosting, which is simpler, cheaper, and sufficient for a content blog.

**Template base to adapt:** Start from the structure of the "Tailwind Nextjs Starter Blog" (timlrx) pattern — MDX pipeline, RSS, SEO metadata, reading-time indicators, newsletter form scaffold already solved. Strip its default visual styling entirely; only reuse its plumbing (content pipeline, routing, SEO/RSS setup).

---

## 3. Visual Design System

| Element | Spec |
|---|---|
| Background | Parchment cream (~`#F4EDE0`), subtle paper-grain/fiber texture overlay at low opacity |
| Primary text | Charcoal graphite (~`#2E2A26`) |
| Accent color | One muted tone only — sepia or faded indigo — used sparingly for links/highlights |
| Body font | Serif: Lora, Crimson Pro, or EB Garamond |
| Display/heading font | Handwritten/sketch style, used sparingly: Caveat or Kalam |
| Dividers | Hand-drawn pencil-line SVGs instead of straight `<hr>` |
| Images | Matte treatment — slight desaturation/grain filter, no glossy/high-gloss rendering |
| Hover states | Thin hand-drawn underline animation on links |

---

## 4. Site Structure

```
/                    → Landing page: latest essays, pencil-sketch header
/essays              → Archive, filterable by tag
/essays/[slug]       → Single essay (MDX)
/about               → Citizen Writer bio
/subscribe           → Newsletter signup
```

---

## 5. Features

1. **Newsletter signup**
   - Simple form → writes email to a Firestore collection (`subscribers`)
   - No third-party ESP required initially; can be swapped for Buttondown/ConvertKit later
2. **Comments**
   - Use giscus (GitHub Discussions-based, free, no backend) as the default
   - Alternative: Firestore-backed comments under the same Firebase project if avoiding GitHub dependency is preferred

---

## 6. Placeholder Content Requirements

Since no real essays exist yet:

- Generate **3–5 placeholder essays** (600–900 words each) written in a reflective, literary "Citizen Writer" voice — NOT lorem ipsum — so real layout/line-length/spacing can be evaluated
- Placeholder author bio (~100 words) for `/about`
- Placeholder avatar/headshot image (simple illustrated or abstract placeholder, matte-treated)
- Placeholder tags (e.g., "reflection," "craft," "place") applied across the sample essays for the archive filter to be testable

---

## 7. Build Phases (execute in order)

1. **Scaffold**
   - Initialize Next.js project, static export config
   - Set up MDX content pipeline (`/content/essays/*.mdx`)
   - Build routing for the structure in Section 4
2. **Design system**
   - Implement Tailwind theme tokens per Section 3
   - Build reusable components: header, pencil-divider, essay card, footer
3. **Placeholder content**
   - Generate and insert content per Section 6
4. **Features**
   - Build newsletter form + Firestore write
   - Integrate giscus (or Firestore comments) on essay pages
5. **Firebase setup**
   - Create Firebase project under eluo.5230@gmail.com
   - Enable Hosting + Firestore
   - Configure `firebase.json` for static export output directory
6. **Deploy**
   - `next build` (static export)
   - `firebase deploy`
   - Verify at `citizenwriter.firebaseapp.com`
7. **Polish pass** (future, once real content exists)
   - Swap placeholder essays/art for real content
   - Revisit typography/spacing with real content lengths

---

## 8. Open Items for Future Decisions

- Custom domain (currently using default `.firebaseapp.com` subdomain)
- Final choice between giscus vs. Firestore comments
- Whether newsletter stays Firestore-only or integrates an ESP later
