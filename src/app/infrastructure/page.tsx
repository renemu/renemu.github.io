import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { buildInfrastructureIndexJsonLd, buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const INFRA_TITLE =
  "Infrastructure & DevOps Case Studies | Muhammad Rifki Zulfikar";
const INFRA_DESCRIPTION =
  "Explore engineering case studies covering Linux hosting, secure networking, large file uploads, and centralized Jenkins CI/CD deployments.";

export const metadata = buildPageMetadata({
  title: INFRA_TITLE,
  description: INFRA_DESCRIPTION,
  pathname: "/infrastructure/",
  ogType: "website",
});

export default function InfrastructurePage() {
  const infraList = portfolioData.infrastructure;

  return (
    <>
      <JsonLd
        data={buildInfrastructureIndexJsonLd(INFRA_TITLE, INFRA_DESCRIPTION)}
      />

      <header className="infra-hero">
        <div className="container">
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

      <div className="container infra-grid">
        {infraList.map((item, i) => (
          <article className="infra-card" key={item.slug}>
            <div className="infra-card-top">
              <span className="section-kicker">CASE STUDY / 0{i + 1}</span>
              <i className="fas fa-server" aria-hidden="true" />
            </div>
            <p className="infra-category">{item.category}</p>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="infra-tags">
              {item.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <Link
              className="infra-card-link"
              href={`/infrastructure/${item.slug}/`}
            >
              Explore case study <span aria-hidden="true">↗</span>
              <span className="visually-hidden">: {item.title}</span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
