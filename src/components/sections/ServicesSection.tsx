import { motion } from "framer-motion";
import { services } from "@/data/services";

const ServicesSection = () => {
  return (
    <motion.section
      id="services"
      className="section-padding relative"
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
            What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            My <span className="gradient-text">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 hover-lift group relative overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-cyan-500/5 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
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

export default ServicesSection;
