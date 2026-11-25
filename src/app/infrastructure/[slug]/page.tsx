import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInfrastructureBySlug, portfolioData } from "@/data/portfolio";
import { buildCaseStudyJsonLd, buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioData.infrastructure.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getInfrastructureBySlug(slug);
  if (!item) return {};

  return buildPageMetadata({
    title: `${item.title} | Muhammad Rifki Zulfikar`,
    description: item.summary,
    pathname: `/infrastructure/${item.slug}/`,
    ogType: "article",
    keywords: [item.title, item.category, ...item.technologies],
  });
}

interface CaseSection {
  id: string;
  title: string;
  isResults?: boolean;
  content: React.ReactNode;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const infraList = portfolioData.infrastructure;
  const index = infraList.findIndex((item) => item.slug === slug);

  if (index === -1) {
    notFound();
  }

  const item = infraList[index];
  const next = infraList[(index + 1) % infraList.length];
  const pageTitle = `${item.title} | Muhammad Rifki Zulfikar`;

  const sections: CaseSection[] = [
    {
      id: "overview",
      title: "Overview",
      content: <p>{item.overview}</p>,
    },
    {
      id: "challenge",
      title: "The challenge",
      content: (
        <ul>
          {item.challenge.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "solution",
      title: "Engineering decisions",
      content: (
        <ul>
          {item.solution.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ),
    },
  ];

  if (item.architecture) {
    sections.push({
      id: "architecture",
      title: "System architecture",
      content: (
        <ol className="arch-diagram">
          {item.architecture.desktop.map((node) => {
            const lines = node.split("\n");
            return (
              <li className="arch-node" key={node}>
                {lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < lines.length - 1 && <br />}
                  </span>
                ))}
              </li>
            );
          })}
        </ol>
      ),
    });
  }

  sections.push(
    {
      id: "implementation",
      title: "Implementation & responsibilities",
      content: (
        <ul>
          {item.responsibilities.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "results",
      title: "Results & impact",
      isResults: true,
      content: (
        <ul>
          {item.result.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ),
    }
  );

  if (item.futureImprovements && item.futureImprovements.length > 0) {
    sections.push({
      id: "next-steps",
      title: "Next steps",
      content: (
        <ul>
          {item.futureImprovements.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <>
      <JsonLd data={buildCaseStudyJsonLd(item, pageTitle)} />

      <header className="infra-hero">
        <div className="site-container">
          <Link className="infra-back" href="/infrastructure/">
            ← All case studies
          </Link>
          <p className="section-kicker">
            CASE STUDY / 0{index + 1} — {item.category}
          </p>
          <h1>{item.title}</h1>
          <p className="infra-intro">{item.summary}</p>
          <ul className="infra-tags" aria-label="Technologies">
            {item.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="site-container case-layout">
        <aside className="case-sidebar">
          <nav aria-label="On this page">
            <p className="section-kicker">ON THIS PAGE</p>
            <ul className="case-toc-list">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>0{i + 1}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="case-article">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className={`case-section${section.isResults ? " case-results" : ""}`}
            >
              <p className="section-kicker">
                0{i + 1} / {section.id.toUpperCase()}
              </p>
              <h2 id={`${section.id}-heading`}>{section.title}</h2>
              {section.content}
            </section>
          ))}

          <Link className="next-case" href={`/infrastructure/${next.slug}/`}>
            <span>EXPLORE NEXT</span>
            <strong>{next.title} ↗</strong>
          </Link>
        </article>
      </div>
    </>
  );
}
