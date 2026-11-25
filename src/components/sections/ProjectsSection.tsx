"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectItem } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  ImagePreviewModal,
  type PreviewItem,
} from "@/components/ui/ImagePreviewModal";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

interface PreviewState {
  items: PreviewItem[];
  index: number;
}

const INITIAL_SLIDE_COUNT = 10;

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
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
          p.description.toLowerCase().includes(query) ||
          p.role.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => Number(b.year) - Number(a.year));
  }, [projects, searchTerm, selectedCategory]);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_SLIDE_COUNT);

  const remainingCount = Math.max(
    0,
    filteredProjects.length - INITIAL_SLIDE_COUNT
  );

  const isSliderMode = !showAll && displayedProjects.length > 0;

  useEffect(() => {
    const el = sliderRef.current;
    if (!isSliderMode || !el) return;

    const updateScrollState = () => {
      setCanScrollPrev(el.scrollLeft > 4);
      setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    el.scrollTo({ left: 0 });
    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [isSliderMode, displayedProjects.length, searchTerm, selectedCategory]);

  const slideBy = (direction: -1 | 1) => {
    const el = sliderRef.current;
    if (!el) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const firstSlide = el.querySelector<HTMLElement>(".projects-slide-item");
    const step = firstSlide ? firstSlide.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({
      left: direction * step,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const openPreview = (items: PreviewItem[], index: number) => {
    if (!items.length) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setPreview({
      items,
      index: Math.min(index, items.length - 1),
    });
  };

  const closePreview = () => {
    setPreview(null);
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  };

  return (
    <Section
      id="project"
      kicker="03 / MY PROJECTS"
      title="A collection of things I’ve built."
      variant="secondary"
    >
      <div className="projects-toolbar" role="search" aria-label="Filter projects">
        <div className="search-field">
          <i className="fas fa-search search-field-icon" aria-hidden="true" />
          <input
            aria-label="Search projects"
            type="search"
            id="projectSearch"
            className="filter-input"
            placeholder="Search projects by title, tech stack, role, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => setSearchTerm("")}
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="category-field">
          <select
            aria-label="Filter projects by category"
            id="projectCategory"
            className="filter-select"
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

      <div className="projects-meta-row">
        <p className="projects-count" aria-live="polite">
          Showing {displayedProjects.length} of {filteredProjects.length}{" "}
          projects
          {selectedCategory !== "all" ? ` in ${selectedCategory}` : ""}
          {searchTerm.trim() ? ` matching “${searchTerm.trim()}”` : ""}
        </p>

        {isSliderMode && displayedProjects.length > 1 && (
          <div className="projects-slider-controls" aria-label="Project slider controls">
            <button
              type="button"
              className="slider-nav-btn"
              aria-label="Previous project slide"
              disabled={!canScrollPrev}
              onClick={() => slideBy(-1)}
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="slider-nav-btn"
              aria-label="Next project slide"
              disabled={!canScrollNext}
              onClick={() => slideBy(1)}
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {displayedProjects.length > 0 ? (
        isSliderMode ? (
          <div
            id="projects-container"
            ref={sliderRef}
            className="projects-slider"
            role="region"
            aria-label="Featured projects slider"
          >
            {displayedProjects.map((project) => (
              <div
                key={`${project.year}-${project.title}`}
                className="projects-slide-item"
              >
                <ProjectCard
                  project={project}
                  isPreviewOpen={Boolean(preview)}
                  onOpenPreview={openPreview}
                />
              </div>
            ))}
          </div>
        ) : (
          <div id="projects-container" className="projects-grid">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={`${project.year}-${project.title}`}
                project={project}
                isPreviewOpen={Boolean(preview)}
                onOpenPreview={openPreview}
              />
            ))}
          </div>
        )
      ) : (
        <div id="projects-container" className="projects-grid">
          <div className="projects-empty" role="status">
            <h3>No projects found matching your criteria.</h3>
            <p>Try another keyword or switch to a different category.</p>
          </div>
        </div>
      )}

      {!showAll && remainingCount > 0 && (
        <div className="section-cta">
          <button
            type="button"
            className="btn-outline-accent"
            onClick={() => setShowAll(true)}
          >
            Show more projects {remainingCount}+
            <i className="fas fa-th-large" aria-hidden="true" />
          </button>
        </div>
      )}

      {showAll && filteredProjects.length > INITIAL_SLIDE_COUNT && (
        <div className="section-cta">
          <button
            type="button"
            className="btn-outline-accent"
            onClick={() => {
              setShowAll(false);
              const section = document.getElementById("project");
              if (section) {
                section.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                  ).matches
                    ? "auto"
                    : "smooth",
                  block: "start",
                });
              }
            }}
          >
            Show less <i className="fas fa-chevron-up" aria-hidden="true" />
          </button>
        </div>
      )}

      {preview && (
        <ImagePreviewModal
          items={preview.items}
          index={preview.index}
          onClose={closePreview}
          onNavigate={(nextIndex) =>
            setPreview((prev) => (prev ? { ...prev, index: nextIndex } : null))
          }
        />
      )}
    </Section>
  );
}
