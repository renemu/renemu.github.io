import type { TechStackItem } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

export function TechStackSection({ techStack }: TechStackSectionProps) {
  return (
    <Section
      id="tech-stack"
      kicker="05 / TECH STACK"
      title="The tools behind the work."
      variant="secondary"
    >
      <ul
        id="tech-stack-container"
        className="tech-stack-list"
        aria-label="Technologies and tools"
      >
        {techStack.map((tech) => (
          <li key={tech.name} className="tech-badge">
            {tech.icon && <i className={tech.icon} aria-hidden="true" />}
            <span>{tech.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
