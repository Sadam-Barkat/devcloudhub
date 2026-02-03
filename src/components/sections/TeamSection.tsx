import { motion } from "framer-motion";
import { teamMembers } from "@/data/team";

const TeamSection = () => {
  return (
    <motion.section
      id="team"
      className="pt-14 md:pt-20 lg:pt-24 pb-10 md:pb-14 lg:pb-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Our Experts
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Meet The <span className="gradient-text">Team</span>
          </h2>
        </motion.div>

        {/* Orbit Animation Container */}
        <div className="relative h-[400px] sm:h-[450px] flex items-center justify-center">
          {/* Globe Backdrop */}
          <div className="absolute z-0 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px]">
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-2xl" />

            {/* Wireframe sphere */}
            <div className="absolute inset-0 globe-spin">
              <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
                <defs>
                  <radialGradient id="globeFade" cx="50%" cy="50%" r="50%">
                    <stop offset="55%" stopColor="rgba(0,0,0,1)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </radialGradient>
                  <mask id="globeMask">
                    <rect width="200" height="200" fill="url(#globeFade)" />
                  </mask>
                </defs>

                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="transparent"
                  stroke="hsl(var(--primary))"
                  strokeOpacity="0.20"
                  strokeWidth="2"
                />

                {/* Parallels */}
                {[0.75, 0.55, 0.35].map((scale, idx) => (
                  <ellipse
                    key={`p-${idx}`}
                    cx="100"
                    cy="100"
                    rx={92}
                    ry={92 * scale}
                    fill="transparent"
                    stroke="hsl(var(--primary))"
                    strokeOpacity="0.12"
                    strokeWidth="1.5"
                    mask="url(#globeMask)"
                  />
                ))}

                {/* Meridians */}
                {[0, 25, 50, 75, 100, 125, 150].map((deg) => (
                  <g key={`m-${deg}`} transform={`rotate(${deg} 100 100)`} mask="url(#globeMask)">
                    <ellipse
                      cx="100"
                      cy="100"
                      rx="52"
                      ry="92"
                      fill="transparent"
                      stroke="hsl(var(--primary))"
                      strokeOpacity="0.10"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Second layer for depth */}
            <div className="absolute inset-0 globe-spin-rev opacity-60">
              <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="transparent"
                  stroke="hsl(var(--primary))"
                  strokeOpacity="0.08"
                  strokeWidth="2"
                />
                <g transform="rotate(30 100 100)">
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="64"
                    ry="92"
                    fill="transparent"
                    stroke="hsl(var(--primary))"
                    strokeOpacity="0.09"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Center Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center glow"
          >
            <div className="text-center px-2">
              <span className="text-sm sm:text-base font-bold text-primary-foreground leading-tight block">DevCloudHub</span>
            </div>
          </motion.div>

          {/* Orbit Rings */}
          <div className="absolute z-10 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border border-primary/20" />
          <div className="absolute z-10 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-primary/10" />

          {/* Orbiting Team Members */}
          {teamMembers.map((member, index) => {
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute z-20"
                style={{
                  animation: `orbit-close 20s linear infinite`,
                  animationDelay: `${-member.orbitDelay}s`,
                }}
              >
                <div className="glass-card team-card p-2.5 flex flex-col items-center gap-1.5 hover-lift cursor-default">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-primary/20 bg-card/30">
                    <img
                      src={member.imageSrc}
                      alt={member.role}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="team-role text-[11px] font-medium text-center leading-tight">
                    {member.role}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style>{`
        .team-card {
          width: 124px;
          min-height: 112px;
          justify-content: flex-start;
        }

        .team-role {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.4em;
          max-width: 110px;
        }

        .globe-spin {
          animation: globe-spin 18s linear infinite;
        }

        .globe-spin-rev {
          animation: globe-spin-rev 28s linear infinite;
        }

        @keyframes globe-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes globe-spin-rev {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes orbit-close {
          from {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
          }
        }
        
        @media (min-width: 640px) {
          .team-card {
            width: 132px;
            min-height: 116px;
          }

          .team-role {
            max-width: 116px;
          }

          @keyframes orbit-close {
            from {
              transform: rotate(0deg) translateX(170px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(170px) rotate(-360deg);
            }
          }
        }
      `}</style>
    </motion.section>
  );
};

export default TeamSection;