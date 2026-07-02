import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeIn, riseUp } from "@/lib/motion";

// Slightly slower stagger than sections — this is the page-load moment.
const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Landing hero: masked headline lines rise in sequence on page load.
function Hero() {
  return (
    <section id="top" className="pt-28 md:pt-36">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStagger}
        className="mx-auto w-5/6 max-w-5xl pb-20 md:pb-28"
      >
        <motion.p variants={fadeIn} className="kicker">
          Front-End Developer — Tagum, Philippines
        </motion.p>
        <h1 className="mt-6 font-serif text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.1] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span variants={riseUp} className="block">
              Building calm, considered
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={riseUp} className="block">
              <em className="text-accent">interfaces</em> for the web.
            </motion.span>
          </span>
        </h1>
        <motion.p
          variants={fadeIn}
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted"
        >
          I'm Jess — I build production web apps with React, Next.js and
          TypeScript, and the occasional mobile app in Flutter.
        </motion.p>
        <motion.div variants={fadeIn} className="mt-9 flex items-center gap-7 text-sm">
          <a href="#work" className="link-grow text-accent">
            See selected work ↓
          </a>
          <span className="text-muted">Open to Web Developer roles</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
