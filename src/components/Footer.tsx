import { SITE_CONFIG } from "@/data/portfolio";

export function Footer() {
  return (
    <footer id="contact" className="footer-custom text-center py-4">
      <div className="container">
        <p className="section-kicker">HAVE SOMETHING IN MIND?</p>
        <h3 className="mb-3">Let’s build something great.</h3>
        <p className="mb-4">Let&apos;s connect and collaborate!</p>
        <div className="footer-icons mb-4">
          <a
            href={SITE_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" aria-hidden="true" />
          </a>
          <a
            href={SITE_CONFIG.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="GitHub"
          >
            <i className="fab fa-github" aria-hidden="true" />
          </a>
          <a
            href={SITE_CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="footer-icon"
            aria-label="Email"
          >
            <i className="fas fa-envelope" aria-hidden="true" />
          </a>
        </div>
        <p className="mb-0">
          <a
            href={SITE_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold footer-link"
          >
            {SITE_CONFIG.name}.
          </a>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
