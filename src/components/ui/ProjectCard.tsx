"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectCategory, ProjectItem } from "@/types/portfolio";
import type { PreviewItem } from "./ImagePreviewModal";

interface ProjectCardProps {
  project: ProjectItem;
  isPreviewOpen: boolean;
  onOpenPreview: (items: PreviewItem[], index: number) => void;
}

function getCategoryIcon(category: ProjectCategory): string {
  switch (category) {
    case "IoT System":
      return "fa-microchip";
    case "Web Services":
      return "fa-network-wired";
    case "Desktop Application":
      return "fa-desktop";
    default:
      return "fa-code";
  }
}

function getProjectImages(project: ProjectItem): string[] {
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images.filter(Boolean);
  }
  if (project.image) {
    return [project.image];
  }
  return [];
}

export function ProjectCard({
  project,
  isPreviewOpen,
  onOpenPreview,
}: ProjectCardProps) {
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hiddenIndices, setHiddenIndices] = useState<Set<number>>(new Set());

  const images = useMemo(() => getProjectImages(project), [project]);

  const stopAutoScroll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoScroll = () => {
    if (isPreviewOpen || images.length < 2) return;
    stopAutoScroll();
    timerRef.current = setInterval(() => {
      const el = mediaRef.current;
      if (!el) return;
      const nextLeft = el.scrollLeft + el.clientWidth;
      el.scrollTo({
        left: nextLeft >= el.scrollWidth - 1 ? 0 : nextLeft,
        behavior: "smooth",
      });
    }, 3000);
  };

  useEffect(() => {
    if (isPreviewOpen) stopAutoScroll();
    return () => stopAutoScroll();
  }, [isPreviewOpen]);

  const visibleSlides = images
    .map((src, i) => ({
      src,
      alt: `${project.imageAlt || project.title}${images.length > 1 ? ` — image ${i + 1}` : ""}`,
      originalIndex: i,
    }))
    .filter((slide) => !hiddenIndices.has(slide.originalIndex));

  const tags = project.techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="work-card">
      {visibleSlides.length > 0 && (
        <div
          ref={mediaRef}
          className="work-media"
          onPointerEnter={startAutoScroll}
          onPointerLeave={stopAutoScroll}
          onFocus={startAutoScroll}
          onBlur={stopAutoScroll}
        >
          {visibleSlides.map((slide, visibleIdx) => (
            <div className="work-slide" key={slide.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                width={960}
                height={540}
                onError={() =>
                  setHiddenIndices((prev) => {
                    const next = new Set(prev);
                    next.add(slide.originalIndex);
                    return next;
                  })
                }
              />
              {visibleSlides.length > 1 && (
                <span className="work-slide-badge" aria-hidden="true">
                  {visibleIdx + 1} / {visibleSlides.length}
                </span>
              )}
              <button
                className="work-preview"
                type="button"
                aria-label={`Preview image ${visibleIdx + 1} for ${project.title}`}
                onClick={() => {
                  stopAutoScroll();
                  onOpenPreview(
                    visibleSlides.map(({ src, alt }) => ({ src, alt })),
                    visibleIdx
                  );
                }}
              >
                <i className="fas fa-expand" aria-hidden="true" />
                <span>Preview</span>
              </button>
            </div>
          ))}
        </div>
      )}

      <header className="work-header">
        <div className="work-category">
          <span className="work-icon" aria-hidden="true">
            <i className={`fas ${getCategoryIcon(project.category)}`} />
          </span>
          <span>{project.category}</span>
        </div>
        <time className="work-year" dateTime={project.year}>
          {project.year}
        </time>
      </header>

      <div className="work-body">
        <h3 className="work-title">{project.title}</h3>
        <p className="work-role">{project.role}</p>
        <p className="work-desc">{project.description}</p>
        <ul className="work-tags" aria-label="Technologies">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <footer className="work-footer">
        {project.link ? (
          <>
            <span className="work-status">
              <span className="work-status-dot" aria-hidden="true" />
              Public project
            </span>
            <a
              className="work-visit"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View project <span aria-hidden="true">↗</span>
              <span className="visually-hidden">: {project.title}</span>
            </a>
          </>
        ) : (
          <>
            <span className="work-private">
              <i className="fas fa-code-branch" aria-hidden="true" />
              Project showcase
            </span>
            <span className="work-unavailable">No public link</span>
          </>
        )}
      </footer>
    </article>
  );
}
