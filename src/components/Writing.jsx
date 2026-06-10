import './Writing.css'

/* Writing & research pieces, newest first */
const WRITINGS = [
    {
        title: 'Seeing Through Data: A Critical Review of Stop AAPI Hate’s Visual Design Strategies',
        subtitle: 'This article examines the challenges of representing anti-Asian violence through data visualization, focusing on Stop AAPI Hate’s Reporting Data Center. This site has become an important influence on national discourse and policy. However, its conventional presentation methods often reduce the experiences of community members to data points, bar graphs, and charts. I argue that data visualization can move beyond reductive formats and instead embrace nuance, multiplicity, and emotional resonance. Drawing insight from Mapping Islamophobia, Visualizing Palestine, and Periscopic, the article calls for dynamic, empathetic visual strategies that deepen our understanding of affected communities.',
        date: 'Feb 2026',
        link: 'https://www.tandfonline.com/doi/full/10.1080/00447471.2025.2595899?af=R',
    },
    {
        title: 'Points of Departure: Re-Examining the Discursive Formation of the Hate Crime Statistics Act of 1990',
        subtitle: 'This article re-examines the political and legislative history of the debates that led up to the passage of the 1990 Hate Crime Statistics Act, in particular the 1980 House committee hearing on Increasing Violence against Minorities and a 1983 U.S. Commission on Civil Rights report entitled Intimidation and Violence: Racial and Religious Bigotry in America. Both identify organized white supremacy as the cause of the nation’s epidemic of racial intimidation and violent bigotry in the late 1970s and early 1980s. Many significant recommendations were made, but data collection became the first piece of legislation to address the national problem of hate violence. Leung seeks to explain why. By analysing the relationship between committee hearings, the key report and the political context of the Reagan administration, he demonstrates how ‘hate crime’ became an object of knowledge, and how its definition had implications for policy development.',
        date: 'Jan 2018',
        link: 'https://www.tandfonline.com/doi/abs/10.1080/0031322X.2018.1429357',
    },
    {
        title: "Jeremy Lin's Model Minority Problem",
        subtitle: "In 2012, an Asian American, Ivy-League educated basketball player captured the country's attention: what was it that made Jeremy Lin so exceptional, from his race to his physical and mental prowess to his athletic masculinity. In short: what led to the rise and fall of Linsanity? Will it have a legacy?",
        date: 'Aug 2013',
        link: 'https://journals.sagepub.com/doi/10.1177/1536504213499879',
    }
]

/**
 * Writing — Research & essays section.
 *
 * Single chronological timeline, newest first: a prominent date column
 * beside each serif title and abstract. Serif typography throughout
 * to reinforce the long-form, magazine feel.
 */
export default function Writing() {
    return (
        <section className="writing section section-animate" id="writing">
            <div className="container">
                <p className="section-label">Writing &amp; Research</p>
                <div className="writing__list">
                    {WRITINGS.map((w, i) => (
                        <a href={w.link} target="_blank" rel="noreferrer" className="writing__item" key={i}>
                            <span className="writing__item-date">{w.date}</span>
                            <div className="writing__item-body">
                                <h3 className="writing__item-title">{w.title}</h3>
                                <p className="writing__item-excerpt">{w.subtitle}</p>
                            </div>
                            <span className="writing__item-arrow" aria-hidden="true">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
