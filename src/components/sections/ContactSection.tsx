import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  return (
    <motion.section
      id="contact"
      className="section-padding relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 bg-glow-gradient opacity-30" />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="gradient-text">Contact Us</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Got an idea or a project in mind? We usually respond within 24 hours.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8 border border-border/50">
            <ContactForm />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
