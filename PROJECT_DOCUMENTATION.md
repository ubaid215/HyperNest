# Hyper Nest — Project Documentation

**Client:** Hyper Nest Pty Ltd  
**Project:** Corporate Marketing Website  
**Document type:** Technical & operational handoff  
**Version:** 1.0  
**Last updated:** June 2026  
**Prepared for:** Client stakeholders, developers, and content editors

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Scope](#2-project-scope)
3. [Information Architecture](#3-information-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Repository Structure](#5-repository-structure)
6. [Design System](#6-design-system)
7. [Pages & Sections](#7-pages--sections)
8. [Component Reference](#8-component-reference)
9. [Content Management Guide](#9-content-management-guide)
10. [Animation & Interaction Layer](#10-animation--interaction-layer)
11. [Responsive & Mobile Behavior](#11-responsive--mobile-behavior)
12. [Development Guide](#12-development-guide)
13. [Build, Test & Deployment](#13-build-test--deployment)
14. [Configuration Reference](#14-configuration-reference)
15. [Assets & Media](#15-assets--media)
16. [Accessibility & Performance](#16-accessibility--performance)
17. [Known Limitations & Recommended Next Steps](#17-known-limitations--recommended-next-steps)
18. [Support & Handoff Checklist](#18-support--handoff-checklist)

---

## 1. Executive Summary

Hyper Nest is a modern, high-performance marketing website built for an Australian digital agency. The site is designed as a **two-page conversion funnel**:

- **Home** — A single-scroll landing experience with hero, brand story, services showcase, differentiators, process, social proof, and a conversion CTA.
- **Contact** — A dedicated lead-capture page with discovery-call messaging and a contact form.

The product prioritises **visual polish**, **scroll-driven storytelling**, and **mobile-first usability** while remaining maintainable through a clear component architecture and a centralised content data layer.

### Primary business goals

| Goal | How the site supports it |
|------|--------------------------|
| Generate qualified leads | Multiple CTAs routing to `/contact` |
| Communicate service breadth | Scroll-pinned services showcase (10 offerings) |
| Build trust | About narrative, process transparency, testimonials |
| Establish premium positioning | Motion design, typography system, refined UI |

### Delivery status

| Area | Status |
|------|--------|
| Home page (all sections) | Complete |
| Contact page | Complete |
| Mobile navigation | Complete |
| Mobile responsive pass (Hero, Services, Why Us, CTA) | Complete |
| Service photography | Partial — images exist under `public/services/` |
| Contact form backend | UI only — no server submission wired |
| Legal pages (`/privacy`, `/terms`) | Linked in footer — pages not yet built |

---

## 2. Project Scope

### In scope

- Marketing website (Home + Contact)
- Responsive layout (mobile-first adjustments at ≤768px)
- Scroll animations (GSAP ScrollTrigger + Motion/Framer Motion)
- Global navigation with section anchors
- Footer with service/company links and social placeholders
- Centralised editable content in `lib/home-data.ts`
- Static export-ready Next.js App Router architecture

### Out of scope (current release)

- CMS integration (WordPress, Sanity, Contentful, etc.)
- Contact form email/CRM integration
- User authentication or admin dashboard
- Blog or case-study detail pages
- Analytics dashboard (GTM/GA can be added via layout)
- Multi-language / i18n

---

## 3. Information Architecture

### Site map

```
hypernest.com/
├── /                    → Home (single-page sections)
│   ├── #services        → Services scroll showcase
│   ├── #about           → About (scroll colour reveal)
│   ├── #process         → Process timeline
│   └── #work            → Testimonials (Work section)
└── /contact             → Contact page + form
```

### Navigation model

| Label | Destination | Type |
|-------|-------------|------|
| Services | `/#services` | In-page anchor |
| About | `/#about` | In-page anchor |
| Process | `/#process` | In-page anchor |
| Work | `/#work` | In-page anchor |
| Contact | `/contact` | Full page route |
| Get a Free Quote | `/contact` | Full page route (CTA) |

**Mobile navigation note:** Hash links close the overlay menu first, then scroll (or navigate home + scroll from other pages). Contact uses standard client-side routing.

---

## 4. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | [Next.js](https://nextjs.org) (App Router) | 16.2.7 | Routing, SSR/SSG, image optimisation |
| UI library | React | 19.2.4 | Component model |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 4.x | Utility classes + design tokens |
| Global CSS | `app/globals.css` | — | Design system, section styles |
| Scroll animation | GSAP + ScrollTrigger | 3.15 | Pinned sections, scrub timelines |
| UI animation | Motion (Framer Motion) | 12.x | Entrance animations, micro-interactions |
| Icons | Lucide React | 1.17 | Consistent iconography |
| Images | `next/image` + Sharp | — | Optimised responsive images |
| Smooth scroll (available) | Lenis | 1.3 | Optional smooth-scroll layer |
| WebGL effects | OGL | 1.0 | Side rays / ambient visuals |
| Linting | ESLint + eslint-config-next | 9.x | Code quality |

### Architecture pattern

```
app/                  → Routes & layouts (server components by default)
components/
  home/               → Page sections (mostly client components)
  layout/             → Navbar, Footer
  contact/            → Contact page body
  ui/                 → Reusable primitives & effects
lib/
  home-data.ts        → Editable marketing content
  motion-variants.ts  → Shared Motion animation presets
  split-text-lines.ts → About section line-splitting utility
public/               → Static assets (images, favicons)
```

**Rendering strategy:** Section components that require scroll listeners, GSAP, or Motion are marked `"use client"`. Route files (`app/page.tsx`, `app/contact/page.tsx`) remain lean composition layers.

---

## 5. Repository Structure

```
hypernest/
├── app/
│   ├── layout.tsx          # Root layout, metadata, Navbar + Footer
│   ├── page.tsx            # Home page composition
│   ├── contact/page.tsx    # Contact route
│   └── globals.css         # Full design system (~3,700 lines)
├── components/
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CtaSection.tsx
│   │   └── ServiceVisual.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── contact/
│   │   └── ContactContent.tsx
│   ├── ui/                 # Shared UI primitives (see §8)
│   └── loading-screen/     # Optional loading shell (not wired to routes)
├── lib/
│   ├── home-data.ts        # ★ Primary content source
│   ├── motion-variants.ts
│   ├── split-text-lines.ts
│   └── utils.ts
├── public/
│   └── services/           # Service card images
├── next.config.ts
├── package.json
├── tsconfig.json
├── CONTENT.md              # Original copywriting reference
└── PROJECT_DOCUMENTATION.md  # This document
```

---

## 6. Design System

Design philosophy follows **Japanese Kanso (簡素)** — simplicity through elimination — with a strict **60-30-10 colour rule**:

| Ratio | Role | Tokens |
|-------|------|--------|
| 60% | White ground / negative space | `--color-bg`, `--color-bg-warm` |
| 30% | Ink structure / typography | `--color-ink`, `--color-ink-secondary` |
| 10% | Hyper Blue accent | `--color-primary`, `--color-primary-deep` |

### Typography

| Role | Font family | Usage |
|------|-------------|-------|
| Display / headings | Plus Jakarta Sans | Hero, section titles, card headings |
| Body / UI | Inter | Paragraphs, buttons, forms |
| Labels / data | JetBrains Mono | Badges, metadata, footer notes |

### Key CSS classes

| Class | Purpose |
|-------|---------|
| `.container` | Centred content wrapper (`max-width: 1200px`) |
| `.section` / `.section-alt` | Vertical section spacing |
| `.display-lg`, `.display-md` | Heading scale |
| `.body-lg`, `.body-md` | Body copy scale |
| `.label-tag` | Eyebrow labels above headings |
| `.btn`, `.btn-primary`, `.btn-outline` | Button system |
| `.badge`, `.badge-primary` | Hero status badge |

### Breakpoints

| Name | Width | Behaviour |
|------|-------|-----------|
| Mobile | ≤767px | Hamburger menu, stacked layouts, reduced hero height |
| Tablet | 768px–900px | Transitional grid layouts |
| Desktop | ≥901px | Full split panels, scroll parallax |

All design tokens live in `:root` inside `app/globals.css`. Tailwind v4 `@theme` block mirrors core colour and radius tokens.

---

## 7. Pages & Sections

### 7.1 Home (`/`)

Composed in `app/page.tsx`:

| Order | Section | Component | Anchor ID | Description |
|-------|---------|-----------|-----------|-------------|
| — | Ambient FX | `AmbientEffects` | — | Global cursor/glow layer |
| 1 | Hero | `Hero.tsx` | — | Headline, subcopy, CTAs, service ticker |
| 2 | About | `About.tsx` | `#about` | GSAP scroll colour-reveal narrative |
| 3 | Services | `Services.tsx` | `#services` | Pinned scroll showcase (10 cards) |
| 4 | Why Us | `WhyUs.tsx` | — | Interactive split panel (6 reasons) |
| 5 | Process | `Process.tsx` | `#process` | 4-step interactive timeline |
| 6 | Testimonials | `Testimonials.tsx` | `#work` | Lumos-style bento grid |
| 7 | CTA | `CtaSection.tsx` | — | Conversion panel with benefits + metrics |

### 7.2 Contact (`/contact`)

| Area | Description |
|------|-------------|
| Hero | Grid background, side rays, headline, trust stats |
| Info panel | Email, phone, locations, social links |
| Form | Name, email, company, service select, message |
| Submit state | Client-side success message (no API yet) |

### 7.3 Global chrome

| Element | File | Notes |
|---------|------|-------|
| Navbar | `Navbar.tsx` | Sticky, blur on scroll, active section tracking |
| Footer | `Footer.tsx` | Mega footer with wordmark, link columns, locations |
| Metadata | `app/layout.tsx` | Default SEO title + description |

---

## 8. Component Reference

### 8.1 Layout components

| Component | Path | Responsibility |
|-----------|------|----------------|
| `Navbar` | `components/layout/Navbar.tsx` | Desktop links, mobile hamburger overlay, scroll state |
| `Footer` | `components/layout/Footer.tsx` | Site map, CTA band, legal links, social |

### 8.2 Home sections

| Component | Animation engine | Key interaction |
|-----------|------------------|-----------------|
| `Hero` | GSAP + Motion | Fog word reveal, parallax fade, service marquee |
| `About` | GSAP ScrollTrigger | Pinned scroll, line-by-line colour reveal |
| `Services` | GSAP ScrollTrigger | Pinned stage, card enter/exit scrub |
| `WhyUs` | Motion AnimatePresence | Tab nav + animated detail panel |
| `Process` | Motion | Step activation, progress line fill |
| `Testimonials` | Motion | Bento grid stagger reveal |
| `CtaSection` | Motion | Split conversion layout |

### 8.3 UI primitives (`components/ui/`)

| Component | Purpose |
|-----------|---------|
| `AnimatedSection` | Scroll-triggered section wrapper with optional blur reveal |
| `SectionHeading` | Standardised label + title + optional description |
| `MagneticButton` | CTA link with magnetic hover offset |
| `FogReveal` | Per-word blur fade text animation |
| `SideRays` | WebGL-inspired gradient ray effect |
| `GridBackgroundDemo` | Subtle grid backdrop |
| `HamburgerMenuOverlay` | Full-screen mobile navigation overlay |
| `CountUp` | Animated number counter |
| `TiltCard` | 3D tilt hover card |
| `HorizontalScroll` | Horizontal scroll container |
| `SplitText` / `WordReveal` | Text animation utilities |

---

## 9. Content Management Guide

### Primary content file

**`lib/home-data.ts`** — single source of truth for:

- `SERVICES` — 10 service cards (image path, title, description, price)
- `WHY_US` — 6 differentiator items
- `PROCESS_STEPS` — 4 process stages
- `TESTIMONIALS` — 3 client quotes

### How to update a service

```ts
// lib/home-data.ts
{
  image: "/services/custom-website-design.jpg",
  imageAlt: "Custom website design project preview",
  title: "Custom Website Design",
  description: "…",
  price: "Starting from AUD $2,500",
}
```

1. Edit the object in `SERVICES`.
2. Place or replace the image in `public/services/`.
3. Run `npm run dev` and verify in the Services scroll section.

### How to update navigation labels

Edit `NAV_LINKS` in `components/layout/Navbar.tsx` and corresponding footer arrays in `components/layout/Footer.tsx`.

### How to update contact form service options

Edit `SERVICE_OPTIONS` in `components/contact/ContactContent.tsx`.

### Copy reference

`CONTENT.md` contains the original long-form marketing copy used as the content brief. It is a reference document, not wired to the UI.

### SEO metadata

| Page | File | Fields |
|------|------|--------|
| Global default | `app/layout.tsx` | `title`, `description` |
| Contact | `app/contact/page.tsx` | Page-specific `metadata` export |

---

## 10. Animation & Interaction Layer

### GSAP ScrollTrigger (scroll-scrubbed)

Used in **About** and **Services** for pinned, scroll-linked timelines.

| Section | Pin target | Mobile adjustments |
|---------|------------|-------------------|
| About | `.about-story-pin` | Shorter scroll distance per line |
| Services | `.services-scroll-pin` | Parallax Y disabled; cards stack without float |

Both sections respect `prefers-reduced-motion: reduce` and fall back to static layouts.

### Motion / Framer Motion (viewport-triggered)

Used for entrance animations in Process, Testimonials, CTA, Footer, and Contact. Shared easing and variants live in `lib/motion-variants.ts`:

- `fadeUp`, `fadeIn`, `slideFromLeft`, `slideFromRight`, `scaleIn`
- `staggerContainer(delay, startDelay)`
- `MOTION_EASE = [0.16, 1, 0.3, 1]`

### Hero load sequence

1. Badge blur fade-in  
2. Headline words stagger (FogReveal)  
3. Subheadline words stagger  
4. CTA buttons stagger  
5. Bottom service ticker fade-in (22s infinite marquee)

---

## 11. Responsive & Mobile Behavior

Mobile breakpoint: **≤768px** (navbar switches at 767px).

### Section-specific mobile behaviour

| Section | Mobile treatment |
|---------|------------------|
| **Hero** | Shorter height (`min-height: auto`), 3-line headline rhythm, stacked CTAs |
| **Services** | Single-column cards, no image parallax, tighter padding |
| **Why Us** | Horizontal scroll pill tabs; detail panel below |
| **CTA** | Single column, full-width buttons, overflow contained |
| **Navbar** | Hamburger overlay with scroll lock |
| **Footer** | Stacked columns, centred legal row |

### Touch considerations

- Why Us uses `onPointerEnter` (mouse only) to avoid sticky hover on touch devices.
- Mobile menu closes before navigation to prevent scroll-lock conflicts.

---

## 12. Development Guide

### Prerequisites

- **Node.js** 20 LTS or later  
- **npm** 10+ (or compatible package manager)

### Install & run

```bash
# Clone / open project
cd hypernest

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Run production server locally
npm start

# Lint
npm run lint
```

### Path aliases

TypeScript maps `@/*` → project root (see `tsconfig.json`):

```ts
import Hero from "@/components/home/Hero";
import { SERVICES } from "@/lib/home-data";
```

### Adding a new home section

1. Create `components/home/NewSection.tsx`.
2. Add styles to `app/globals.css` (section block).
3. Import and place in `app/page.tsx`.
4. If anchor navigation is needed, add an `id` and update `NAV_LINKS` in `Navbar.tsx`.

### Local tunneling (ngrok)

`next.config.ts` includes `allowedDevOrigins` for `*.ngrok-free.app` so HMR works through ngrok tunnels during client previews.

---

## 13. Build, Test & Deployment

### Build output

```
Route (app)
┌ ○ /              Static
├ ○ /_not-found    Static
└ ○ /contact       Static
```

All current routes are statically prerendered.

### Recommended hosting

| Platform | Notes |
|----------|-------|
| **Vercel** (recommended) | Native Next.js support, zero-config deploy |
| Netlify | Supports Next.js with adapter |
| AWS Amplify | Enterprise option |
| Self-hosted Node | Run `npm run build && npm start` |

### Pre-deploy checklist

- [ ] Run `npm run build` — zero TypeScript errors
- [ ] Verify all `public/services/` images load
- [ ] Test mobile menu navigation (all anchors + Contact)
- [ ] Test Contact form UX (success state)
- [ ] Update placeholder social URLs in Footer and Contact
- [ ] Add real favicon / OG images if required
- [ ] Configure domain DNS and SSL

### Environment variables

No required environment variables for the current static marketing site. Add when integrating:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` / `SENDGRID_API_KEY` | Contact form email |
| `NEXT_PUBLIC_GA_ID` | Google Analytics |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO |

---

## 14. Configuration Reference

### `next.config.ts`

```ts
const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.ngrok-free.app"],
};
```

### `package.json` scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Development with hot reload |
| `build` | `next build` | Production build + type check |
| `start` | `next start` | Serve production build |
| `lint` | `eslint` | Run ESLint |

---

## 15. Assets & Media

### Service images

Location: `public/services/`

| File | Service |
|------|---------|
| `custom-website-design.jpg` | Custom Website Design |
| `ecommerce-website.jpg` | E-Commerce Website |
| `web-application.jpg` | Web Application Development |
| `mobile-app.jpg` | Mobile App Development |
| `seo.jpg` | Search Engine Optimisation |
| `paid-ads.jpg` | Google & Meta Ads Management |
| `branding.jpg` | Branding & Identity Design |
| `ui-ux-design.jpg` | UI/UX Design |
| `cms-integration.jpg` | CMS Integration & Setup |
| `maintenance-support.jpg` | Website Maintenance & Support |

**Image guidelines:** Landscape orientation, minimum 1200×800px, optimised JPEG/WebP, consistent colour grading aligned with Hyper Blue brand.

### Fonts

Loaded via Google Fonts import in `globals.css` (Plus Jakarta Sans, Inter, JetBrains Mono). For production, consider self-hosting fonts for GDPR/performance.

---

## 16. Accessibility & Performance

### Accessibility measures

- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`)
- `aria-label` / `aria-labelledby` on navigation and sections
- Keyboard support on interactive panels (Why Us, Process, mobile menu)
- `prefers-reduced-motion` fallbacks for GSAP sections
- `:focus-visible` outline styles globally
- Form labels associated with inputs on Contact page

### Performance considerations

- `next/image` for service photos with responsive `sizes`
- Static prerendering for fast TTFB
- Client components isolated to animated sections only
- GSAP contexts properly cleaned up on unmount/resize

### Recommended audits before launch

- Lighthouse (Performance, Accessibility, SEO, Best Practices)
- Cross-browser test: Chrome, Safari, Firefox, Edge
- Real device test: iOS Safari, Android Chrome

---

## 17. Known Limitations & Recommended Next Steps

| Item | Current state | Recommendation |
|------|---------------|----------------|
| Contact form | UI-only submit handler | Integrate Resend, Formspree, or API route |
| Legal pages | Footer links to `/privacy`, `/terms` | Create static pages or external policy URLs |
| Social links | Placeholder URLs | Replace with live profiles |
| Analytics | Not installed | Add GA4 or Plausible via `layout.tsx` |
| CMS | Hard-coded data | Optional: Sanity or Contentful for non-technical edits |
| Loading screen | Components exist, not active | Wire `AppShell` if branded load experience desired |
| Case studies | Testimonials only | Add `/work/[slug]` when portfolio grows |
| `Work` nav label | Points to testimonials | Rename or add dedicated portfolio section |

---

## 18. Support & Handoff Checklist

### For the client team

- [ ] Review all copy in `lib/home-data.ts` and section components
- [ ] Provide final service photography if replacing placeholders
- [ ] Confirm pricing strings and service list
- [ ] Supply real contact details (phone, email, addresses)
- [ ] Approve social media URLs
- [ ] Choose form submission provider

### For the development team

- [ ] Repository access transferred
- [ ] Hosting account ownership confirmed
- [ ] Domain DNS documented
- [ ] Build pipeline documented (CI/CD optional)
- [ ] This document stored alongside `README.md`

### Key files to know

| Task | File |
|------|------|
| Change service copy/prices | `lib/home-data.ts` |
| Change hero headline | `components/home/Hero.tsx` |
| Change colours globally | `app/globals.css` (`:root` tokens) |
| Change nav links | `components/layout/Navbar.tsx` |
| Change footer | `components/layout/Footer.tsx` |
| Change contact form fields | `components/contact/ContactContent.tsx` |
| Change page SEO | `app/layout.tsx`, `app/contact/page.tsx` |

---

## Appendix A — Section Anchor Quick Reference

| Anchor | DOM ID | Component |
|--------|--------|-----------|
| Services | `services` | `Services.tsx` |
| About | `about` | `About.tsx` |
| Process | `process` | `Process.tsx` |
| Work | `work` | `Testimonials.tsx` |

---

## Appendix B — Dependency Summary

```
Production:
  next, react, react-dom
  gsap, motion
  lucide-react
  clsx, tailwind-merge
  sharp, ogl
  @tsparticles/react, lenis, @studio-freight/lenis

Development:
  typescript, tailwindcss, @tailwindcss/postcss
  eslint, eslint-config-next
  @types/node, @types/react, @types/react-dom
```

---

## Appendix C — Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | June 2026 | Development team | Initial client handoff documentation |

---

*This document describes the Hyper Nest marketing website as delivered. For day-to-day developer onboarding, see `README.md`. For original marketing copy reference, see `CONTENT.md`.*
