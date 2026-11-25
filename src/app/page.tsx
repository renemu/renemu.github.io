import { portfolioData } from "@/data/portfolio";
import { buildHomeJsonLd, buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { InfrastructurePreviewSection } from "@/components/sections/InfrastructurePreviewSection";
import { TechStackSection } from "@/components/sections/TechStackSection";

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
  return (
    <>
      <JsonLd data={buildHomeJsonLd(HOME_TITLE, HOME_DESCRIPTION)} />
      <HeroSection />
      <AboutSection about={portfolioData.about} />
      <ExperienceSection experience={portfolioData.experience} />
      <ProjectsSection projects={portfolioData.projects} />
      <InfrastructurePreviewSection items={portfolioData.infrastructure} />
      <TechStackSection techStack={portfolioData.techStack} />
    </>
  );
}
