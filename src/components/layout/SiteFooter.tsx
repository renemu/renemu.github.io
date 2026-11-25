import Link from "next/link";
import { SITE_CONFIG } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <p className="section-kicker">HAVE SOMETHING IN MIND?</p>
            <h2 className="footer-cta-title">Let’s build something great.</h2>
            <p className="footer-cta-text">
              Open for software engineering, IoT systems, and Linux
              infrastructure collaborations. Let&apos;s connect!
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="btn-hero btn-hero--primary"
            >
              Send an email <span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-nav-list">
              <li>
                <Link href="/#about">About Me</Link>
              </li>
              <li>
                <Link href="/#experience">Experience</Link>
              </li>
              <li>
                <Link href="/#project">Projects</Link>
              </li>
              <li>
                <Link href="/infrastructure/">Infrastructure Case Studies</Link>
              </li>
              <li>
                <Link href="/#tech-stack">Tech Stack</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="footer-heading">Connect</h3>
            <div className="footer-icons">
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
                aria-label="GitHub"
                title="GitHub"
              >
                <i className="fab fa-github" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
                aria-label="Instagram"
                title="Instagram"
              >
                <i className="fab fa-instagram" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="footer-icon"
                aria-label="Email"
                title="Email"
              >
                <i className="fas fa-envelope" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            <a
              href={SITE_CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {SITE_CONFIG.name}
            </a>{" "}
            — Software, IoT &amp; Infrastructure Engineer.
          </p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
