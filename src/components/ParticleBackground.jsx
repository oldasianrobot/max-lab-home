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
const CAMERA_Y_RANGE = CLUSTERS[CLUSTERS.length - 1].y

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
        if (!cloudRef.current) return

        // Scroll drives camera Y — always runs (user-initiated, not gratuitous animation)
        const targetY = scrollRef.current * CAMERA_Y_RANGE
        camera.position.y += (targetY - camera.position.y) * 0.05

        if (prefersReducedMotion) return

        // Auto-rotation (Z only — keeps clusters aligned along Y axis)
        cloudRef.current.rotation.z -= delta / 20

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
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 1.2] }} dpr={[1, 2]}>
                <GlobalParticleCloud prefersReducedMotion={reducedMotion} />
            </Canvas>
        </div>
    )
}
