import './About.css'

/**
 * About — Studio context and mission.
 *
 * Split layout: humanist prose on the left, abstract architectural
 * SVG element on the right. Restrained and structural.
 */
export default function About() {
    return (
        <section className="about section section-animate" id="about">
            <div className="container">
                <p className="section-label">About</p>
                <div className="about__layout">
                    {/* Text */}
                    <div className="about__text">
                        <h2 className="about__heading">
                            A quiet space for<br />
                            building and thinking.
                        </h2>
                        <p className="about__body">
                            Max's Lab is a learning lab. It's where I experiment with vibe coding
                            as a creative practice and build tools for thinking about the present,
                            especially where data meets Asian American politics and culture.
                        </p>
                        <p className="about__body">
                            My work lives between AI, social science, and design. I'm drawn to
                            questions of visibility and meaning: how systems shape identity, how
                            interfaces frame experience, and how people encounter the technologies
                            that increasingly organize everyday life.
                        </p>
                        <p className="about__body">
                            There are no products here. Just fieldwork in code, data, and culture.
                        </p>
                    </div>

                    {/* Architectural SVG */}
                    <div className="about__visual">
                        <svg
                            className="about__svg"
                            viewBox="0 0 400 400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            {/* Structural grid lines */}
                            {Array.from({ length: 9 }).map((_, i) => (
                                <line
                                    key={`v-${i}`}
                                    x1={44 * (i + 1)}
                                    y1={20}
                                    x2={44 * (i + 1)}
                                    y2={380}
                                    stroke="rgba(0, 229, 204, 0.22)"
                                    strokeWidth="0.5"
                                />
                            ))}
                            {Array.from({ length: 9 }).map((_, i) => (
                                <line
                                    key={`h-${i}`}
                                    x1={20}
                                    y1={44 * (i + 1)}
                                    x2={380}
                                    y2={44 * (i + 1)}
                                    stroke="rgba(0, 229, 204, 0.16)"
                                    strokeWidth="0.5"
                                />
                            ))}

                            {/* Orbiting morphing squares */}
                            <g className="about__orbit about__orbit--1">
                                <rect className="about__square about__square--1"
                                    x="110" y="100" width="100" height="100"
                                    stroke="rgba(0, 229, 204, 0.4)" strokeWidth="1.5" fill="none" />
                            </g>
                            <g className="about__orbit about__orbit--2">
                                <rect className="about__square about__square--2"
                                    x="210" y="190" width="110" height="110"
                                    stroke="rgba(0, 229, 204, 0.3)" strokeWidth="1.5" fill="none" />
                            </g>
                            <g className="about__orbit about__orbit--3">
                                <rect className="about__square about__square--3"
                                    x="50" y="230" width="80" height="80"
                                    stroke="rgba(229, 160, 69, 0.3)" strokeWidth="1.5" fill="none" />
                            </g>

                            {/* Accent diagonals */}
                            <line x1="88" y1="88" x2="220" y2="176" stroke="rgba(0, 229, 204, 0.3)" strokeWidth="0.75" />
                            <line x1="308" y1="176" x2="176" y2="308" stroke="rgba(229, 160, 69, 0.2)" strokeWidth="0.75" />

                            {/* Data nodes */}
                            <circle cx="88" cy="88" r="4" fill="rgba(0, 229, 204, 0.6)" />
                            <circle cx="220" cy="176" r="4" fill="rgba(0, 229, 204, 0.6)" />
                            <circle cx="308" cy="308" r="3.5" fill="rgba(0, 229, 204, 0.45)" />
                            <circle cx="176" cy="308" r="3.5" fill="rgba(229, 160, 69, 0.5)" />
                            <circle cx="44" cy="220" r="3.5" fill="rgba(229, 160, 69, 0.45)" />

                            {/* Center crosshair */}
                            <line x1="200" y1="185" x2="200" y2="215" stroke="rgba(0, 229, 204, 0.45)" strokeWidth="0.75" />
                            <line x1="185" y1="200" x2="215" y2="200" stroke="rgba(0, 229, 204, 0.45)" strokeWidth="0.75" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}
