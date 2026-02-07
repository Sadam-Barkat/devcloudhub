import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, MessageCircle, Heart } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const footerLinks = [
  { name: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { name: "Facebook", href: siteConfig.links.facebook, icon: Facebook },
  { name: "Instagram", href: siteConfig.links.instagram, icon: Instagram },
  { name: "WhatsApp", href: siteConfig.links.whatsapp, icon: MessageCircle },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-4 sm:py-5 border-t border-border/50 relative overflow-visible"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-3"
        >
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center -my-6 sm:-my-7"
            aria-label={`${siteConfig.name} home`}
          >
            <img
              src="/logo/DEV-CLOUD-HUB-LOGO.png"
              alt={`${siteConfig.name} logo`}
              className="h-32 w-auto sm:h-36"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* Social Icons */}
          <div className="flex gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright & Built with */}
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm text-muted-foreground">
              {siteConfig.name} © {currentYear} All Rights Reserved
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;