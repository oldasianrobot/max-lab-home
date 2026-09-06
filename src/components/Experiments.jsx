import { useRef } from 'react'
import './Experiments.css'

/* Experiment data, numbered chronologically. */
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
        title: 'AAVRv01',
        desc: 'Prototype on using radiant flares.',
        tag: 'DATA VIZ',
        tagType: 'cyan',
        link: 'https://aavrv01.mleungphd.org',
    },
    {
        num: '005',
        title: 'AAVR Fluid',
        desc: 'An interactive generative art experience that renders anti-Asian hate crime data as live fluid trails — where each particle\'s color, weight, and trajectory carries the encoded record of violence, absence, and everything the data could not reach.',
        tag: 'DATA VIZ',
        tagType: 'cyan',
        link: 'https://aavr.fluid.mleungphd.org',
    },
    {
        num: '006',
        title: 'AAVR Fluidv02',
        desc: 'This is a second iteration to focus on the singular fluid trail.',
        tag: 'DATA VIZ',
        tagType: 'cyan',
        link: 'https://aavr.fluidv02.mleungphd.org',
    },
    {
        num: '007',
        title: 'AAVR Sound',
        desc: 'A two-act, scroll-free data visualization of anti-Asian hate rates in the United States, expressed through generative sound and visual composition.',
        tag: 'DATA VIZ',
        tagType: 'cyan',
        link: 'https://aavr.soundv01.mleungphd.org',
    },
    {
        num: '008',
        title: 'Voight-Kampff Empathy Unit',
        desc: 'A browser-based homage to the Voight-Kampff machine from Blade Runner. Answer three questions while the unit magnifies your eye, renders a faux-thermal scan, and performs its HUMAN or REPLICANT verdict. The analysis is pure theater — nothing is recorded.',
        tags: ['Interactive', 'Sci-Fi', 'Biometric Theater'],
        tagType: 'amber',
        link: 'https://empathy-detector.mleungphd.org',
    },
    {
        num: '009',
        title: 'Sato-Miller AAPI Identity Test',
        desc: 'A satirical auxiliary to the Voight-Kampff unit (SM-1882) that performs racial classification of Asian American identity with total confidence and zero coherence. The machine is always the butt of the joke — never the person in the chair.',
        tags: ['Interactive', 'Satire', 'AAPI Identity'],
        tagType: 'amber',
        link: 'https://sato-miller.mleungphd.org',
    },
    {
        num: '010',
        title: 'The Data Center Next Door',
        desc: <><em>The Data Center Next Door</em> is an educational simulation developed for the Critical Studies Program (Fall 2026) at the California College of the Arts. Students consider how the operation of one massive data center can affect a community over time. Set in the fictional community of Crystal Valley, the simulation follows residents through a decade of decisions concerning CCACore Industries and the social consequences of its facility.</>,
        date: '2026-09-06',
        image: '/images/data-center-next-door.jpeg',
        imageAlt: 'Crystal Valley in the simulation, with residents, mountain scenery, and the proposed data center site.',
        tags: ['Simulation', 'Social Problems', 'Data Center'],
        tagType: 'cyan',
        link: 'https://datacenter.mleungphd.org/',
    },
]

/* How many of the newest projects render in the featured band */
const FEATURED_COUNT = 1

/**
 * Projects — Featured latest project plus grid of earlier cards.
 *
 * Ordered most-recent-first (num is chronological). Each card tracks mouse
 * position for a radial-gradient hover glow effect, creating the impression
 * of a spotlight following the cursor.
 */
export default function Experiments() {
    const sorted = [...EXPERIMENTS].sort((a, b) => Number(b.num) - Number(a.num))
    const featured = sorted.slice(0, FEATURED_COUNT)
    const rest = sorted.slice(FEATURED_COUNT)

    return (
        <section className="experiments section section-animate" id="experiments">
            <div className="container">
                <p className="section-label">Projects</p>
                <div className="experiments__featured">
                    {featured.map((exp) => (
                        <ExperimentCard key={exp.num} {...exp} featured />
                    ))}
                </div>
                <div className="experiments__grid">
                    {rest.map((exp) => (
                        <ExperimentCard key={exp.num} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    )
}

/** Individual experiment card with mouse-tracking hover glow. */
function ExperimentCard({ num, title, desc, tag, tags, tagType, link, date, image, imageAlt, featured = false }) {
    const tagList = tags ?? (tag ? [tag] : [])
    const cardRef = useRef(null)
    const Card = featured ? 'a' : 'article'

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
        <Card
            ref={cardRef}
            href={featured ? link : undefined}
            target={featured ? '_blank' : undefined}
            rel={featured ? 'noopener noreferrer' : undefined}
            className={`exp-card${featured ? ' exp-card--featured' : ''}${featured && image ? ' exp-card--with-image' : ''}`}
            onMouseMove={handleMouseMove}
            onKeyDown={featured ? undefined : handleKeyDown}
            onClick={featured ? undefined : handleClick}
            tabIndex={0}
            role="link"
            aria-label={`Experiment ${num}: ${title}`}
        >
            <div className="exp-card__content">
            <span className="exp-card__num">
                {num}
                {featured && <span className="exp-card__latest">Latest</span>}
                {featured && date && <time className="exp-card__date" dateTime={date}>{date}</time>}
            </span>
            <h3 className="exp-card__title">{title}</h3>
            <p className="exp-card__desc">{desc}</p>
            <span className="exp-card__tags">
                {tagList.map((t) => (
                    <span key={t} className={`exp-card__tag ${tagType === 'amber' ? 'exp-card__tag--amber' : ''}`}>
                        {t}
                    </span>
                ))}
            </span>
            {featured ? (
                <span className="exp-card__cta">Explore simulation <span aria-hidden="true">↗</span></span>
            ) : (
                <span className="exp-card__arrow" aria-hidden="true">→</span>
            )}
            </div>
            {featured && image && (
                <img className="exp-card__image" src={image} alt={imageAlt} width="2261" height="1558" loading="lazy" />
            )}
        </Card>
    )
}
