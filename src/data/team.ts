export interface TeamMember {
  id: string;
  role: string;
  imageSrc: string;
  orbitDelay: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: "frontend",
    role: "Frontend Developer",
    imageSrc: "/Team-Images/Frontend_Developer.jpeg",
    orbitDelay: 0,
  },
  {
    id: "backend",
    role: "Backend Developer",
    imageSrc: "/Team-Images/Backend_Developer.PNG",
    orbitDelay: 5,
  },
  {
    id: "database",
    role: "Database Engineer",
    imageSrc: "/Team-Images/DataBase_Engineer.jpeg",
    orbitDelay: 10,
  },
  {
    id: "ai",
    role: "AI Specialist",
    imageSrc: "/Team-Images/AI_Specialist.jpeg",
    orbitDelay: 15,
  },
];
