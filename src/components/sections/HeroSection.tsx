import { SITE_CONFIG } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="site-container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              SOFTWARE ENGINEER | FULLSTACK DEVELOPER &amp; IOT &amp; DEVOPS
              &amp; INFRASTRUCTURE
            </p>
            <h1 id="hero-heading" className="hero-title">
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
              <a href="#project" className="btn-hero btn-hero--primary">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="btn-hero btn-hero--secondary"
              >
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-socials">
              <span className="hero-socials-label">FIND ME ON</span>
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

          <figure className="hero-portrait">
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
              loading="eager"
              fetchPriority="high"
            />
            <figcaption className="portrait-caption">
              <div>
                <strong>Tech Enthusiast</strong>
                <span className="portrait-caption-sub">
                  Software · Hardware · Infrastructure
                </span>
              </div>
              <span className="portrait-symbol" aria-hidden="true">
                ↗
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="hero-bottom">
          <span>FULLSTACK DEVELOPMENT</span>
          <span>IoT &amp; CONTROL SYSTEMS</span>
          <span>DEVOPS &amp; INFRASTRUCTURE</span>
          <a href="#about">SCROLL TO EXPLORE ↓</a>
        </div>
      </div>
    </section>
  );
}
