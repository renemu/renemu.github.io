import type { PortfolioData } from "@/types/portfolio";

const IMAGE_PROJECT_PREFIX = "/assets/img/projects/";

export const SITE_CONFIG = {
  origin: "https://renemu.github.io",
  name: "Muhammad Rifki Zulfikar",
  shortName: "M Rifki Z",
  jobTitle: "Software Engineer",
  email: "muhamadrifkizulfikar@gmail.com",
  portraitPath: "/assets/img/avatar/rifki_ai_2.jpg",
  socials: {
    github: "https://github.com/renemu",
    linkedin:
      "https://www.linkedin.com/in/muhammad-rifki-zulfikar-s-t-4243a9144/",
    linkedinCanonical:
      "https://www.linkedin.com/in/muhammad-rifki-zulfikar-4243a9144",
    instagram: "https://www.instagram.com/tuan_zuli/",
  },
} as const;

export const portfolioData: PortfolioData = {
  about: {
    paragraphs: [
      "A multi-disciplinary engineer specializing in Software, Infrastructure, and IoT engineering. With a Bachelor's degree in Electrical Engineering from Siliwangi University (Computer & Control Systems), I bridge the gap between physical hardware and scalable software systems.",
      "My engineering journey started in vocational school and has evolved into designing end-to-end solutions: from microcontroller-level programming to backend web services and server orchestration. I am highly proficient in modern development environments, actively leveraging AI-assisted tools (Cursor, GitHub Copilot, Claude) to accelerate delivery and write optimized code.",
    ],
    coreCompetencies: [
      {
        title: "Software Engineering",
        description:
          "Experienced in building robust web and desktop applications. Skilled in database architecture, application workflow design, and integrating complex APIs. (Tech: Laravel, C++, PHP, MySQL/SQL, plus modern stacks like Vue & Golang).",
      },
      {
        title: "Infrastructure & DevOps",
        description:
          "Accustomed to managing server deployments, reverse proxies, and CI/CD pipelines to ensure high availability and secure networking. (Tech: Linux, Docker, GitHub Actions, Nginx, Apache).",
      },
      {
        title: "IoT & Control Systems",
        description:
          "Deep understanding of hardware-software integration, wiring circuit design, and real-time/non-real-time data processing for remote monitoring and automation (e.g., ESP32/Arduino ecosystems).",
      },
    ],
  },
  techStack: [
    {
      name: "Laravel",
      icon: "fab fa-laravel",
      style: "primary",
    },
    {
      name: "Node Js",
      icon: "fab fa-node",
      style: "primary",
    },
    {
      name: "NestJs",
      icon: "fab fa-nestjs",
      style: "primary",
    },
    {
      name: "CodeIgniter",
      icon: "fas fa-fire",
      style: "primary",
    },
    {
      name: "Vue.js",
      icon: "fab fa-vuejs",
      style: "primary",
    },
    {
      name: "React (Next.js)",
      icon: "fab fa-react",
      style: "primary",
    },
    {
      name: "Golang",
      icon: "fas fa-code",
      style: "primary",
    },
    {
      name: "C++",
      icon: "fas fa-file-code",
      style: "primary",
    },
    {
      name: "PHP",
      icon: "fab fa-php",
      style: "primary",
    },
    {
      name: "MariaDB/MySQL/PostgreSQL",
      icon: "fas fa-database",
      style: "primary",
    },
    {
      name: "Linux",
      icon: "fab fa-linux",
      style: "secondary",
    },
    {
      name: "Docker",
      icon: "fab fa-docker",
      style: "secondary",
    },
    {
      name: "GitHub Actions",
      icon: "fab fa-github",
      style: "secondary",
    },
    {
      name: "Nginx / Traefik / Apache",
      icon: "fas fa-server",
      style: "secondary",
    },
    {
      name: "ESP32 / Arduino / Raspberry Pi",
      icon: "fas fa-microchip",
      style: "info",
    },
    {
      name: "Kubernetes",
      icon: "fas fa-dharmachakra",
      style: "info",
    },
    {
      name: "Terraform",
      icon: "fas fa-robot",
      style: "info",
    },
    {
      name: "Ansible",
      icon: "fas fa-tools",
      style: "info",
    },
    {
      name: "Jenkins",
      icon: "fab fa-jenkins",
      style: "info",
    },
    {
      name: "Grafana / Prometheus",
      icon: "fas fa-chart-line",
      style: "info",
    },
    {
      name: "IoT & Control Systems",
      icon: "fas fa-wifi",
      style: "info",
    },
  ],
  experience: [
    {
      title: "Fullstack Developer",
      company: "PT. Adanu Adhinata Semesta",
      type: "Contract",
      date: "Nov 2025 - Present · 1 yr",
      location: "Kota Yogyakarta, Indonesia (On-site)",
      description:
        "Develop and maintain enterprise applications (Employee, Marketing Sales, Tracking) on a Laravel, Vue.js, TypeScript, Queue, RabbitMQ, and MySQL/MariaDB monolith stack. Containerize and deploy applications with Docker, design CI/CD workflows with GitHub Actions and Jenkins, configure Nginx reverse proxy, domains, SSL, and VPS networking, and manage Linux servers, databases, and production maintenance.",
      skills:
        "Laravel, Vue.js, TypeScript, RabbitMQ, MySQL/MariaDB, Docker, GitHub Actions, Jenkins, Nginx, Linux Server Administration",
    },
    {
      title: "Frontend Web Developer",
      company: "PT. Gawe Becik Nadhah Anugrah (GENAH)",
      type: "Contract",
      date: "Apr 2024 - Nov 2025 · 1 yr 8 mos",
      location: "Yogyakarta, Indonesia (On-site)",
      description:
        "Developed and maintained enterprise applications including CRM, Asset Management, and Advertiser Management systems using Laravel, Vue.js, and MySQL. Built and deployed a responsive Progressive Web App (PWA) for an E-Commerce platform using Next.js, and integrated front-end components with back-end APIs.",
      skills: "Vue.js, Next.js, Laravel, MySQL, PWA",
    },
    {
      title: "IoT Developer",
      company: "XL Axiata IoT",
      type: "Contract",
      date: "Jun 2021 - Nov 2021 · 6 mos",
      location: "Jakarta, Indonesia",
      description:
        "Worked on Electrical Circuit Design for BSF Products. Engineered a maggot larvae (Black Soldier Fly) monitoring system using IoT sensors and a dedicated smartphone application to assist BSF factory operations.",
      skills:
        "Electrical Design, Technical Communication, Microcontroller, Integration Sensor",
    },
  ],
  projects: [
    {
      title: "IOT based BSF larvae monitoring system using ESP32",
      category: "IoT System",
      year: "2021",
      role: "IoT Engineer",
      techStack: "C++, Microcontroller, Blynk",
      link: null,
      images: [
        `${IMAGE_PROJECT_PREFIX}bsf-1.jpg`,
        `${IMAGE_PROJECT_PREFIX}bsf-2.jpg`,
        `${IMAGE_PROJECT_PREFIX}bsf-3.jpg`,
      ],
      description:
        "Designing system architecture and wiring diagrams, soldering components, integrating humidity/temperature sensors, and uploading code using the Arduino IDE for Blynk IoT dashboard integration.",
    },
    {
      title:
        "Monitoring Humidity and Temperature class room with nodemcu esp8266 IoT blynk",
      category: "IoT System",
      year: "2021",
      role: "IoT Engineer",
      techStack: "C++, Microcontroller, Blynk",
      link: null,
      image: null,
      description:
        "Designing the system, creating wiring diagrams, soldering components, integrating DHT22 sensor, and implementing the device with the Blynk IoT platform.",
    },
    {
      title:
        "Vehicle battery monitoring system using ESP32 microcontroller based on internet of things",
      category: "IoT System",
      year: "2022",
      role: "IoT Engineer",
      techStack: "C++, Microcontroller, Blynk",
      link: null,
      image: `${IMAGE_PROJECT_PREFIX}vehicle-battery-monitoring.jpg`,
      description:
        "Root cause analysis, monitoring method development, system architecture creation, and integration of ACS712 current sensor with Blynk IoT for a Suzuki Swift vehicle.",
    },
    {
      title:
        "Cell Voltage Balancing Monitoring System with Switching Method on 110v Dc Ni-Cd Battery",
      category: "IoT System",
      year: "2023",
      role: "Researcher",
      techStack: "C++, Microcontroller, Blynk",
      link: null,
      image: `${IMAGE_PROJECT_PREFIX}monsel.jpg`,
      description:
        "Engineered monitoring architecture, programmed microcontroller for INA219 sensors, calculated per-cell balancing, and bridged real-time telemetry into a Nextion HMI display and Blynk IoT.",
    },
    {
      title: "ARJUNA (CUSTOMER RELATIONSHIP MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2024",
      role: "Frontend Developer",
      techStack: "Vue, Laravel Api, Mysql",
      link: "https://arjuna.genah.net",
      images: [
        `${IMAGE_PROJECT_PREFIX}arjuna-1.png`,
        `${IMAGE_PROJECT_PREFIX}arjuna-2.png`,
        `${IMAGE_PROJECT_PREFIX}arjuna-3.png`,
      ],
      description:
        "Designing and building UX, REST API integration including authentication, middleware, and business logic.",
    },
    {
      title: "SEMAR (ASSETS MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2024",
      role: "Fullstack Developer",
      techStack: "Vue, Laravel Api, Mysql",
      link: "https://semar.genah.net",
      images: [
        `${IMAGE_PROJECT_PREFIX}semar-3.png`,
        `${IMAGE_PROJECT_PREFIX}semar-1.png`,
        `${IMAGE_PROJECT_PREFIX}semar-2.png`,
      ],
      description:
        "Designing system ERD, handling post-production, and integrating APIs for auth, middleware, and business logic.",
    },
    {
      title: "IOT-BASED OIL SUITABILITY AND WATER COOLANT LEAK DETECTION TOOL",
      category: "IoT System",
      year: "2025",
      role: "IoT Engineer",
      techStack: "C++, Microcontroller, Blynk",
      link: null,
      images: [
        `${IMAGE_PROJECT_PREFIX}monoil-1.jpg`,
        `${IMAGE_PROJECT_PREFIX}monoil-2.jpg`,
        `${IMAGE_PROJECT_PREFIX}monoil-3.jpg`,
        `${IMAGE_PROJECT_PREFIX}monoil-4.jpg`,
        `${IMAGE_PROJECT_PREFIX}monoil-5.jpg`,
      ],
      description:
        "Root cause analysis, design of oil leak detection, and integration of water, turbidity, DS18B20 temperature, and pressure sensors with Blynk IoT platform.",
    },
    {
      title: "NAKULA (ADVERTISER MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2025",
      role: "Fullstack Developer",
      techStack: "Vue, Laravel Api, Mysql",
      link: null,
      images: [
        `${IMAGE_PROJECT_PREFIX}nakula-1.png`,
        `${IMAGE_PROJECT_PREFIX}nakula-2.png`,
        `${IMAGE_PROJECT_PREFIX}nakula-3.png`,
      ],
      description:
        "Development of an advertiser management system using Vue and Laravel API.",
    },
    {
      title: "GENVIT (E-COMMERCE)",
      category: "Web Application",
      year: "2025",
      role: "Frontend Developer",
      techStack: "React (Next Js), Javascript",
      link: "https://genvit.id",
      images: [
        `${IMAGE_PROJECT_PREFIX}genvit-3.png`,
        `${IMAGE_PROJECT_PREFIX}genvit-1.png`,
        `${IMAGE_PROJECT_PREFIX}genvit-2.png`,
      ],
      description:
        "UI/UX implementation using Next.js, integration with Go (Golang) backend APIs, and deployment with CI/CD and Docker.",
    },
    {
      title: "BIRAWA (INSTANT MESSAGING SYSTEM)",
      category: "Web Services",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Golang Api",
      link: null,
      image: null,
      description:
        "Designed system architecture, conceptualized tenant orchestration, developed tenant services using Go, and integrated webhooks with Laravel WebSockets using PusherJS.",
    },
    {
      title: "BASE LAYOUT ERP ASATEAM V1",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 12, Vue + Tailwind, Mysql, rabbitmq",
      link: "https://erp.asateam.tech",
      images: [
        `${IMAGE_PROJECT_PREFIX}erp-v1-asateam-1.png`,
        `${IMAGE_PROJECT_PREFIX}erp-v1-asateam-2.png`,
        `${IMAGE_PROJECT_PREFIX}erp-v1-asateam-3.png`,
      ],
      description:
        "Developing business logic, integrating RabbitMQ as a message broker, implementing queues and schedulers, and integrating WebSockets using PusherJS.",
    },
    {
      title: "BASE LAYOUT ERP ASATEAM V2",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 13 Shadcn Vue, Mysql, rabbitmq, reverb/pusher",
      link: "https://erp-v2.asateam.tech",
      images: [
        `${IMAGE_PROJECT_PREFIX}erp-v2-asateam-1.png`,
        `${IMAGE_PROJECT_PREFIX}erp-v2-asateam-2.png`,
        `${IMAGE_PROJECT_PREFIX}erp-v2-asateam-3.png`,
      ],
      description:
        "Architected core business logic using Laravel 13 and Vue.js, implemented RabbitMQ message brokers, engineered real-time bidirectional communication pipelines using WebSockets (Laravel Reverb & Pusher).",
    },
    {
      title: "BASE LAYOUT Next.Js",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "React, Next.Js, Typescript, Mysql/MariaDB, Websocket",
      link: "https://base-next.renemu.com",
      images: [
        `${IMAGE_PROJECT_PREFIX}base-next-3.png`,
        `${IMAGE_PROJECT_PREFIX}base-next-1.png`,
        `${IMAGE_PROJECT_PREFIX}base-next-2.png`,
        `${IMAGE_PROJECT_PREFIX}base-next-4.png`,
      ],
      description:
        "Architected core business logic using Next.js and React.js, implemented WebSockets for real-time communication, and integrated with MySQL/MariaDB for database operations.",
    },
    {
      title: "BASE LAYOUT Asp.Net",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Microsoft.Net 9, C#, Mysql, Sql Server",
      link: "https://base-asp.renemu.com",
      images: [
        `${IMAGE_PROJECT_PREFIX}base-asp-1.png`,
        `${IMAGE_PROJECT_PREFIX}base-asp-2.png`,
        `${IMAGE_PROJECT_PREFIX}base-asp-3.png`,
      ],
      description:
        "Architected core business logic using .Net 9 with C# and integrated with MySQL/MariaDB for database operations.",
    },
    {
      title: "GANDEWA (DBaaS)",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 13 Shadcn Vue, Mysql, Minio",
      link: null,
      image: null,
      description:
        "Database as a Service side project using Laravel 13, Shadcn Vue, MySQL, and Minio.",
    },
    {
      title: "ARKANA (SALES MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 13 Shadcn Vue, Mysql, Laravel Reverb, Rabbitmq",
      link: "https://arkana.asateam.tech",
      images: [
        `${IMAGE_PROJECT_PREFIX}arkana-1.png`,
        `${IMAGE_PROJECT_PREFIX}arkana-2.png`,
        `${IMAGE_PROJECT_PREFIX}arkana-3.png`,
      ],
      description:
        "Develop for process analytic using data report analytics and report for salesman, and data tracking expedition process with third party api",
    },
    {
      title: "SANTIKA (EMPLOYEE MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 12 Vue + Tailwind, Mysql, rabbitmq",
      link: "https://santika.asateam.tech",
      images: [
        `${IMAGE_PROJECT_PREFIX}santika-1.png`,
        `${IMAGE_PROJECT_PREFIX}santika-2.png`,
        `${IMAGE_PROJECT_PREFIX}santika-3.png`,
      ],
      description:
        "Employee management system developed using Laravel 12, Vue, Tailwind, MySQL, and RabbitMQ.",
    },
    {
      title: "SAKTA (HOST LIVE MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 13 Shadcn Vue, Mysql, rabbitmq, reverb/pusher",
      link: "https://sakta.asateam.id",
      images: [
        `${IMAGE_PROJECT_PREFIX}sakta-1.png`,
        `${IMAGE_PROJECT_PREFIX}sakta-2.png`,
        `${IMAGE_PROJECT_PREFIX}sakta-3.png`,
      ],
      description:
        "Host live freelance management system. This is management host live and for freelance and performance live KPI. and have feature auto-shift and auto-attendance.",
    },
    {
      title: "ATTENDANCE SERVICE WEBHOOK MULTIPLEXER",
      category: "Web Services",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Golang Api",
      link: null,
      image: null,
      description:
        "Attendance service webhook multiplexer built with Golang API.",
    },
    {
      title: "PHOTOBOOTH APP",
      category: "Desktop Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Electron Js (Vue), Typescript, Sql Lite",
      link: null,
      images: [
        `${IMAGE_PROJECT_PREFIX}booth-3.png`,
        `${IMAGE_PROJECT_PREFIX}booth-4.png`,
      ],
      description:
        "Desktop photobooth application developed using Electron.js Desktop app + Vue 3 + TypeScript.",
    },
    {
      title: "ADMIN BOOTH",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 13 Shadcn Vue, Mysql, Api",
      link: "https://rebooth.renemu.com",
      images: [
        `${IMAGE_PROJECT_PREFIX}rebooth-1.png`,
        `${IMAGE_PROJECT_PREFIX}rebooth-2.png`,
        `${IMAGE_PROJECT_PREFIX}rebooth-3.png`,
      ],
      description:
        "Admin panel for booth management developed with Laravel 13, Shadcn Vue, and MySQL.",
    },
    {
      title: "DIGITAL WEDDING GUEST BOOK",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "React (Next Js), Prisma (Mysql), Typescript",
      link: "https://dwg.renemu.com",
      images: [
        `${IMAGE_PROJECT_PREFIX}dwg-1.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-2.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-3.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-4.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-5.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-6.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-7.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-8.png`,
        `${IMAGE_PROJECT_PREFIX}dwg-9.png`,
      ],
      description:
        "Digital wedding guest book application developed using Next.js, Prisma, MySQL, and TypeScript.",
    },
    {
      title: "WEDDING TEMPLATE",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Vue (Nuxt Js 3), Prisma (Mysql), Typescript",
      link: "https://dev-wedding.renemu.com",
      image: null,
      description:
        "Wedding template application developed using Nuxt 3, Prisma, MySQL, and TypeScript.",
    },
    {
      title: "Modules Power on/off PC with integrated discord bot",
      category: "IoT System",
      year: "2026",
      role: "IoT Engineer",
      techStack: "C++, Microcontroller, ac voltage meter",
      link: null,
      images: [
        `${IMAGE_PROJECT_PREFIX}module-pc-1.jpg`,
        `${IMAGE_PROJECT_PREFIX}module-pc-2.jpg`,
        `${IMAGE_PROJECT_PREFIX}module-pc-3.jpg`,
      ],
      description:
        "Engineered microcontroller logic (C++) and integrated AC voltage sensors for real-time power state monitoring with Discord API automated status notifications.",
    },
    {
      title: "BILLMATE (MANAGEMENT OUT & INCOME)",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Codeigniter 4, Mysql, Tailwind",
      link: "https://billmate.renemu.com",
      images: [
        `${IMAGE_PROJECT_PREFIX}billmate-1.png`,
        `${IMAGE_PROJECT_PREFIX}billmate-2.png`,
        `${IMAGE_PROJECT_PREFIX}billmate-3.png`,
      ],
      description:
        "Income and expense management application developed using CodeIgniter 4, MySQL, and Tailwind.",
    },
    {
      title: "SCOUTS CAMP",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Vue (Nuxt Js 3), Typescript",
      link: "https://scouts.renemu.com",
      images: [
        `${IMAGE_PROJECT_PREFIX}scouts-camp-1.png`,
        `${IMAGE_PROJECT_PREFIX}scouts-camp-2.png`,
        `${IMAGE_PROJECT_PREFIX}scouts-camp-3.png`,
        `${IMAGE_PROJECT_PREFIX}scouts-camp-4.png`,
      ],
      description:
        "Scouts camp application developed using Nuxt 3 and TypeScript.",
    },
  ],
  infrastructure: [
    {
      slug: "large-file-upload",
      title: "Large File Upload Infrastructure",
      category: "Networking / Infrastructure",
      summary:
        "Redesigned the application ingress architecture to support Laravel file uploads up to 500 MB while keeping the main application infrastructure on a private self-hosted server.",
      technologies: [
        "Laravel",
        "MinIO",
        "Ubuntu Server",
        "Docker",
        "VPS",
        "Nginx Proxy Manager",
        "NetBird",
        "Cloudflare",
      ],
      overview:
        "The Laravel application required file uploads up to approximately 500 MB. The previous deployment path used Cloudflare proxied infrastructure, creating a request-size bottleneck before large requests reached the application.",
      challenge: [
        "Cloudflare's free/pro tiers limit upload request sizes, causing 413 Payload Too Large errors.",
        "Application-level chunking would require additional upload-session handling, chunk reconstruction, retries, and application-level complexity.",
        "The primary application server needed to remain secure and private without being fully exposed to the public internet.",
      ],
      solution: [
        "Introduced a lightweight VPS with a public static IP as the ingress gateway.",
        "Configured Cloudflare for DNS only (unproxied) to bypass the file size limit.",
        "Deployed Nginx Proxy Manager on the VPS to handle SSL and reverse proxying.",
        "Established a NetBird VPN tunnel between the public VPS and the private ASUS application server.",
      ],
      architecture: {
        mobile: [
          "Cloudflare DNS",
          "Public VPS",
          "Nginx Proxy Manager",
          "NetBird VPN",
          "ASUS Ubuntu Server",
          "Laravel & MinIO",
        ],
        desktop: [
          "Cloudflare DNS",
          "Public VPS\n(Nginx)",
          "NetBird VPN",
          "Private Server\n(Laravel / MinIO)",
        ],
      },
      result: [
        "Large uploads could reach the Laravel application reliably.",
        "Bypassed the previous Cloudflare request-size bottleneck without implementing complex application-level chunking.",
        "The application server remained completely isolated within a private network.",
      ],
      responsibilities: [
        "Analyzing the upload bottleneck and investigating Cloudflare limits.",
        "Designing the ingress architecture to securely bridge the public VPS and private server.",
        "Configuring NetBird for the secure tunnel.",
        "Deploying and configuring Nginx Proxy Manager.",
      ],
    },
    {
      slug: "centralized-multi-app-cicd",
      title: "Centralized Multi-App CI/CD",
      category: "CI/CD / Automation",
      summary:
        "Built a centralized Jenkins environment to monitor and orchestrate deployments across multiple repositories and application servers.",
      technologies: [
        "Jenkins",
        "Git",
        "GitHub",
        "Linux",
        "Docker",
        "Jenkins Agent",
        "CI/CD",
      ],
      overview:
        "Managing approximately 3–10 application repositories meant checking each repository's independent CI/CD workflow and build status individually. Monitoring concurrent deployments became increasingly difficult.",
      challenge: [
        "Decentralized CI/CD pipelines across multiple repositories.",
        "No single dashboard to monitor the status of all concurrent deployments.",
        "Redundant configuration required for similar deployment workflows.",
      ],
      solution: [
        "Installed Jenkins on a VPS as a centralized CI/CD controller.",
        "Connected multiple repositories using secured Git/SSH credentials.",
        "Installed Jenkins agents on target application servers to run deployment workloads locally.",
        "Configured Jenkins Build Monitor to provide a centralized view of all pipelines.",
      ],
      architecture: {
        mobile: [
          "Git Repositories",
          "Jenkins Controller",
          "Jenkins Agents",
          "Docker Deployments",
        ],
        desktop: [
          "Git Repositories",
          "Jenkins Controller\n(Build Monitor)",
          "Agent Servers\n(A / B / C)",
          "Docker / Apps",
        ],
      },
      result: [
        "Multiple application builds and deployments could be monitored from one unified dashboard.",
        "Reduced time spent checking individual repositories.",
        "Standardized the deployment orchestration process across projects.",
      ],
      futureImprovements: [
        "Replace SCM polling with Git webhooks so pipelines start immediately when new commits are pushed.",
      ],
      responsibilities: [
        "Setting up and securing the Jenkins Controller.",
        "Configuring Jenkins Agents on multiple application servers.",
        "Writing and managing Jenkinsfiles for the deployment pipelines.",
        "Integrating Git repositories and setting up Build Monitor.",
      ],
    },
    {
      slug: "linux-hosting-migration",
      title: "Linux Hosting Migration",
      category: "Linux / Hosting",
      summary:
        "Migrated multiple PHP applications from a Windows-based local hosting environment into a dedicated Ubuntu Server environment while preserving a familiar cPanel-style workflow.",
      technologies: [
        "Ubuntu Server",
        "aaPanel",
        "Nginx",
        "PHP",
        "Laravel",
        "CodeIgniter 4",
        "MySQL",
        "Cloudflare Tunnel",
        "Tailscale",
      ],
      overview:
        "Applications were running directly on a Windows laptop (via XAMPP/Laravel Herd) that was also used for daily desktop work. As traffic increased, workloads competed for resources. The goal was to migrate to a dedicated Linux environment while keeping management easy.",
      challenge: [
        "Desktop workloads and server workloads competing for system resources.",
        "Need for a dedicated hosting environment without a steep Linux administration learning curve.",
        "Ensuring both public access for the applications and secure remote access for the developer.",
      ],
      solution: [
        "Configured an MSI laptop with a dual boot (Windows for desktop, Ubuntu Server for hosting).",
        "Installed aaPanel to provide a familiar cPanel-style management interface.",
        "Set up the LEMP stack (Nginx, PHP, MySQL, phpMyAdmin) via aaPanel.",
        "Configured Cloudflare Tunnel for public access and Tailscale for private developer access.",
      ],
      architecture: {
        mobile: [
          "Cloudflare Tunnel",
          "Ubuntu Server",
          "aaPanel (LEMP)",
          "PHP Applications",
          "Tailscale",
          "Developer Laptop",
        ],
        desktop: [
          "Internet / Cloudflare",
          "Ubuntu Server\n(aaPanel / LEMP)",
          "PHP Apps\n(Laravel / CI4)",
          "Tailscale\n(Dev Laptop)",
        ],
      },
      result: [
        "Created a dedicated Linux-based hosting environment, freeing up Windows desktop resources.",
        "Maintained a familiar hosting-management experience using aaPanel.",
        "Achieved secure public application access alongside private remote development capabilities.",
      ],
      responsibilities: [
        "Installing and configuring Ubuntu Server.",
        "Setting up aaPanel and the underlying web stack.",
        "Migrating Laravel and CodeIgniter 4 applications to the new environment.",
        "Configuring Cloudflare Tunnels and Tailscale networks.",
      ],
    },
  ],
};

export function getInfrastructureBySlug(slug: string) {
  return portfolioData.infrastructure.find((item) => item.slug === slug);
}
