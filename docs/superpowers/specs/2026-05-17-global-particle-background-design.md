# Global Particle Background — Design Spec

**Date:** 2026-05-17
**Status:** Approved

## Overview

Extend the interactive 3D particle cloud from the Hero section to cover the entire page. A single fixed canvas lives behind all content, with five particle clusters distributed across 3D space — one per section. Scrolling moves the camera through the cloud; mouse pointer applies a global rotation.

## Architecture

### New component: `ParticleBackground`

- `src/components/ParticleBackground.jsx`
- A `position: fixed; inset: 0; z-index: 0; pointer-events: none` wrapper div containing a `<Canvas>`
- Rendered in `App.jsx` before `<Nav />`, outside `<main>`
- Handles its own scroll listener and reduced-motion detection

### Modified: `Hero.jsx` / `Hero.css`

- Remove `hero__canvas-container` div and the `<Canvas>` inside it
- Remove `hero__vignette` div (vignette effect no longer needed — global canvas handles atmosphere)
- Remove Three.js imports (`@react-three/fiber`, `@react-three/drei`, `three`)
- Remove `ParticleCloud` and `circleTexture` logic
- Keep: section height (100vh), `hero__label`, `hero__sub`, `hero__scroll`

### Modified: `App.jsx`

Add `<ParticleBackground />` as the first child before `<Nav />`.

### Modified: `index.css` / section styles

All section containers must not have opaque background colors that would hide the particle cloud. Existing sections already use transparent or near-transparent backgrounds — verify and adjust if needed. Sections need `position: relative; z-index: 1` to sit above the fixed canvas.

---

## Particle Clusters

4,200 particles total (unchanged order-of-magnitude from current Hero's 4,000). Distribution: ~760 per cluster × 5 = 3,800, plus ~200 sparse connecting particles seeded between cluster centers.

| Cluster | Section | Camera Y target | Dominant color |
|---------|---------|----------------|----------------|
| 1 | Hero | 0 | Cyan `#00e5cc` |
| 2 | Experiments | −8 | Periwinkle `#78a0ff` |
| 3 | Writing | −16 | Muted/neutral `#4a5568` |
| 4 | About | −24 | Amber `#e5a045` |
| 5 | Contact | −32 | Violet `#c878dc` |

Each cluster is centered at its Y position with the same `radius = 2.0` sphere distribution as the current cloud. Particles within each cluster use: ~40% dominant color, ~40% muted starlight (`#4a5568`), ~20% very dark (`#2d3748`). This keeps transitions between zones gradual.

The ~200 connecting particles bridge zones visually, using a mix of all palette colors at low opacity.

---

## Camera & Interaction

### Scroll → Camera Y

- A `useRef` scroll ref is updated via a passive `window.scroll` event listener
- `scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight)`
- `targetCameraY = scrollPercent * −32`
- `useFrame` lerps `camera.position.y` toward target at factor `0.05`

### Mouse rotation

- Same as current Hero: `state.pointer.x * 0.3` and `state.pointer.y * 0.3`
- Applied as a rotation delta on the points group, lerped at factor `0.05`
- Mouse rotation and scroll-driven camera Y are independent — both active simultaneously

### Camera setup

- `camera={{ position: [0, 0, 1.2] }}` — same as current Hero
- `dpr={[1, 2]}` — unchanged

### Reduced motion

- `prefers-reduced-motion: reduce` → particles render statically, no animation loop

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/ParticleBackground.jsx` | **New** — global fixed canvas with 5 clusters + scroll camera |
| `src/components/Hero.jsx` | Remove canvas, vignette, Three.js imports |
| `src/components/Hero.css` | Remove `.hero__canvas-container` and `.hero__vignette` rules |
| `src/App.jsx` | Add `<ParticleBackground />` before `<Nav />` |

---

## Out of Scope

- Per-section particle density changes (all clusters use same radius and count)
- Parallax or depth effects beyond camera Y movement
- Any changes to section content, layout, or styling beyond z-index / background transparency
