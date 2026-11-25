import type { ExperienceItem } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <Section
      id="experience"
      kicker="02 / EXPERIENCE"
      title="Where I’ve put ideas into practice."
      variant="primary"
    >
      <ol id="experience-container" className="timeline">
        {experience.map((exp) => (
          <li
            key={`${exp.company}-${exp.title}`}
            className="timeline-item"
          >
            <span className="timeline-dot" aria-hidden="true" />
            <h3 className="timeline-role">{exp.title}</h3>
            <p className="timeline-company">
              {exp.company} &middot; {exp.type}
            </p>
            <p className="timeline-meta">
              <span>
                <i className="fas fa-calendar-alt" aria-hidden="true" />
                <time>{exp.date}</time>
              </span>
              <span>
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                {exp.location}
              </span>
            </p>
            <p className="timeline-desc">{exp.description}</p>
            <p className="timeline-skills">
              <strong>Skills:</strong> {exp.skills}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
