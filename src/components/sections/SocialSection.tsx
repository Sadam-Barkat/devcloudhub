import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: siteConfig.links.linkedin,
    color: "hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: siteConfig.links.facebook,
    color: "hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: siteConfig.links.instagram,
    color: "hover:bg-[#E4405F]/20 hover:border-[#E4405F]/50",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: siteConfig.links.whatsapp,
    color: "hover:bg-[#25D366]/20 hover:border-[#25D366]/50",
  },
];

const SocialSection = () => {
  return (
    <motion.section
      className="py-16 relative"
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
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground">
            Follow me on social media or reach out directly
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`glass-card px-6 py-4 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 group ${social.color}`}
            >
              <social.icon className="w-7 h-7 group-hover:text-primary transition-colors" />
              <span className="font-medium text-lg">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SocialSection;