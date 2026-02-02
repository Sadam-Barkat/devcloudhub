import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const publicProjects = projects.filter((p) => !p.isPrivate);
  const privateProjects = projects.filter((p) => p.isPrivate);

  return (
    <motion.section
      id="projects"
      className="section-padding relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Public Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 auto-rows-fr">
          {publicProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-7 hover-lift group relative overflow-hidden cursor-pointer h-full"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-cyan-500/10 transition-all duration-500" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Project Type Label */}
                <span className="text-primary text-sm font-medium mb-2 block">
                  {project.projectType}
                </span>
                
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Private Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Private Projects</h3>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 auto-rows-fr">
          {privateProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-7 group relative overflow-hidden hover-lift h-full"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-cyan-500/10 transition-all duration-500" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-primary text-sm font-semibold mb-2 block">
                      {project.projectType || "Private Project"}
                    </span>
                    <h4 className="text-2xl font-semibold leading-tight">{project.title}</h4>
                  </div>

                  {/* Gold lock badge */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
