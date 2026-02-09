import { motion } from "framer-motion";
import { Star, CheckCircle, Globe, Users } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const achievements = [
  {
    icon: CheckCircle,
    value: siteConfig.stats.completedOrders,
    label: "Completed Orders",
  },
  {
    icon: Star,
    value: siteConfig.stats.fiveStarReviews,
    label: "5-Star Reviews",
  },
  {
    icon: Globe,
    value: siteConfig.stats.internationalClients,
    label: "International Clients",
  },
  {
    icon: Users,
    value: siteConfig.stats.teamDelivery,
    label: "Team Delivery",
  },
];

const AchievementsSection = () => {
  return (
    <motion.section
      id="achievements"
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
          className="text-center mb-12"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Trusted by <span className="gradient-text">Clients Worldwide</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center hover-lift group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          <div className="px-10 py-3 rounded-full border border-primary/30 bg-primary/5 text-center min-w-[260px]">
            <span className="text-primary font-semibold">Top Rated Seller</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AchievementsSection;
