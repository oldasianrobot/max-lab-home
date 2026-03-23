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
        link: 'https://inflation.mleungphd.org',
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
        link: 'https://aifinance.mleungphd.org',
    },
    {
        num: '003',
        title: 'Disturbance Fields',
        desc: 'Analyzing anti-Asian violence in San Francisco (2019–2022) through demographic saturation and incident reporting density.',
        tag: 'Data Viz',
        tagType: 'cyan',
        link: 'https://disturbance.mleungphd.org',
    },
    {
        num: '004',
        title: 'This Is Not A Gap',
        desc: 'Prototype on using radiant flares.',
        tag: 'DATA VIZ',
        tagType: 'cyan',
        link: 'https://tinag-proto.mleungphd.org',
    },
    {
        num: '005',
        title: 'This Is Not A Gap: Fluid Record',
        desc: 'An interactive generative art experience that renders anti-Asian hate crime data as live fluid trails — where each particle\'s color, weight, and trajectory carries the encoded record of violence, absence, and everything the data could not reach.',
        tag: 'DATA VIZ',
        tagType: 'cyan',
        link: 'https://tinag-fluid.mleungphd.org',
    },
    {
        num: '006',
        title: 'This Is Not A Gap: Fluid V02',
        desc: 'This is a second iteration to focus on the singular fluid trail.',
        tag: 'DATA VIZ',
        tagType: 'cyan',
        link: 'https://tinag-fluidv02.mleungphd.org',
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
function ExperimentCard({ num, title, desc, tag, tagType, link }) {
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect()
        cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (link) {
                window.open(link, '_blank', 'noopener,noreferrer')
            } else {
                console.log(`Navigating to experiment: ${title}`)
            }
        }
    }

    const handleClick = () => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer')
        } else {
            console.log(`Navigating to experiment: ${title}`)
        }
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
