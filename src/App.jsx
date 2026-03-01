import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experiments from './components/Experiments'
import Writing from './components/Writing'
import About from './components/About'
import Contact from './components/Contact'

/**
 * App — Root shell for Max's Lab.
 * Composes all page sections vertically and manages
 * IntersectionObserver-based scroll reveal.
 */
export default function App() {
    /* Scroll-triggered section fade-in */
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
            <Nav />
            <main>
                <Hero />
                <Experiments />
                <Writing />
                <About />
            </main>
            <Contact />
            <Analytics />
        </>
    )
}
