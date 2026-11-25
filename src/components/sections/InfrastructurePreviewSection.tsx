import Link from "next/link";
import type { InfrastructureCaseStudy } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";
import { InfrastructureCard } from "@/components/ui/InfrastructureCard";

interface InfrastructurePreviewSectionProps {
  items: InfrastructureCaseStudy[];
}

export function InfrastructurePreviewSection({
  items,
}: InfrastructurePreviewSectionProps) {
  const previewList = items.slice(0, 3);

  return (
    <Section
      id="infrastructure"
      kicker="04 / INFRASTRUCTURE & DEVOPS"
      title="Beyond the application layer."
      lead="Real-world infrastructure and deployment challenges I solved across Linux servers, CI/CD, networking, VPNs, reverse proxies, and self-hosted environments."
      variant="primary"
    >
      <div id="infrastructure-container" className="infra-grid">
        {previewList.map((item, idx) => (
          <InfrastructureCard
            key={item.slug}
            item={item}
            index={idx}
            maxTags={5}
            headingAs="h3"
          />
        ))}
      </div>

      <div className="section-cta">
        <Link href="/infrastructure/" className="btn-outline-accent">
          View All Case Studies <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
