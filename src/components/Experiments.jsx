import { useRef } from 'react'
import './Experiments.css'

/* Placeholder experiment data */
const EXPERIMENTS = [
    {
        num: '001',
        title: 'The AAPI Grocery Index',
        desc: 'Tracking how inflation is impacting the prices of Asian foods in the U.S.',
        tag: 'Data Viz',
        tagType: 'cyan',
    },
    {
        num: '002',
        title: 'AI Finance Web',
        desc: (
            <>
                An interactive map of the intertwined AI financing ecosystem. The data is based on the article written by Rogé Karma, "Something Ominous Is Happening in the AI Economy," The Atlantic, December 10, 2025.{' '}
                <a href="https://www.theatlantic.com/economy/2025/12/nvidia-ai-financing-deals/685197/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                    Link
                </a>
            </>
        ),
        tag: 'DATA VIZ',
        tagType: 'cyan',
    },
    {
        num: '003',
        title: 'Census Pulse Dashboard (In Progress)',
        desc: 'Real-time exploration of U.S. Census Bureau microdata with dynamic filtering and geographic breakdowns.',
        tag: 'Data Viz',
        tagType: 'cyan',
    },
    {
        num: '004',
        title: 'Latent Space Gallery (In Progress)',
        desc: 'Walk through the embedding space of a vision model. Drag to navigate, click to decode — see what the machine sees.',
        tag: 'AI / Vision',
        tagType: 'amber',
    },
    {
        num: '005',
        title: 'Policy Simulator (In Progress)',
        desc: 'Agent-based model simulating the downstream effects of housing policy changes on neighborhood composition.',
        tag: 'Simulation',
        tagType: 'cyan',
    },
    {
        num: '006',
        title: 'Typographic Rhythm (In Progress)',
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            console.log(`Navigating to experiment: ${title}`)
        }
    }

    const handleClick = () => {
        console.log(`Navigating to experiment: ${title}`)
    }

    return (
        <article
            ref={cardRef}
            className="exp-card"
            onMouseMove={handleMouseMove}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
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
