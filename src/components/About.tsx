import { useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import { site } from "@/data/site";
import { toolboxIcons } from "@/lib/toolboxIcons";

const LEAD =
  "For the past few years I've been building production web apps for fintech, banking, and healthcare companies — working mainly in React and Next.js, on remote-first teams.";

const BIO =
  "Alongside that, I spent a year teaching computer science at the University of Mindanao — explaining code to students taught me to write it more clearly. The work has ranged across regulated products where clarity and trust matter: payment and treasury platforms, prescribing tools, and banking and public-sector sites. I care about interfaces that feel effortless — fast, legible, and honest about what they do. I've kept pace with the fast, AI-assisted shift in how we build — working day to day with coding tools like Cursor and Claude Code to move faster without cutting corners. Outside client work I build my own things: web apps, mobile apps, and the occasional experiment that never leaves localhost.";

// About section: editorial side label, lead, bio, and inline toolbox list.
function About() {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <Section id="about" className="grid gap-8 md:grid-cols-[160px_1fr]">
      <motion.p variants={fadeUp} className="kicker">
        About
      </motion.p>
      <div>
        <motion.p variants={fadeUp} className="font-serif text-2xl leading-snug md:text-[1.65rem]">
          {LEAD}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-sm leading-loose text-muted">
          {BIO}
        </motion.p>
        <motion.div variants={fadeUp}>
          <p className="kicker mt-8">Toolbox</p>
          <div className="group/tools relative mt-3">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-3 -inset-y-3 opacity-0 transition-opacity duration-500 group-hover/tools:opacity-100"
              style={{
                backgroundImage:
                  "radial-gradient(color-mix(in srgb, var(--accent) 55%, transparent) 1px, transparent 1.5px)",
                backgroundSize: "14px 14px",
                maskImage:
                  "radial-gradient(ellipse 60% 70% at 50% 50%, #000 15%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 60% 70% at 50% 50%, #000 15%, transparent 75%)",
              }}
            />
            <ul className="relative flex flex-wrap gap-2 text-sm">
              {site.toolbox.map((label, i) => {
                const tool = toolboxIcons[label];
                const Icon = tool?.Icon;
                return (
                  <li
                    key={label}
                    onMouseEnter={() => setHoveredTool(i)}
                    onMouseLeave={() => setHoveredTool(null)}
                    className="group relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 transition-all duration-200 hover:z-30 hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
                    style={tool ? ({ "--brand": tool.brand } as CSSProperties) : undefined}
                  >
                    <AnimatePresence>
                      {hoveredTool === i && (
                        <motion.span
                          layoutId="tool-hover"
                          aria-hidden
                          className="pointer-events-none absolute inset-0 z-0 rounded-full"
                          style={{ background: "color-mix(in srgb, var(--accent) 16%, transparent)" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}
                    </AnimatePresence>
                    {Icon && (
                      <Icon
                        aria-hidden
                        className="relative z-10 text-[0.95rem] text-muted transition-colors duration-200 group-hover:[color:var(--brand)]"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                    {tool && Icon && (
                      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 translate-y-1 rounded-lg border border-line bg-card p-3 text-left opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="flex items-center gap-2">
                          <Icon aria-hidden className="text-base" style={{ color: tool.brand }} />
                          <span className="text-sm font-medium text-ink">{label}</span>
                        </span>
                        <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                          {tool.blurb}
                        </span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

export default About;
