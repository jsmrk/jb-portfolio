import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import PointerHighlight from "@/components/PointerHighlight";
import { cn } from "@/lib/cn";
import { fadeIn, riseUp } from "@/lib/motion";

// Slightly slower stagger than sections — this is the page-load moment.
const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Landing hero: masked headline lines rise in sequence on page load, then a
// pointer-highlight draws around the "interfaces" accent word.
function Hero() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="top" className="pt-28 md:pt-36">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStagger}
        className="mx-auto w-5/6 max-w-5xl pb-20 md:pb-28"
      >
        <motion.p variants={fadeIn} className="kicker">
          Full-Stack Web Developer — Tagum, Philippines
        </motion.p>
        <h1 className="mt-6 font-serif text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.1] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span variants={riseUp} className="block">
              Building calm, considered
            </motion.span>
          </span>
          <span className={cn("block", revealed ? "overflow-visible" : "overflow-hidden")}>
            <motion.span
              variants={riseUp}
              className="block"
              onAnimationComplete={() => setRevealed(true)}
            >
              <PointerHighlight active={revealed}>
                <em className="text-accent">interfaces</em>
              </PointerHighlight>{" "}
              for the web.
            </motion.span>
          </span>
        </h1>
        <motion.div
          variants={fadeIn}
          className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm"
        >
          <Magnetic>
            <a
              href="#work"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent bg-accent px-5 py-3 font-medium text-bg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Explore my projects
            </a>
          </Magnetic>
          <span className="text-muted">Open to Web Developer roles</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
