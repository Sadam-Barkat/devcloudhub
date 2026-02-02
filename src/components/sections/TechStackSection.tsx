import { motion } from "framer-motion";
import { techStack, categoryLabels, TechItem } from "@/data/techStack";

const TechStackSection = () => {
  const categories = Object.keys(categoryLabels) as TechItem["category"][];

  return (
    <motion.section
      id="tech"
      className="section-padding relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 bg-glow-gradient opacity-30" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Technologies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        {/* Horizontal Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, catIndex) => {
            const categoryTech = techStack.filter((t) => t.category === category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  {categoryLabels[category]}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {categoryTech.map((tech) => (
                    <motion.span
                      key={tech.name}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-full bg-muted/50 text-foreground text-sm font-medium border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated tech pills scrolling */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="overflow-hidden">
            <div 
              className="flex gap-4 animate-scroll"
              style={{ "--scroll-duration": "40s" } as React.CSSProperties}
            >
              {[...techStack, ...techStack].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 px-4 py-2 rounded-full border border-border/50 bg-card/30"
                >
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechStackSection;