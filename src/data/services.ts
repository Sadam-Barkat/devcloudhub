import { Code, Cpu, Database, Globe, Cog, LayoutDashboard, MessageSquare } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Building modern, responsive, and high-performance websites and web applications.",
    technologies: ["Next.js", "React", "Node.js", "FastAPI", "Django", "Flask"],
    icon: Globe,
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Development",
    description: "Creating intelligent AI agents and automation systems that think and act autonomously.",
    technologies: ["LangChain", "LangGraph", "OpenAI Agent SDK"],
    icon: Cpu,
  },
  {
    id: "database-engineering",
    title: "Database Engineering",
    description: "Designing and optimizing robust database architectures for scalable applications.",
    technologies: ["MySQL", "PostgreSQL", "MongoDB"],
    icon: Database,
  },
  {
    id: "apis-integrations",
    title: "APIs & Integrations",
    description: "Building seamless API connections and third-party integrations for your systems.",
    technologies: ["REST", "GraphQL", "Webhooks"],
    icon: Code,
  },
  {
    id: "automation-workflows",
    title: "Automation Workflows",
    description: "Streamlining business processes with intelligent automation and workflow systems.",
    technologies: ["n8n", "Zapier", "Custom Scripts"],
    icon: Cog,
  },
  {
    id: "dashboards-tools",
    title: "Dashboards & Internal Tools",
    description: "Creating powerful admin panels and internal tools for efficient business operations.",
    technologies: ["React", "Tailwind", "Charts"],
    icon: LayoutDashboard,
  },
  {
    id: "tech-consultation",
    title: "Tech Consultation",
    description: "Offering strategic advice on technology choices and architecture decisions.",
    technologies: ["Strategy", "Architecture", "Planning"],
    icon: MessageSquare,
  },
];
