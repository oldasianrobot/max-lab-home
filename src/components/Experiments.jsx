import { useRef } from 'react'
import './Experiments.css'

/* Placeholder experiment data */
const EXPERIMENTS = [
    {
        num: '001',
        title: 'Asian Foods Inflation Tracker',
        desc: 'Interactive visualization of price trends across U.S. metro areas, mapping inflation data against demographic patterns.',
        tag: 'Data Viz',
        tagType: 'cyan',
    },
    {
        num: '002',
        title: 'Narrative Drift Engine',
        desc: 'An experimental text generator that models how stories diverge across retellings using transformer attention maps.',
        tag: 'AI / NLP',
        tagType: 'amber',
    },
    {
        num: '003',
        title: 'Census Pulse Dashboard',
        desc: 'Real-time exploration of U.S. Census Bureau microdata with dynamic filtering and geographic breakdowns.',
        tag: 'Data Viz',
        tagType: 'cyan',
    },
    {
        num: '004',
        title: 'Latent Space Gallery',
        desc: 'Walk through the embedding space of a vision model. Drag to navigate, click to decode — see what the machine sees.',
        tag: 'AI / Vision',
        tagType: 'amber',
    },
    {
        num: '005',
        title: 'Policy Simulator',
        desc: 'Agent-based model simulating the downstream effects of housing policy changes on neighborhood composition.',
        tag: 'Simulation',
        tagType: 'cyan',
    },
    {
        num: '006',
        title: 'Typographic Rhythm',
        desc: 'A study in motion typography — letterforms responding to audio input in real time using the Web Audio API.',
        tag: 'Creative',
        tagType: 'amber',
    },
]

/**
 * Projects — Grid of project cards.
 *
 * Each card tracks mouse position for a radial-gradient hover glow effect,
 * creating the impression of a spotlight following the cursor.
 */
export default function Experiments() {
    return (
        <section className="experiments section section-animate" id="experiments">
            <div className="container">
                <p className="section-label">Projects</p>
                <div className="experiments__grid">
                    {EXPERIMENTS.map((exp) => (
                        <ExperimentCard key={exp.num} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    )
}

/** Individual experiment card with mouse-tracking hover glow. */
function ExperimentCard({ num, title, desc, tag, tagType }) {
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect()
        cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }

    return (
        <article
            ref={cardRef}
            className="exp-card"
            onMouseMove={handleMouseMove}
            tabIndex={0}
            role="link"
            aria-label={`Experiment ${num}: ${title}`}
        >
            <span className="exp-card__num">{num}</span>
            <h3 className="exp-card__title">{title}</h3>
            <p className="exp-card__desc">{desc}</p>
            <span className={`exp-card__tag ${tagType === 'amber' ? 'exp-card__tag--amber' : ''}`}>
                {tag}
            </span>
            <span className="exp-card__arrow" aria-hidden="true">→</span>
        </article>
    )
}
