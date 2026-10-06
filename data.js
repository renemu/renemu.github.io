const portfolioData = {
  about: {
    paragraphs: [
      "A multi-disciplinary engineer specializing in Software, Infrastructure, and IoT engineering. With a Bachelor's degree in Electrical Engineering from Siliwangi University (Computer & Control Systems), I bridge the gap between physical hardware and scalable software systems.",
      "My engineering journey started in vocational school and has evolved into designing end-to-end solutions: from microcontroller-level programming to backend web services and server orchestration. I am highly proficient in modern development environments, actively leveraging AI-assisted tools (Cursor, GitHub Copilot, Claude) to accelerate delivery and write optimized code.",
    ],
    core_competencies: [
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
  tech_stack: [
    {
      name: "Laravel",
      icon: "fab fa-laravel",
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
      name: "MySQL/SQL",
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
      name: "Nginx",
      icon: "fas fa-server",
      style: "secondary",
    },
    {
      name: "Apache",
      icon: "fas fa-server",
      style: "secondary",
    },
    {
      name: "ESP32 / Arduino",
      icon: "fas fa-microchip",
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
      title: "Software Engineer",
      company: "ASA Indonesia",
      type: "Contract",
      date: "Nov 2025 - Present · 1 yr",
      location: "Kota Yogyakarta, Indonesia (On-site)",
      description:
        "Responsible for software design, architecture, and end-to-end development. Collaborating with cross-functional teams to build scalable solutions for internal systems, focusing on performance optimization and reliable deployments.",
      skills:
        "Software Design, Software Development, System Architecture, Infrastructure, Server, Devops, Database Management, API Integration",
    },
    {
      title: "Frontend Developer",
      company: "PT. Gawe Becik Nadhah Anugrah (GENAH)",
      type: "Contract",
      date: "Apr 2024 - Nov 2025 · 1 yr 8 mos",
      location: "Yogyakarta, Indonesia (On-site)",
      description:
        "Positioned primarily as a Front-end Developer with involvement in backend integrations. Designed and built intuitive user interfaces with a focus on user experience, system performance, and modern web standards using Vue.js.",
      skills: "Vue.js, Next.js, Laravel, MySQL",
    },
    {
      title: "IoT Developer",
      company: "XL Axiata IoT",
      type: "Internship",
      date: "Jun 2021 - Nov 2021 · 6 mos",
      location: "Jakarta, Indonesia",
      description:
        "Worked on Electrical Circuit Design for BSF Products. Engineered a maggot larvae (Black Soldier Fly) monitoring system using IoT sensors and a dedicated smartphone application to assist BSF factory operations.",
      skills:
        "Electrical Design, Technical Communication, Microcontroller, Integration Sensor",
    },
    {
      title: "Software Engineer",
      company: "Hael System",
      type: "Internship",
      date: "Jun 2016 - Jan 2017 · 8 mos",
      location: "Majenang, Central Java, Indonesia",
      description:
        'Field Work Practice (PKL) at creative house "Hael System". Developed desktop-based applications, handled administration tasks, and assisted with various graphic design projects.',
      skills: "UI/UX Design, Desktop Application Development, Graphic Design",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Engineered monitoring architecture, programmed microcontroller for INA219 sensors, calculated per-cell balancing, and bridged real-time telemetry into a Nextion HMI display and Blynk IoT.",
    },
    {
      title: "ARJUNA (CUSTOMER RELATIONSHIP MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2024",
      role: "Frontend Developer",
      techStack: "Vue, Laravel Api, Mysql",
      link: null,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Designing and building UX, REST API integration including authentication, middleware, and business logic.",
    },
    {
      title: "SEMAR (ASSETS MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2024",
      role: "Fullstack Developer",
      techStack: "Vue, Laravel Api, Mysql",
      link: null,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Architected core business logic using Laravel 13 and Vue.js, implemented RabbitMQ message brokers, engineered real-time bidirectional communication pipelines using WebSockets (Laravel Reverb & Pusher).",
    },
    {
      title: "GANDEWA (DBaaS)",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 13 Shadcn Vue, Mysql, Minio",
      link: "https://gandewa.asateam.tech",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Database as a Service side project using Laravel 13, Shadcn Vue, MySQL, and Minio.",
    },
    {
      title: "SANTIKA (EMPLOYEE MANAGEMENT SYSTEM)",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 12, Vue + Tailwind, Mysql, rabbitmq",
      link: "https://santika.asateam.tech",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Employee management system developed using Laravel 12, Vue, Tailwind, MySQL, and RabbitMQ.",
    },
    {
      title: "ATTENDANCE SERVICE WEBHOOK MULTIPLEXER",
      category: "Web Services",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Golang Api",
      link: null,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Attendance service webhook multiplexer built with Golang API.",
    },
    {
      title: "PHOTOBOOTH APP",
      category: "Desktop Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Electron Js (Vue), Sql Lite",
      link: null,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Desktop photobooth application developed using Electron.js with Vue and SQLite.",
    },
    {
      title: "ADMIN BOOTH",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "Laravel 13 Shadcn Vue, Mysql, Api",
      link: "https://rebooth.renemu.com",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Admin panel for booth management developed with Laravel 13, Shadcn Vue, and MySQL.",
    },
    {
      title: "DIGITAL WEDDING GUEST BOOK",
      category: "Web Application",
      year: "2026",
      role: "Fullstack Developer",
      techStack: "React (Next Js), Prisma (Mysql), Typescript",
      link: "https://lokalinstudio.id",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Wedding template application developed using Nuxt 3, Prisma, MySQL, and TypeScript.",
    },
    {
      title: "Automation Power on/off PC with integrated discord bot",
      category: "IoT System",
      year: "2026",
      role: "IoT Engineer",
      techStack: "C++, Microcontroller, ac voltage meter",
      link: null,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlOlbQ3ZRk8pUomwow5T_ORUo6LvAQqBah9Z7q10EKlbWzp1wEcaR03s&s=10",
      description:
        "Scouts camp application developed using Nuxt 3 and TypeScript.",
    },
  ],
};
