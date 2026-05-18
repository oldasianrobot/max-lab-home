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
