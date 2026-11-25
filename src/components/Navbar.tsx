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
] as const;

export function Navbar() {
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
    if (!isHome) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollPos = window.scrollY + 100;

      if (window.scrollY < 150) {
        setActiveSection("home");
        return;
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        if (
          sectionId &&
          scrollPos >= sectionTop &&
          scrollPos < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
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

    if (sectionId === "home") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          href={isHome ? "#home" : "/"}
          onClick={(e) => handleAnchorClick(e, "home")}
        >
          <i className="fas fa-code me-2" aria-hidden="true" />
          {SITE_CONFIG.shortName}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse${menuOpen ? " show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">
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
                <li className="nav-item" key={item.id}>
                  <Link
                    className={`nav-link${isActive ? " active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    href={href}
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
            <li className="nav-item ms-3">
              <button
                type="button"
                className="theme-toggle"
                id="themeToggle"
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
              >
                <i
                  className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}
                  id="themeIcon"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
