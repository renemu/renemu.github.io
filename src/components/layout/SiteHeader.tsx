"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/data/portfolio";

type Theme = "dark" | "light";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "tech-stack", label: "Tech Stack" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const isInfrastructure = pathname.startsWith("/infrastructure");

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ||
      "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      if (window.scrollY < 160) {
        setActiveSection("home");
        return;
      }

      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollPos = window.scrollY + 120;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (id && scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    setMenuOpen(false);
    if (!isHome) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";

    if (sectionId === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior, block: "start" });
    }
  };

  const renderNavLinks = () => (
    <ul className="nav-list">
      {NAV_ITEMS.map((item) => {
        const isInfraLink = item.id === "infrastructure";
        const href =
          isInfraLink && isInfrastructure
            ? "/infrastructure/"
            : isHome
              ? `#${item.id}`
              : `/#${item.id}`;
        const isActive = isInfrastructure
          ? isInfraLink
          : activeSection === item.id;

        return (
          <li key={item.id}>
            <Link
              href={href}
              className={`nav-link-item${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => {
                if (isHome) {
                  handleAnchorClick(e, item.id);
                } else {
                  setMenuOpen(false);
                }
              }}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="nav-bar">
          <Link
            className="nav-brand"
            href={isHome ? "#home" : "/"}
            onClick={(e) => handleAnchorClick(e, "home")}
          >
            <i className="fas fa-code" aria-hidden="true" />
            <span>{SITE_CONFIG.shortName}</span>
          </Link>

          <nav className="nav-menu-desktop" aria-label="Primary navigation">
            {renderNavLinks()}
            <button
              type="button"
              className="theme-toggle"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={toggleTheme}
            >
              <i
                className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}
                aria-hidden="true"
              />
            </button>
          </nav>

          <div className="nav-controls">
            <button
              type="button"
              className="theme-toggle nav-toggle"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={toggleTheme}
            >
              <i
                className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="nav-toggle"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <i
                className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="nav-drawer"
          aria-label="Mobile navigation"
        >
          <div className="site-container">{renderNavLinks()}</div>
        </nav>
      )}
    </header>
  );
}
