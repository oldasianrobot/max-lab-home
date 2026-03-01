import './Contact.css'

const SOCIAL_LINKS = [
    { label: 'GitHub', href: 'https://github.com/oldasianrobot' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maxwell-leung-24422a43/' },
    { label: 'Faculty Webpage', href: 'https://portal.cca.edu/people/mleung/' },
]

/**
 * Contact — Footer section.
 *
 * Email CTA, social links, and colophon.
 * Grid-aligned, minimal, architectural.
 */
export default function Contact() {
    return (
        <footer className="contact section-animate" id="contact">
            <div className="container contact__inner">
                {/* Left — CTA */}
                <div>
                    <h2 className="contact__heading">Contact:</h2>
                    <p className="contact__body">
                        I occasionally share work on social platforms. For general
                        inquiries, email is best.
                    </p>
                    <a href="mailto:hello@mleungphd.org" className="contact__email">
                        <span>hello@mleungphd.org</span>
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>

                {/* Right — Social links */}
                <div className="contact__links">
                    <span className="contact__link-label">Elsewhere</span>
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="contact__link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.label}
                            <span className="contact__link-arrow" aria-hidden="true">→</span>
                        </a>
                    ))}
                </div>

                {/* Colophon */}
                <div className="contact__colophon">
                    <p className="contact__colophon-text">
                        Built by <span>Maxwell Leung, Ph.D.</span> · 2026
                    </p>
                    <p className="contact__colophon-text">
                        Designed with intention.
                    </p>
                </div>
            </div>
        </footer>
    )
}
