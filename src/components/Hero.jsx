import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import './Hero.css'

/**
 * ParticleCloud component handles the 3D particles math and animation
 */
function ParticleCloud({ prefersReducedMotion }) {
    const ref = useRef()

    // Create a circular text map to replace default square particles
    const circleTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        const context = canvas.getContext('2d')
        context.beginPath()
        context.arc(16, 16, 16, 0, 2 * Math.PI)
        context.fillStyle = 'white'
        context.fill()
        return new THREE.CanvasTexture(canvas)
    }, [])

    const { positions, colors } = useMemo(() => {
        const count = 4000
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const radius = 2.0

        // Explicitly using the user's preferred colors via THREE.Color
        const palettes = [
            new THREE.Color('#00e5cc'), // Glowing Cyan
            new THREE.Color('#e5a045'), // Glowing Amber
            new THREE.Color('#78a0ff'), // Glowing Periwinkle
            new THREE.Color('#c878dc'), // Glowing Violet
            new THREE.Color('#4a5568'), // Muted starlight
            new THREE.Color('#4a5568'), // Muted starlight
            new THREE.Color('#4a5568'), // Muted starlight
            new THREE.Color('#2d3748'), // Very dark starlight
            new THREE.Color('#2d3748'), // Very dark starlight
        ]

        for (let i = 0; i < count; i++) {
            const u = Math.random()
            const v = Math.random()
            const theta = 2 * Math.PI * u
            const phi = Math.acos(2 * v - 1)
            const r = Math.cbrt(Math.random()) * radius

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = r * Math.cos(phi)

            const c = palettes[Math.floor(Math.random() * palettes.length)]
            colors[i * 3] = c.r
            colors[i * 3 + 1] = c.g
            colors[i * 3 + 2] = c.b
        }

        return { positions, colors }
    }, [])

    useFrame((state, delta) => {
        if (!ref.current || prefersReducedMotion) return

        ref.current.rotation.x -= delta / 15
        ref.current.rotation.y -= delta / 20

        const targetX = (state.pointer.x * 0.3)
        const targetY = (state.pointer.y * 0.3)

        ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.05
        ref.current.rotation.x += (-targetY - ref.current.rotation.x) * 0.05
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <points ref={ref}>
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
                    vertexColors={true}
                    transparent={true}
                    depthWrite={false}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

/**
 * Hero — Full-viewport landing section.
 *
 * Renders an Interactive 3D Particle simulation using @react-three/fiber.
 * Falls back to a beautiful static starfield when prefers-reduced-motion is set.
 */
export default function Hero() {
    const [reducedMotion, setReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mediaQuery.matches)

        const listener = (e) => setReducedMotion(e.matches)
        mediaQuery.addEventListener('change', listener)
        return () => mediaQuery.removeEventListener('change', listener)
    }, [])

    return (
        <section className="hero" id="hero">
            <div className="hero__canvas-container" aria-hidden="true">
                <Canvas camera={{ position: [0, 0, 1.2] }}>
                    <ParticleCloud prefersReducedMotion={reducedMotion} />
                </Canvas>
            </div>

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
