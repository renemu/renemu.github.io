import type { AboutData } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";

interface AboutSectionProps {
  about: AboutData;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <Section
      id="about"
      kicker="01 / ABOUT ME"
      title="An engineer across disciplines."
      variant="secondary"
    >
      <div id="about-container" className="about-grid">
        <div className="about-story">
          {about.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="competencies-list">
          {about.coreCompetencies.map((comp, idx) => (
            <article className="competency" key={comp.title}>
              <span className="competency-number">0{idx + 1}</span>
              <div>
                <h3>{comp.title}</h3>
                <p>{comp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
