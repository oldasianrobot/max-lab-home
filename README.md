# Max's Lab — Home

Personal portfolio and learning lab for Maxwell Leung, Ph.D. A single-page site for vibe coding experiments, data visualization projects, and writing on AI, social science, and Asian American politics and culture.

**Live site:** [mleungphd.org](https://mleungphd.org)

---

## What's Here

Five sections scroll as a single experience:

| Section | Content |
|---------|---------|
| **Hero** | "Field Notes" landing with scroll indicator |
| **Projects** | Seven data visualization experiments, newest first — latest featured full-width, the rest in a 2-column grid |
| **Writing** | Essays and publications in a chronological timeline, newest first |
| **About** | Studio context and mission |
| **Contact** | Links and reach |

### Projects (001–007)

- **001 — AAPI Grocery Index** — Inflation tracking for Asian foods in the U.S.
- **002 — AI Finance Web** — Interactive map of the AI financing ecosystem
- **003 — Disturbance Fields** — Anti-Asian violence in SF (2019–2022) by demographic saturation
- **004 — AAVRv01** — Prototype using radiant flares
- **005 — AAVR Fluid** — Anti-Asian hate crime data rendered as live fluid trails
- **006 — AAVR Fluidv02** — Singular fluid trail iteration
- **007 — AAVR Sound** — Two-act data visualization through generative sound and visual composition

---

## Tech Stack

- **React 19** — UI
- **Vite 6** — Build and dev server
- **Three.js / @react-three/fiber / @react-three/drei** — 3D particle background
- No test framework — verification is visual via dev server

---

## Global Particle Background

A `position: fixed` Three.js canvas sits behind the entire page. Five particle clusters are distributed along the Y axis of 3D space, one per section:

| Cluster | Section | Dominant color |
|---------|---------|----------------|
| 1 | Hero | Cyan `#00e5cc` |
| 2 | Projects | Periwinkle `#78a0ff` |
| 3 | Writing | Muted neutral `#4a5568` |
| 4 | About | Amber `#e5a045` |
| 5 | Contact | Violet `#c878dc` |

Scrolling lerps `camera.position.y` through the cloud. Mouse pointer tilts `camera.rotation`. Y-axis auto-rotation keeps all cluster Y positions stable. Respects `prefers-reduced-motion`.

---

## Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

---

## Project Structure

```
src/
  components/
    ParticleBackground.jsx   # Fixed 3D canvas — 5 clusters, scroll camera, mouse tilt
    Nav.jsx / Nav.css
    Hero.jsx / Hero.css
    Experiments.jsx / Experiments.css
    Writing.jsx / Writing.css
    About.jsx / About.css
    Contact.jsx / Contact.css
  App.jsx
  index.css
docs/
  superpowers/
    specs/    # Design specs
    plans/    # Implementation plans
```

---

## Changelog

### June 2026

- **Projects redesign** — Reordered newest first (007 → 001). The latest project renders as a full-width featured card with a "Latest" badge; the rest sit in a 2-column grid (down from 3) with roomier padding. Text fills the full card width.
- **Writing & Research redesign** — Replaced the featured/list split with a single chronological timeline, newest first. Each entry has a prominent date column, serif title, and full abstract. Updated latest publication date to Feb 2026.
- **Tooling** — Fixed `.claude/launch.json` dev-server port (5174 → 5173 to match Vite).

### Earlier

- Global fixed particle background with scroll-driven camera; Hero canvas delegated to it.
- Y-axis cloud rotation so scroll clusters stay visible; reduced-motion support.
