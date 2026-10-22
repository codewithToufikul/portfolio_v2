// Central portfolio dataset extracted directly from Toufikul Islam's CV.
// Any information not explicitly in the CV is marked with [Sample text: ...] as requested.

export const portfolioData = {
  personal: {
    name: "Toufikul Islam",
    role: "Full Stack Developer",
    rotatingRoles: [
      "Full Stack Developer",
      "MERN Stack Engineer",
      "React Native Mobile Builder",
      "REST & Real-time Architect"
    ],
    location: "Mohammadpur, Dhaka, Bangladesh",
    timezone: "Asia/Dhaka",
    phone: "+880 1709264924",
    whatsapp: "01615685428",
    whatsappLink: "https://wa.me/8801615685428",
    email: "imranmeg2356@gmail.com",
    githubUsername: "codewithToufikul",
    githubUrl: "https://github.com/codewithToufikul",
    linkedinUrl: "https://www.linkedin.com/in/toufikul-islamts/",
    portfolioUrl: "https://toufikuls-portfolio.vercel.app",
    resumeDownloadUrl: "/resume.pdf",
    shippingSince: "2024",
    stats: {
      projectsShipped: "40+",
      technologiesUsed: "45+",
      servicesHealthy: "6/6",
      p95LatencyBase: 34
    },
    bio: "Full Stack Developer building responsive, scalable web and mobile applications since 2024. Delivered 40+ projects using 45+ technologies, with a focus on performance, clean code and secure, maintainable architecture.",
    bioHighlights: [
      "Frontend: React.js, Next.js, TypeScript and Tailwind CSS for fast, user-focused interfaces.",
      "Backend: Node.js, Express.js, MongoDB and PostgreSQL for secure REST APIs and JWT auth.",
      "Real-time & Mobile: Socket.io chat and notifications; React Native app published on Play Store and App Store."
    ]
  },

  kpis: [
    { id: "services", label: "Services", value: "6", unit: "/6 healthy", detail: "All core daemons online" },
    { id: "latency", label: "p95 latency", value: "32", unit: " ms", detail: "Real-time moving avg (simulated)" },
    { id: "projects", label: "Projects shipped", value: "40+", unit: " delivered", detail: "Production & client apps" },
    { id: "since", label: "Shipping since", value: "2024", unit: "", detail: "Active software delivery" }
  ],

  services: [
    { id: "react", name: "React / Next.js", role: "UI & Component layer", baseLatency: 14, status: "healthy", port: ":3000" },
    { id: "node", name: "Node.js", role: "V8 Runtime environment", baseLatency: 22, status: "healthy", port: ":5001" },
    { id: "express", name: "Express.js", role: "HTTP & Routing layer", baseLatency: 18, status: "healthy", port: "/api" },
    { id: "mongodb", name: "MongoDB / Mongoose", role: "Document data store", baseLatency: 31, status: "healthy", port: ":27017" },
    { id: "react-native", name: "React Native", role: "Cross-platform mobile", baseLatency: 26, status: "healthy", port: "iOS / Android" },
    { id: "tailwind", name: "Tailwind CSS", role: "Atomic design tokens", baseLatency: 9, status: "healthy", port: "CSS JIT" }
  ],

  projects: [
    {
      id: "fly-book",
      name: "Fly-Book",
      category: "Mobile",
      categoryType: "mobile",
      subtitle: "Social Learning Platform (Play Store & App Store)",
      status: "Production",
      liveUrl: "https://flybook.app", // [Sample text: Real live link from CV placeholder]
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.flybook.app", // [Sample text: Play Store link]
      appStoreUrl: "https://apps.apple.com/app/fly-book/id123456789", // [Sample text: App Store link]
      githubUrl: "https://github.com/codewithToufikul/fly-book", // [Sample text: Repository link]
      stack: ["React Native", "React", "Vite", "Tailwind CSS", "Firebase", "Socket.io", "Node.js", "Express.js", "MongoDB"],
      problem: "Students and lifelong learners lacked a unified space where they could consume structured digital course content while actively engaging in social discussions and real-time community networking.",
      approach: "Engineered a cross-platform React Native client with a unified Node.js/Express backend, pairing real-time Socket.io chat and WebSocket push notifications with responsive e-learning media delivery.",
      features: [
        "Social feed, real-time chat and instantaneous notification streams.",
        "Comprehensive e-learning hub with video streaming, PDF reader, and course tracking.",
        "Multi-vendor marketplace, curated job board, and searchable digital library.",
        "Role-based administrative control console with real-time analytics and user moderation.",
        "Published and distributed simultaneously across Google Play Store and Apple App Store."
      ],
      result: "Successfully delivered high-velocity cross-platform experience with zero friction between social interactions and educational content."
    },
    {
      id: "home-tutor-provider",
      name: "Home Tutor Provider BD",
      category: "Full Stack",
      categoryType: "web",
      subtitle: "Tuition Management & Marketplace Platform",
      status: "Live",
      liveUrl: "https://hometutorprovider.com", // [Sample text: Real domain placeholder]
      githubUrl: "https://github.com/codewithToufikul/home-tutor-provider", // [Sample text: Repository link]
      stack: ["React", "TypeScript", "Tailwind CSS", "RTK Query", "Node.js", "Express", "MongoDB", "Mongoose", "Redis", "Socket.io"],
      problem: "Parents and students in Bangladesh struggle with finding verified, trusted local tutors, while qualified tutors have difficulty discovering matching tuition offers without middlemen.",
      approach: "Architected a high-performance multi-dashboard platform featuring automated tutor-to-job matching, Redis-cached fuzzy search, and multi-category filtering.",
      features: [
        "Architected multi-role portals: Student, Tutor, Coaching Center, and Admin dashboards.",
        "Engineered fuzzy-ID search and multi-category filter engine with pagination across 1000+ tutor records.",
        "Automated tutor-to-job matching pipeline based on geography, subject, and rate preferences.",
        "Secure onboarding with National ID (NID/student ID) verification and JWT-based session security.",
        "High-performance caching with Redis and real-time live messaging via Socket.io."
      ],
      result: "Reduced search latency for 1000+ tutor profiles and eliminated manual matching overhead."
    },
    {
      id: "service-pro",
      name: "Service Pro",
      category: "Full Stack",
      categoryType: "web",
      subtitle: "On-demand Service Booking Platform",
      status: "Live",
      liveUrl: "https://service-pro-bd.web.app", // [Sample text: Live preview link]
      clientRepo: "https://github.com/codewithToufikul/service-pro-client",
      serverRepo: "https://github.com/codewithToufikul/service-pro-server",
      stack: ["React", "Vite", "Tailwind CSS", "DaisyUI", "Firebase", "Socket.io", "React Query", "Axios", "SSLCommerz"],
      problem: "Local urban clients require seamless, verified booking of home and professional services with reliable regional online payments.",
      approach: "Built a reactive single-page application using React Query and Vite, integrated with the Bangladesh SSLCommerz payment gateway and real-time tri-party chat.",
      features: [
        "Online service booking workflow with automated scheduling.",
        "Secure digital payments via SSLCommerz payment gateway integration.",
        "Real-time tri-party chat bridging customers, service providers, and administrative support.",
        "Comprehensive dashboard managing orders, payment receipts, and automated PDF invoice generation.",
        "CMS-driven blogs, interactive FAQs, and customer review showcase pages."
      ],
      result: "Facilitates reliable end-to-end booking workflows with instant payment verification."
    },
    {
      id: "hidayah",
      name: "Hidayah",
      category: "Web",
      categoryType: "web",
      subtitle: "AI-Powered Islamic Guidance Web App",
      status: "Active",
      liveUrl: "https://hidayah-ai.vercel.app", // [Sample text: Project URL]
      githubUrl: "https://github.com/codewithToufikul/hidayah-ai", // [Sample text: Repo URL]
      stack: ["React", "Express.js", "Node.js", "MongoDB", "AI Services", "Tailwind CSS"],
      problem: "[Sample text: People seeking authentic Islamic advice often get overwhelmed searching lengthy texts and need conversational, structured answers.]",
      approach: "A conversational web interface backed by an AI reasoning engine and a custom Node/Express API with curated references.",
      features: [
        "Conversational AI inquiry interface tailored for Islamic guidance and jurisprudence queries.",
        "Reference citations linked directly to canonical sources and scholarly texts.",
        "Personalized bookmarks, history logs, and thematic categorization.",
        "Low-latency response streaming with fallback query caching."
      ],
      result: "[Sample text: Provides instantaneous, accessible answers to thousands of theological and lifestyle queries.]"
    }
  ],

  experience: [
    {
      id: "nexatech",
      role: "MERN Stack Developer",
      company: "NexaTech",
      type: "Remote",
      period: "Nov 2024 – Sep 2026",
      status: "Resolved",
      severity: "ok",
      summary: "Developed and maintained full-stack MERN web applications, architecting RESTful APIs and cross-functional user experiences.",
      details: [
        "Developed and maintained responsive web applications with React.js, Node.js, Express.js and MongoDB.",
        "Built RESTful APIs and integrated third-party services to extend application functionality.",
        "Implemented authentication and authorization with JWT and Firebase Auth.",
        "Collaborated with cross-functional teams to ship features on schedule and improve user experience."
      ]
    },
    {
      id: "seeking",
      role: "Looking for the next team",
      company: "Available for Hire",
      type: "Remote / Dhaka, BD",
      period: "Now",
      status: "Open",
      severity: "live",
      summary: "Actively seeking senior/mid-level Full Stack Developer, Frontend Engineer, or Backend Node.js roles.",
      details: [
        "Ready to contribute immediately to product teams building high-scale web and mobile platforms.",
        "Fluent in MERN architecture, TypeScript, Socket.io, Redis, and React Native.",
        "Open to remote opportunities worldwide as well as on-site / hybrid roles in Dhaka."
      ]
    }
  ],

  education: [
    {
      id: "polytechnic",
      institution: "Naogaon Polytechnic Institute",
      degree: "Diploma in Engineering – Computer Science & Technology",
      period: "2023 – 2026",
      location: "Naogaon, Bangladesh",
      status: "Completed",
      highlights: [
        "Rigorous coursework in Data Structures, Algorithms, Database Management, and Software Engineering principles.",
        "Selected as Institute-level participant in the Skills and Innovation Competition 2025."
      ]
    }
  ],

  achievements: [
    {
      title: "WebXtreme 25 Hackathon – Participant",
      organization: "NSU Tech Fest 2025, North South University",
      subtitle: "Co-powered by Programming Hero",
      year: "2025",
      type: "Hackathon",
      description: "Competed in high-intensity rapid web application prototyping alongside top regional developers."
    },
    {
      title: "Skills and Innovation Competition 2025 – Institute Participant",
      organization: "Naogaon Polytechnic Institute",
      subtitle: "Supported by the ASSET Project, Ministry of Education (27 Sep 2025)",
      year: "2025",
      type: "Competition",
      description: "Recognized at institute level for technical innovation and applied engineering execution."
    }
  ],

  certifications: [
    {
      title: "Complete Web Development Course",
      organization: "Programming Hero",
      year: "2023",
      credentialUrl: "https://programming-hero.com", // [Sample text: Certificate URL placeholder]
      skillsVerified: ["HTML5", "CSS3", "JavaScript ES6+", "React", "Node.js", "Express.js", "MongoDB"]
    }
  ],

  skillsMatrix: {
    frontend: [
      { name: "React.js", level: 95, tag: "Core" },
      { name: "Next.js", level: 88, tag: "SSR/SSG" },
      { name: "TypeScript", level: 85, tag: "Strict" },
      { name: "JavaScript (ES6+)", level: 95, tag: "Core" },
      { name: "Tailwind CSS", level: 98, tag: "Styling" },
      { name: "Redux / RTK Query", level: 90, tag: "State" },
      { name: "Framer Motion", level: 85, tag: "Motion" },
      { name: "HTML5 / CSS3", level: 98, tag: "Semantic" },
      { name: "Shadcn UI / DaisyUI", level: 92, tag: "UI Kits" },
      { name: "Material UI / Bootstrap", level: 88, tag: "Legacy" }
    ],
    backend: [
      { name: "Node.js", level: 92, tag: "Runtime" },
      { name: "Express.js", level: 94, tag: "HTTP" },
      { name: "REST APIs", level: 96, tag: "Arch" },
      { name: "JWT Auth", level: 92, tag: "Security" },
      { name: "Socket.io", level: 88, tag: "Real-time" },
      { name: "Prisma ORM", level: 82, tag: "Type-safe" },
      { name: "Mongoose", level: 92, tag: "ODM" }
    ],
    databases: [
      { name: "MongoDB", level: 94, tag: "NoSQL" },
      { name: "PostgreSQL", level: 84, tag: "Relational" },
      { name: "Redis", level: 80, tag: "Cache" },
      { name: "Firebase Firestore", level: 90, tag: "BaaS" }
    ],
    mobile: [
      { name: "React Native", level: 86, tag: "Cross-platform" },
      { name: "Mobile UI / UX", level: 88, tag: "Touch-first" },
      { name: "App Store & Play Store", level: 84, tag: "Publishing" }
    ],
    tools: [
      { name: "Git / GitHub", level: 92, tag: "VCS" },
      { name: "VS Code", level: 96, tag: "IDE" },
      { name: "Postman", level: 90, tag: "API Test" },
      { name: "Figma & Canva", level: 82, tag: "Design" },
      { name: "Vercel / Netlify", level: 94, tag: "Deploy" },
      { name: "Render / Supabase", level: 88, tag: "Cloud" }
    ],
    softSkills: [
      "Creative Thinking",
      "Time Management",
      "Teamwork & Communication",
      "Problem Solving Under Constraints"
    ],
    languages: [
      { name: "Bangla", proficiency: "Native" },
      { name: "English", proficiency: "Conversational" }
    ]
  }
};
