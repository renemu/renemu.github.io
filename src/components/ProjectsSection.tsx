"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectCategory, ProjectItem } from "@/types/portfolio";

interface PreviewItem {
  src: string;
  alt: string;
}

interface PreviewState {
  items: PreviewItem[];
  index: number;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
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

function ProjectCard({
  project,
  isPreviewOpen,
  onOpenPreview,
}: {
  project: ProjectItem;
  isPreviewOpen: boolean;
  onOpenPreview: (items: PreviewItem[], index: number) => void;
}) {
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
    <div className="col-md-6 mb-4 d-flex">
      <article className="project-card work-card h-100 w-100">
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

        <div className="work-header">
          <div className="work-category">
            <span className="work-icon" aria-hidden="true">
              <i className={`fas ${getCategoryIcon(project.category)}`} />
            </span>
            <span>{project.category}</span>
          </div>
          <span className="work-year">{project.year}</span>
        </div>

        <div className="project-content">
          <h3>{project.title}</h3>
          <p className="project-role">{project.role}</p>
          <p className="project-text">{project.description}</p>
          <div className="project-tags" aria-label="Technologies">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="work-footer">
          {project.link ? (
            <>
              <span className="work-status">
                <span aria-hidden="true" />
                Public project
              </span>
              <a
                className="project-visit"
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
              <span className="project-private">
                <i className="fas fa-code-branch" aria-hidden="true" /> Project
                showcase
              </span>
              <span className="work-unavailable">No public link</span>
            </>
          )}
        </div>
      </article>
    </div>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return projects
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "all" || p.category === selectedCategory;
        const matchesSearch =
          !query ||
          p.title.toLowerCase().includes(query) ||
          p.techStack.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => Number(b.year) - Number(a.year));
  }, [projects, searchTerm, selectedCategory]);

  const closePreview = () => {
    setPreview(null);
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  };

  const openPreview = (items: PreviewItem[], index: number) => {
    if (!items.length) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setPreview({
      items,
      index: Math.min(index, items.length - 1),
    });
  };

  useEffect(() => {
    if (!preview) {
      document.body.classList.remove("preview-open");
      return;
    }

    document.body.classList.add("preview-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
      } else if (event.key === "ArrowLeft") {
        setPreview((prev) =>
          prev
            ? {
                ...prev,
                index: (prev.index - 1 + prev.items.length) % prev.items.length,
              }
            : null
        );
      } else if (event.key === "ArrowRight") {
        setPreview((prev) =>
          prev
            ? {
                ...prev,
                index: (prev.index + 1) % prev.items.length,
              }
            : null
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("preview-open");
    };
  }, [preview]);

  return (
    <section id="project" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="row text-center mb-5">
          <div className="col">
            <p className="section-kicker">03 / MY PROJECTS</p>
            <h2 className="section-title">
              A collection of things I’ve built.
            </h2>
            <div className="title-underline" />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="d-flex flex-column flex-md-row gap-3">
              <input
                aria-label="Search projects"
                type="search"
                id="projectSearch"
                className="form-control custom-input"
                placeholder="Search projects by title, tech stack, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                aria-label="Filter projects by category"
                id="projectCategory"
                className="form-select custom-input"
                style={{ maxWidth: "250px" }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div id="projects-container" className="row justify-content-center">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={`${project.year}-${project.title}`}
                project={project}
                isPreviewOpen={Boolean(preview)}
                onOpenPreview={openPreview}
              />
            ))
          ) : (
            <div
              className="col-12 text-center text-muted my-5"
              role="status"
            >
              <h5>No projects found matching your criteria.</h5>
              <p>Try another keyword or category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {preview && (
        <div id="image-preview-modal" className="image-preview-modal">
          <div
            className="image-preview-backdrop"
            onClick={closePreview}
          />
          <div
            className="image-preview-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button
              ref={closeButtonRef}
              className="image-preview-close"
              type="button"
              aria-label="Close preview"
              onClick={closePreview}
            >
              &times;
            </button>
            {preview.items.length > 1 && (
              <button
                className="image-preview-prev"
                type="button"
                aria-label="Previous image"
                onClick={() =>
                  setPreview((prev) =>
                    prev
                      ? {
                          ...prev,
                          index:
                            (prev.index - 1 + prev.items.length) %
                            prev.items.length,
                        }
                      : null
                  )
                }
              >
                &#8249;
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="image-preview-image"
              src={preview.items[preview.index].src}
              alt={preview.items[preview.index].alt}
            />
            {preview.items.length > 1 && (
              <button
                className="image-preview-next"
                type="button"
                aria-label="Next image"
                onClick={() =>
                  setPreview((prev) =>
                    prev
                      ? {
                          ...prev,
                          index: (prev.index + 1) % prev.items.length,
                        }
                      : null
                  )
                }
              >
                &#8250;
              </button>
            )}
            <div className="image-preview-count" aria-live="polite">
              {preview.index + 1} / {preview.items.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
