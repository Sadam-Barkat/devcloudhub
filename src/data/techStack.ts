export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "automation" | "database" | "language";
}

export const techStack: TechItem[] = [
  // Frontend
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "Flask", category: "backend" },
  
  // AI
  { name: "LangChain", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "OpenAI Agent SDK", category: "ai" },
  
  // Automation
  { name: "n8n", category: "automation" },
  { name: "Zapier", category: "automation" },
  
  // Databases
  { name: "MySQL", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  
  // Languages
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
];

export const categoryLabels: Record<TechItem["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  ai: "AI",
  automation: "Automation",
  database: "Databases",
  language: "Languages",
};
