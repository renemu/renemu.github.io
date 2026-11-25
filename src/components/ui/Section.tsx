import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Section({
  id,
  kicker,
  title,
  lead,
  variant = "primary",
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`page-section page-section--${variant}`}
    >
      <div className="site-container">
        <header className="section-header">
          <p className="section-kicker">{kicker}</p>
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {lead && <p className="section-lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
