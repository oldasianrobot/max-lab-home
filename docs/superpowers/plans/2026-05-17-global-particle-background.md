# Global Particle Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hero-only particle cloud with a single `position: fixed` canvas behind the entire page, with five section-aligned particle clusters that reveal as the user scrolls.

**Architecture:** A new `ParticleBackground` component renders a fixed-position `<Canvas>` at `z-index: 0` beneath all page content. Five particle clusters live at Y positions 0, −8, −16, −24, −32 in 3D space. `useFrame` lerps `camera.position.y` to match scroll percentage; mouse pointer nudges `camera.rotation` so the effect stays local regardless of scroll depth. The auto-rotation of the cloud (slow spin) continues as before, applied to the points group.

**Tech Stack:** React 19, `@react-three/fiber` ^9, `@react-three/drei` ^10, `three` ^0.183, Vite 6. No test framework — all verification is visual via dev server.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/ParticleBackground.jsx` | **Create** | Fixed canvas, 5 clusters + connecting particles, scroll camera, mouse rotation |
| `src/App.jsx` | **Modify** | Add `<ParticleBackground />` before `<Nav />` |
| `src/components/Hero.jsx` | **Modify** | Remove canvas, vignette, Three.js imports; keep section height and text |
| `src/components/Hero.css` | **Modify** | Delete `.hero__canvas-container` (lines 13–21) and `.hero__vignette` (lines 24–32) |

---

### Task 1: Create `src/components/ParticleBackground.jsx`

**Files:**
- Create: `src/components/ParticleBackground.jsx`

- [ ] **Step 1: Create the file**

Create `src/components/ParticleBackground.jsx` with this exact content:

```jsx
import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CLUSTERS = [
    { y: 0,   dominant: '#00e5cc' }, // Hero        — cyan
    { y: -8,  dominant: '#78a0ff' }, // Experiments — periwinkle
    { y: -16, dominant: '#4a5568' }, // Writing     — muted neutral
    { y: -24, dominant: '#e5a045' }, // About       — amber
    { y: -32, dominant: '#c878dc' }, // Contact     — violet
]

const PARTICLES_PER_CLUSTER = 760
const CONNECTING_PARTICLES  = 200
const CLUSTER_RADIUS         = 2.0
const CAMERA_Y_RANGE         = -32

function buildGeometryData() {
    const total     = PARTICLES_PER_CLUSTER * CLUSTERS.length + CONNECTING_PARTICLES
    const positions = new Float32Array(total * 3)
    const colors    = new Float32Array(total * 3)

    const muted = new THREE.Color('#4a5568')
    const dark  = new THREE.Color('#2d3748')

    const allColors = [
        new THREE.Color('#00e5cc'),
        new THREE.Color('#78a0ff'),
        new THREE.Color('#e5a045'),
        new THREE.Color('#c878dc'),
        muted,
    ]

    let idx = 0

    // Cluster particles — spherical distribution around each Y centre
    for (const cluster of CLUSTERS) {
        const dominant = new THREE.Color(cluster.dominant)
        for (let i = 0; i < PARTICLES_PER_CLUSTER; i++) {
            const u     = Math.random()
            const v     = Math.random()
            const theta = 2 * Math.PI * u
            const phi   = Math.acos(2 * v - 1)
            const r     = Math.cbrt(Math.random()) * CLUSTER_RADIUS

            positions[idx * 3]     = r * Math.sin(phi) * Math.cos(theta)
            positions[idx * 3 + 1] = cluster.y + r * Math.sin(phi) * Math.sin(theta)
            positions[idx * 3 + 2] = r * Math.cos(phi)

            // 40% dominant, 40% muted, 20% dark
            const roll = Math.random()
            const c    = roll < 0.4 ? dominant : roll < 0.8 ? muted : dark
            colors[idx * 3]     = c.r
            colors[idx * 3 + 1] = c.g
            colors[idx * 3 + 2] = c.b

            idx++
        }
    }

    // Connecting particles — sparse bridges between adjacent clusters
    for (let i = 0; i < CONNECTING_PARTICLES; i++) {
        const ci = Math.floor(Math.random() * (CLUSTERS.length - 1))
        const y0 = CLUSTERS[ci].y
        const y1 = CLUSTERS[ci + 1].y
        const t  = Math.random()

        positions[idx * 3]     = (Math.random() - 0.5) * CLUSTER_RADIUS * 2
        positions[idx * 3 + 1] = y0 + (y1 - y0) * t
        positions[idx * 3 + 2] = (Math.random() - 0.5) * CLUSTER_RADIUS * 2

        // Dimmed by multiplying RGB — keeps them visually subtle
        const c = allColors[Math.floor(Math.random() * allColors.length)]
        colors[idx * 3]     = c.r * 0.35
        colors[idx * 3 + 1] = c.g * 0.35
        colors[idx * 3 + 2] = c.b * 0.35

        idx++
    }

    return { positions, colors }
}

function GlobalParticleCloud({ prefersReducedMotion }) {
    const cloudRef  = useRef()
    const scrollRef = useRef(0)
    const { camera } = useThree()

    const circleTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width  = 32
        canvas.height = 32
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(16, 16, 16, 0, 2 * Math.PI)
        ctx.fillStyle = 'white'
        ctx.fill()
        return new THREE.CanvasTexture(canvas)
    }, [])

    const { positions, colors } = useMemo(buildGeometryData, [])

    useEffect(() => {
        const onScroll = () => {
            const max = document.body.scrollHeight - window.innerHeight
            scrollRef.current = max > 0 ? window.scrollY / max : 0
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useFrame((state, delta) => {
        if (!cloudRef.current || prefersReducedMotion) return

        // Slow auto-rotation of the entire cloud (same as original Hero)
        cloudRef.current.rotation.x -= delta / 15
        cloudRef.current.rotation.y -= delta / 20

        // Scroll drives camera Y — lerp to the target cluster zone
        const targetY = scrollRef.current * CAMERA_Y_RANGE
        camera.position.y += (targetY - camera.position.y) * 0.05

        // Mouse nudges camera rotation so the tilt feels local at any scroll depth
        const targetRotX = state.pointer.y * 0.15
        const targetRotY = state.pointer.x * 0.15
        camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05
        camera.rotation.y += (targetRotY - camera.rotation.y) * 0.05
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <points ref={cloudRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={colors.length / 3}
                        array={colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.015}
                    map={circleTexture}
                    alphaTest={0.01}
                    vertexColors
                    transparent
                    depthWrite={false}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

export default function ParticleBackground() {
    const [reducedMotion, setReducedMotion] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 1.2] }} dpr={[1, 2]}>
                <GlobalParticleCloud prefersReducedMotion={reducedMotion} />
            </Canvas>
        </div>
    )
}
```

- [ ] **Step 2: Start the dev server and confirm no compile errors**

```bash
npm run dev
```

Expected: Vite starts cleanly. No red errors in the terminal. The component isn't mounted yet so nothing is visible — just confirm it compiles.

---

### Task 2: Wire `ParticleBackground` into `App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with the updated version**

`Contact` renders outside `<main>` as a footer — preserve that structure, just add `<ParticleBackground />` as the first element:

```jsx
import { useEffect } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experiments from './components/Experiments'
import Writing from './components/Writing'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReducedMotion) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        )

        const sections = document.querySelectorAll('.section-animate')
        sections.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <ParticleBackground />
            <Nav />
            <main>
                <Hero />
                <Experiments />
                <Writing />
                <About />
            </main>
            <Contact />
        </>
    )
}
```

- [ ] **Step 2: Open the browser and verify the global cloud appears**

Open the URL shown in the Vite terminal output (typically `http://localhost:5173`).

Expected:
- Cyan particle cloud visible as the background behind the Hero section.
- The existing Hero canvas is also still present — two overlapping clouds is expected at this stage and will be fixed in Task 3.
- Scrolling moves the camera through the cloud: cyan → periwinkle → muted → amber → violet.
- Moving the mouse gently tilts the view.

- [ ] **Step 3: Commit**

```bash
git add src/components/ParticleBackground.jsx src/App.jsx
git commit -m "feat: add global fixed particle background with scroll-driven camera"
```

---

### Task 3: Strip canvas from `Hero.jsx` and `Hero.css`

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/Hero.css`

- [ ] **Step 1: Remove the two CSS rule blocks from `Hero.css`**

In `src/components/Hero.css`, delete the `.hero__canvas-container` block (lines 13–21) and the `.hero__vignette` block (lines 24–32). Leave everything else untouched.

The file should go from opening with `/* Hero — Full-viewport landing section */` directly to the `.hero { ... }` rule, then jump to `/* Content layer */` after the `.hero` closing brace. The result:

```css
/* ============================================
   Hero — Full-viewport landing section
   ============================================ */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}

/* Content layer — Cinematic Glassmorphism vibe */
.hero__content {
    /* ... rest of file unchanged ... */
```

- [ ] **Step 2: Replace `Hero.jsx` with the canvas-free version**

Replace the full contents of `src/components/Hero.jsx`:

```jsx
import './Hero.css'

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="container hero__content">
                <p className="hero__label">Field Notes</p>
                <p className="hero__sub">
                    Welcome to my learning lab. I'm exploring vibe coding as a creative
                    practice and building tools for understanding how data shapes Asian American
                    identity, politics, and culture.
                </p>
            </div>

            <div className="hero__scroll" aria-hidden="true">
                <span className="hero__scroll-text">Scroll</span>
                <span className="hero__scroll-line" />
            </div>
        </section>
    )
}
```

All Three.js imports (`@react-three/fiber`, `@react-three/drei`, `three`), the `ParticleCloud` function, and the `reducedMotion` state are removed — they're no longer used in Hero.

- [ ] **Step 3: Verify in the browser**

Expected:
- Hero section shows "Field Notes" label, subtitle text, and scroll indicator.
- No duplicate cloud — only the global `ParticleBackground` canvas is visible.
- The hero section background is now the dark `--color-base` from `body` in `index.css`, with the cyan cloud behind it.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css
git commit -m "refactor: remove canvas from Hero, delegate to global ParticleBackground"
```

---

### Task 4: Verify z-index layering across all sections

**Files:**
- Possibly modify: section CSS files if any have opaque backgrounds that block the cloud

- [ ] **Step 1: Scroll the full page and check each section**

Open the browser, scroll slowly from top to bottom and check each section:

| Section | Expected |
|---------|----------|
| Hero | Cyan particles visible through/around glassmorphism content card |
| Experiments | Periwinkle cloud visible in gaps around and behind project cards |
| Writing | Muted/neutral cloud visible in the section background |
| About | Amber cloud visible in the section background |
| Contact/Footer | Violet cloud visible behind footer content |

If the cloud is fully visible through all sections, skip to Step 4.

- [ ] **Step 2: Find any blocking solid backgrounds**

Run:

```bash
grep -rn "background:" src/components/*.css | grep -v "rgba\|transparent\|var(\|gradient\|#0a0a0f"
```

Any result pointing to a solid hex or named color on a section container is a candidate to fix.

- [ ] **Step 3: Make any blocking backgrounds semi-transparent**

For each blocking section container, change the solid background to either `transparent` or a low-opacity dark tint like `rgba(10, 10, 15, 0.55)`. This keeps text readable while letting the cloud show through.

Example — if `Experiments.css` has:

```css
.experiments {
    background: #0a0a0f;  /* ← opaque, blocks cloud */
}
```

Change to:

```css
.experiments {
    background: transparent;
}
```

- [ ] **Step 4: Verify Nav still appears and functions correctly**

Scroll down until the Nav gains its backdrop blur. Confirm:
- Nav text and links are visible
- Backdrop blur effect is still active
- Nav sits above the particle cloud (`z-index: 100` in Nav.css)

- [ ] **Step 5: Commit any CSS changes**

If changes were made in Step 3:

```bash
git add src/components/*.css
git commit -m "fix: make section backgrounds transparent to reveal particle cloud"
```

If no changes were needed, skip this commit.
