import Link from "next/link";
import type { InfrastructureCaseStudy } from "@/types/portfolio";

interface InfrastructureCardProps {
  item: InfrastructureCaseStudy;
  index: number;
  maxTags?: number;
  headingAs?: "h2" | "h3";
}

export function InfrastructureCard({
  item,
  index,
  maxTags,
  headingAs = "h3",
}: InfrastructureCardProps) {
  const visibleTags = maxTags
    ? item.technologies.slice(0, maxTags)
    : item.technologies;
  const hiddenCount = maxTags
    ? Math.max(0, item.technologies.length - maxTags)
    : 0;

  const Heading = headingAs;

  return (
    <article className="infra-card">
      <div className="infra-card-top">
        <span className="section-kicker">CASE STUDY / 0{index + 1}</span>
        <i className="fas fa-server" aria-hidden="true" />
      </div>

      <p className="infra-category">{item.category}</p>
      <Heading className="infra-card-title">{item.title}</Heading>
      <p className="infra-card-summary">{item.summary}</p>

      <ul className="infra-tags" aria-label="Technologies">
        {visibleTags.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
        {hiddenCount > 0 && <li>+{hiddenCount} more</li>}
      </ul>

      <Link
        className="infra-card-link"
        href={`/infrastructure/${item.slug}/`}
      >
        <span>Explore case study</span>
        <span aria-hidden="true">↗</span>
        <span className="visually-hidden">: {item.title}</span>
      </Link>
    </article>
  );
}
