import { useState, useEffect } from 'react'
import './Nav.css'

const NAV_ITEMS = [
    { label: 'Projects', href: '#experiments' },
    { label: 'Writing', href: '#writing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
]

/**
 * Nav — Minimal persistent navigation.
 * Transparent over the hero; gains backdrop-blur on scroll.
 * Collapses to a hamburger slide-in on mobile.
 */
export default function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    /* Track scroll position for header style swap */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    /* Lock body scroll when mobile menu open */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const close = () => setMobileOpen(false)

    return (
        <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
            <div className="container nav__inner">
                {/* Wordmark */}
                <a href="#" className="nav__logo" aria-label="Max's Lab home">
                    Max<span>'</span>s Lab
                </a>

                {/* Desktop links */}
                <div className="nav__links">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.href} href={item.href} className="nav__link">
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    className={`nav__toggle ${mobileOpen ? 'is-open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile overlay */}
            <div
                className={`nav__overlay ${mobileOpen ? 'is-open' : ''}`}
                onClick={close}
                aria-hidden="true"
            />

            {/* Mobile slide-in panel */}
            <div className={`nav__mobile ${mobileOpen ? 'is-open' : ''}`}>
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="nav__mobile-link"
                        onClick={close}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    )
}
