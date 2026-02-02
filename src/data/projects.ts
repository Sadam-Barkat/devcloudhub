export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  isPrivate: boolean;
  category: "public" | "private";
  projectType: string;
}

export const projects: Project[] = [
  {
    id: "noveltavern",
    title: "NovelTavern",
    description: "AI-assisted writing platform with smooth UI and fast performance.",
    technologies: ["Next.js", "Tailwind"],
    link: "https://noveltavern.com/",
    isPrivate: false,
    category: "public",
    projectType: "AI Writing Platform",
  },
  {
    id: "docassist",
    title: "DocAssist",
    description: "Doctor assistant website powered by Agentic AI with an intelligent chatbot that handles patient queries and assistance.",
    technologies: ["Next.js", "LangChain", "LangGraph", "OpenAI Agent SDK"],
    link: "https://docassist-web.vercel.app/",
    isPrivate: false,
    category: "public",
    projectType: "Agentic AI Project",
  },
  {
    id: "imkautos",
    title: "IMK Autos",
    description: "A modern website for car listings and automotive services.",
    technologies: ["React/Next.js", "Tailwind"],
    link: "https://imkautos.co.uk/",
    isPrivate: false,
    category: "public",
    projectType: "Web Development",
  },
  {
    id: "internationaltijarat",
    title: "International Tijarat",
    description: "Global trade information portal with clean UI and responsive design.",
    technologies: ["Next.js", "Tailwind"],
    link: "https://internationaltijarat.com/",
    isPrivate: false,
    category: "public",
    projectType: "Web Development",
  },
  {
    id: "inventory-system",
    title: "Inventory Management System",
    description: "Complete inventory tracking and management solution for businesses.",
    technologies: ["MySQL", "PostgreSQL", "MongoDB"],
    isPrivate: true,
    category: "private",
    projectType: "Database Project",
  },
  {
    id: "student-records",
    title: "Student Record Automation",
    description: "Automated student record management and reporting system.",
    technologies: ["MySQL", "PostgreSQL", "MongoDB"],
    isPrivate: true,
    category: "private",
    projectType: "Database Project",
  },
  {
    id: "crm-database",
    title: "CRM Database",
    description: "Custom CRM database solution for client relationship management.",
    technologies: ["MySQL", "PostgreSQL", "MongoDB"],
    isPrivate: true,
    category: "private",
    projectType: "Database Project",
  },
  {
    id: "data-processing",
    title: "Reporting & Data Processing",
    description: "Data processing workflows and automated reporting systems.",
    technologies: ["MySQL", "PostgreSQL", "MongoDB"],
    isPrivate: true,
    category: "private",
    projectType: "Database Project",
  },
];
