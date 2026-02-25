import './Writing.css'

/* Placeholder writing data */
const FEATURED = {
    title: 'The Legibility Problem: When Data Visualization Obscures More Than It Reveals',
    excerpt:
        'Most dashboards are designed to confirm what we already know. A closer look at how encoding choices in data visualization can systematically hide the signals that matter most — especially in social science research where context is everything.',
    date: 'Feb 2026',
    readTime: '14 min read',
    topic: 'Research',
}

const ARTICLES = [
    {
        title: 'Embedding Neighborhoods: What Latent Space Tells Us About Urban Identity',
        date: 'Jan 2026',
        readTime: '9 min',
        tag: 'AI + Urban',
    },
    {
        title: 'Against Frictionless Design',
        date: 'Dec 2025',
        readTime: '6 min',
        tag: 'Essay',
    },
    {
        title: 'Notes on Building in Public as a Researcher',
        date: 'Nov 2025',
        readTime: '4 min',
        tag: 'Process',
    },
    {
        title: 'Price Signals: What Grocery Data Reveals About Community Change',
        date: 'Oct 2025',
        readTime: '11 min',
        tag: 'Data',
    },
]

/**
 * Writing — Research & essays section.
 *
 * Two-column editorial layout: featured essay (large) on the left,
 * recent article list on the right. Serif typography throughout
 * to reinforce the long-form, magazine feel.
 */
export default function Writing() {
    return (
        <section className="writing section section-animate" id="writing">
            <div className="container">
                <p className="section-label">Writing &amp; Research</p>
                <div className="writing__layout">
                    {/* Featured piece */}
                    <a href="#" className="writing__featured">
                        <span className="writing__featured-label">Featured</span>
                        <h3 className="writing__featured-title">{FEATURED.title}</h3>
                        <p className="writing__featured-excerpt">{FEATURED.excerpt}</p>
                        <p className="writing__featured-meta">
                            {FEATURED.date}
                            <span>·</span>
                            {FEATURED.readTime}
                            <span>·</span>
                            {FEATURED.topic}
                        </p>
                    </a>

                    {/* Recent list */}
                    <div className="writing__list">
                        {ARTICLES.map((a, i) => (
                            <a href="#" className="writing__item" key={i}>
                                <h4 className="writing__item-title">{a.title}</h4>
                                <div className="writing__item-meta">
                                    <span>{a.date}</span>
                                    <span style={{ opacity: 0.3 }}>·</span>
                                    <span>{a.readTime}</span>
                                    <span className="writing__item-tag">{a.tag}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
