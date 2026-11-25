export interface CoreCompetency {
  title: string;
  description: string;
}

export interface AboutData {
  paragraphs: string[];
  coreCompetencies: CoreCompetency[];
}

export type TechStackStyle = "primary" | "secondary" | "info";

export interface TechStackItem {
  name: string;
  icon: string | null;
  style: TechStackStyle;
}

export interface ExperienceItem {
  title: string;
  company: string;
  type: string;
  date: string;
  location: string;
  description: string;
  skills: string;
}

export type ProjectCategory =
  | "IoT System"
  | "Web Application"
  | "Web Services"
  | "Desktop Application";

export interface ProjectItem {
  title: string;
  category: ProjectCategory;
  year: string;
  role: string;
  techStack: string;
  link: string | null;
  images?: string[];
  image?: string | null;
  imageAlt?: string;
  description: string;
}

export interface InfrastructureArchitecture {
  mobile: string[];
  desktop: string[];
}

export interface InfrastructureCaseStudy {
  slug: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  overview: string;
  challenge: string[];
  solution: string[];
  architecture?: InfrastructureArchitecture;
  result: string[];
  futureImprovements?: string[];
  responsibilities: string[];
}

export interface PortfolioData {
  about: AboutData;
  techStack: TechStackItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  infrastructure: InfrastructureCaseStudy[];
}
