import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { aboutText, siteConfig } from "@/data/siteConfig";

const AboutSection = () => {
  const stats = [
    {
      value: siteConfig.stats.completedOrders,
      label: "Completed Orders",
      kind: "value" as const,
    },
    {
      value: siteConfig.stats.fiveStarReviews,
      label: "Verified 5-Star Reviews",
      kind: "value" as const,
    },
    {
      value: <Check className="h-10 w-10 text-primary" />,
      label: "International Clients",
      kind: "icon" as const,
    },
    {
      value: <Check className="h-10 w-10 text-primary" />,
      label: "Team-Based Delivery",
      kind: "icon" as const,
    },
  ];

  return (
    <motion.section
      id="about"
      className="section-padding relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 bg-glow-gradient opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-muted-foreground max-w-4xl leading-relaxed"
          >
            {aboutText.paragraph1} {aboutText.paragraph2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((item) => (
              <div
                key={item.label}
                className="glass-card px-8 py-6 border border-border/40"
              >
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  {item.kind === "value" ? (
                    <div className="text-4xl font-bold gradient-text">
                      {item.value}
                    </div>
                  ) : (
                    <div className="h-12 flex items-center justify-center">
                      {item.value}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 glow-sm transition-all hover:glow group"
            >
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
