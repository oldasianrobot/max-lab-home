import { useRef, useEffect } from 'react'
import './Hero.css'

/**
 * Hero — Full-viewport landing section.
 *
 * Renders a clean chart-style grid on a <canvas> with multicolored
 * data nodes that gently pulse and drift — evoking a living scatter plot.
 * Falls back to a static single frame when prefers-reduced-motion is set.
 */
export default function Hero() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animId
        let running = true

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        /* --- Resize handler --- */
        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = canvas.offsetWidth * dpr
            canvas.height = canvas.offsetHeight * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        window.addEventListener('resize', resize)

        /* --- Grid line definitions --- */
        const W = () => canvas.offsetWidth
        const H = () => canvas.offsetHeight

        /**
         * Draw the architectural structural grid.
         * Lines slowly drift vertically and horizontally to create
         * a living blueprint feel.
         */
        const draw = (time) => {
            const w = W()
            const h = H()
            ctx.clearRect(0, 0, w, h)

            const t = time * 0.0001 // slow time factor

            // --- Vertical lines (building columns) ---
            const colCount = Math.floor(w / 80)
            for (let i = 0; i <= colCount; i++) {
                const baseX = (i / colCount) * w
                const drift = Math.sin(t + i * 0.7) * 6
                const x = baseX + drift

                // Main structural line
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, h)
                ctx.strokeStyle = `rgba(0, 229, 204, ${0.20 + Math.sin(t + i) * 0.06})`
                ctx.lineWidth = 1
                ctx.stroke()
            }

            // --- Horizontal scan lines ---
            const rowCount = Math.floor(h / 100)
            for (let j = 0; j <= rowCount; j++) {
                const baseY = (j / rowCount) * h
                const drift = Math.cos(t * 0.8 + j * 0.5) * 4
                const y = baseY + drift

                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.strokeStyle = `rgba(0, 229, 204, ${0.15 + Math.sin(t + j * 1.2) * 0.05})`
                ctx.lineWidth = 1
                ctx.stroke()
            }

            // --- Floating data nodes ---
            // Golden-ratio spacing creates a natural upward scatter trend
            const nodeColors = [
                { r: 0, g: 229, b: 204 },   // cyan
                { r: 229, g: 160, b: 69 },   // amber
                { r: 120, g: 160, b: 255 },   // periwinkle
                { r: 0, g: 229, b: 204 },   // cyan
                { r: 200, g: 120, b: 220 },   // soft violet
                { r: 229, g: 160, b: 69 },   // amber
                { r: 100, g: 220, b: 180 },   // seafoam
                { r: 229, g: 120, b: 140 },   // rose
                { r: 120, g: 160, b: 255 },   // periwinkle
                { r: 0, g: 229, b: 204 },   // cyan
                { r: 200, g: 120, b: 220 },   // soft violet
                { r: 229, g: 160, b: 69 },   // amber
            ]
            const nodeCount = 12
            for (let k = 0; k < nodeCount; k++) {
                let nx = w * (0.15 + 0.75 * ((k * 0.618) % 1))
                let ny = h * (0.1 + 0.8 * ((k * 0.382) % 1))

                // Nudge just past text edge while keeping upward trend
                if (k === 4) nx = w * 0.54   // violet — barely right of text
                if (k === 7) nx = w * 0.42   // rose — below "politics"

                const pulse = Math.sin(t * 2 + k * 1.5) * 0.5 + 0.5
                const coreSize = 4 + pulse * 4
                const cx = nx + Math.sin(t + k) * 10
                const cy = ny + Math.cos(t * 0.7 + k) * 10

                const { r, g, b } = nodeColors[k]

                // Outer soft glow halo
                const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 3)
                glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.15 + pulse * 0.1})`)
                glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
                ctx.beginPath()
                ctx.arc(cx, cy, coreSize * 3, 0, Math.PI * 2)
                ctx.fillStyle = glow
                ctx.fill()

                // Solid core
                ctx.beginPath()
                ctx.arc(cx, cy, coreSize, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 + pulse * 0.3})`
                ctx.fill()
            }
        }

        /* --- Animation loop --- */
        if (prefersReducedMotion) {
            // Draw a single static frame
            draw(1000)
        } else {
            const loop = (time) => {
                if (!running) return
                draw(time)
                animId = requestAnimationFrame(loop)
            }
            animId = requestAnimationFrame(loop)
        }

        return () => {
            running = false
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <section className="hero" id="hero">
            <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
            <div className="hero__vignette" />
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
