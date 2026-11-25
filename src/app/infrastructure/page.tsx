import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { buildInfrastructureIndexJsonLd, buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { InfrastructureCard } from "@/components/ui/InfrastructureCard";

const INFRA_TITLE =
  "Infrastructure & DevOps Case Studies | Muhammad Rifki Zulfikar";
const INFRA_DESCRIPTION =
  "Explore engineering case studies covering Linux hosting, secure networking, large file uploads, and centralized Jenkins CI/CD deployments.";

export const metadata = buildPageMetadata({
  title: INFRA_TITLE,
  description: INFRA_DESCRIPTION,
  pathname: "/infrastructure/",
  ogType: "website",
  keywords: [
    "Infrastructure Case Studies",
    "DevOps",
    "Linux Server",
    "Jenkins CI/CD",
    "Nginx Proxy Manager",
    "NetBird VPN",
    "Cloudflare Tunnel",
    "Muhammad Rifki Zulfikar",
  ],
});

export default function InfrastructurePage() {
  const infraList = portfolioData.infrastructure;

  return (
    <>
      <JsonLd
        data={buildInfrastructureIndexJsonLd(INFRA_TITLE, INFRA_DESCRIPTION)}
      />

      <header className="infra-hero">
        <div className="site-container">
          <Link className="infra-back" href="/">
            ← Back to portfolio
          </Link>
          <p className="section-kicker">BEHIND THE APPLICATIONS</p>
          <h1>
            Infrastructure
            <br />
            <span>&amp; DevOps.</span>
          </h1>
          <p className="infra-intro">
            Systems, deployment workflows, and infrastructure architectures I
            designed to solve real operational problems.
          </p>
          <div className="infra-hero-bottom">
            <span>{infraList.length} ENGINEERING CASE STUDIES</span>
            <span>LINUX / NETWORKING / CI/CD</span>
          </div>
        </div>
      </header>

      <section
        className="infra-index-section"
        aria-label="Infrastructure case studies"
      >
        <div className="site-container">
          <div className="infra-grid">
            {infraList.map((item, idx) => (
              <InfrastructureCard
                key={item.slug}
                item={item}
                index={idx}
                headingAs="h2"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
