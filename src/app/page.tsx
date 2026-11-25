import Link from "next/link";
import { portfolioData, SITE_CONFIG } from "@/data/portfolio";
import { buildHomeJsonLd, buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ProjectsSection } from "@/components/ProjectsSection";

const HOME_TITLE =
  "Muhammad Rifki Zulfikar | Software Engineer & Fullstack Developer";
const HOME_DESCRIPTION =
  "Explore Muhammad Rifki Zulfikar’s portfolio: fullstack web applications, IoT systems, Linux infrastructure, Docker deployments, and CI/CD engineering.";

export const metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  pathname: "/",
  ogType: "website",
});

export default function HomePage() {
  const { about, experience, projects, infrastructure, techStack } =
    portfolioData;
  const infraPreview = infrastructure.slice(0, 3);

  return (
    <>
      <JsonLd data={buildHomeJsonLd(HOME_TITLE, HOME_DESCRIPTION)} />

      {/* Hero Section */}
      <section className="jumbotron">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> SOFTWARE ENGINEER | FULLSTACK DEVELOPER &amp; IOT &amp;
              DEVOPS &amp; INFRASTRUCTURE
            </p>
            <h1 className="hero-title">
              Muhammad
              <br />
              Rifki <span>Zulfikar.</span>
            </h1>
            <p className="hero-intro">
              From ideas to interfaces.
              <br />
              From code to connected systems.
            </p>
            <p className="hero-description">
              Fullstack developer working across web applications, IoT, and
              infrastructure. Building thoughtful software and the systems that
              keep it running.
            </p>
            <div className="hero-actions">
              <a href="#project" className="action-primary">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="action-secondary"
              >
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-socials">
              <span>FIND ME ON</span>
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="hero-portrait">
            <div className="portrait-topline">
              <span>THE PERSON BEHIND THE CODE</span>
              <span>01 /</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE_CONFIG.portraitPath}
              alt={SITE_CONFIG.name}
              width={640}
              height={720}
              fetchPriority="high"
            />
            <div className="portrait-caption">
              <div>
                <strong>Tech Enthusiast</strong>
                <span>Software · Hardware · Infrastructure</span>
              </div>
              <span className="portrait-symbol" aria-hidden="true">
                ↗
              </span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="hero-bottom">
            <span>FULLSTACK DEVELOPMENT</span>
            <span>IoT &amp; CONTROL SYSTEMS</span>
            <span>DEVOPS &amp; INFRASTRUCTURE</span>
            <a href="#about">SCROLL TO EXPLORE ↓</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <p className="section-kicker">01 / ABOUT ME</p>
              <h2 className="section-title">An engineer across disciplines.</h2>
              <div className="title-underline" />
            </div>
          </div>
          <div id="about-container" className="row justify-content-center">
            <div className="col-lg-6 about-story">
              {about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="col-lg-6 competencies">
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
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        style={{
          background: "var(--bg-primary)",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          position: "relative",
        }}
      >
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <p className="section-kicker">02 / EXPERIENCE</p>
              <h2 className="section-title">
                Where I’ve put ideas into practice.
              </h2>
              <div className="title-underline" />
            </div>
          </div>
          <div id="experience-container" className="row justify-content-center">
            <div className="col-md-10">
              <div
                className="timeline"
                style={{
                  borderLeft: "2px solid var(--accent-color)",
                  paddingLeft: "2rem",
                  marginLeft: "1rem",
                }}
              >
                {experience.map((exp, index) => {
                  const isLast = index === experience.length - 1;
                  return (
                    <div
                      key={`${exp.company}-${exp.title}`}
                      className={`timeline-item mb-${isLast ? "4" : "5"}`}
                      style={{ position: "relative" }}
                    >
                      <span
                        className="timeline-icon"
                        style={{
                          position: "absolute",
                          left: "-2.35rem",
                          top: "0.3rem",
                          background: "var(--accent-color)",
                          color: "white",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                        }}
                      />
                      <h4 className="fw-bold mb-1">{exp.title}</h4>
                      <h5 className="text-muted mb-2">
                        {exp.company} &middot; {exp.type}
                      </h5>
                      <p className="small text-muted mb-3">
                        <i
                          className="fas fa-calendar-alt me-2"
                          aria-hidden="true"
                        />
                        {exp.date} &nbsp;|&nbsp;{" "}
                        <i
                          className="fas fa-map-marker-alt me-2"
                          aria-hidden="true"
                        />
                        {exp.location}
                      </p>
                      <p>{exp.description}</p>
                      <p className="small text-muted mt-2">
                        <strong>Skills:</strong> {exp.skills}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Infrastructure Section */}
      <section
        id="infrastructure"
        style={{
          background: "var(--bg-primary)",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          position: "relative",
        }}
      >
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col">
              <p className="section-kicker">04 / INFRASTRUCTURE &amp; DEVOPS</p>
              <h2 className="section-title">Beyond the application layer.</h2>
              <div className="title-underline" />
              <p className="mt-4 text-muted mx-auto" style={{ maxWidth: "700px" }}>
                Real-world infrastructure and deployment challenges I solved
                across Linux servers, CI/CD, networking, VPNs, reverse proxies,
                and self-hosted environments.
              </p>
            </div>
          </div>

          <div
            id="infrastructure-container"
            className="row justify-content-center"
          >
            {infraPreview.map((item) => (
              <div className="col-lg-10 mb-4" key={item.slug}>
                <div
                  className="project-card d-flex flex-column"
                  style={{
                    padding: "2rem",
                    background: "var(--bg-card)",
                    borderLeft: "4px solid var(--accent-color)",
                  }}
                >
                  <div className="mb-2">
                    <span className="badge bg-secondary mb-2">
                      {item.category.toUpperCase()}
                    </span>
                  </div>
                  <h4
                    className="fw-bold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {item.summary}
                  </p>
                  <div className="mb-4 mt-2">
                    {item.technologies.slice(0, 5).map((tech) => (
                      <span className="badge bg-dark me-1 mb-1" key={tech}>
                        <i
                          className="fas fa-layer-group me-1"
                          aria-hidden="true"
                        />
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 5 && (
                      <span className="badge bg-secondary me-1 mb-1">
                        +{item.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={`/infrastructure/${item.slug}/`}
                      className="fw-bold"
                      style={{
                        color: "var(--accent-color)",
                        textDecoration: "none",
                      }}
                    >
                      View Case Study &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row text-center mt-4">
            <div className="col">
              <Link
                href="/infrastructure/"
                className="btn btn-outline-primary"
                style={{
                  borderColor: "var(--accent-color)",
                  color: "var(--accent-color)",
                }}
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech-stack"
        style={{
          background: "var(--bg-primary)",
          paddingTop: "4rem",
          paddingBottom: "2rem",
        }}
      >
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <p className="section-kicker">05 / TECH STACK</p>
              <h2 className="section-title">The tools behind the work.</h2>
              <div className="title-underline" />
            </div>
          </div>
          <div
            id="tech-stack-container"
            className="row justify-content-center text-center"
          >
            <div className="col-md-10">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`badge bg-${tech.style} fs-6 py-2 px-3 mb-2`}
                  >
                    {tech.icon && (
                      <i className={`${tech.icon} me-1`} aria-hidden="true" />
                    )}
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
