import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// TracingBeam: a thin rail down the left of a section that fills with the
// accent as the reader scrolls through it — reading progress for the timeline.
// Desktop-only and decorative; the rail is scroll-linked, not autoplaying.
function TracingBeam({ targetRef }: { targetRef: RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 25%", "end 75%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-1 left-0 hidden w-px md:block"
    >
      <div className="absolute inset-0 bg-line" />
      <motion.div
        style={{ height: fill }}
        className="absolute inset-x-0 top-0 bg-gradient-to-b from-transparent via-accent to-accent"
      />
      <motion.span
        style={{ top: fill }}
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_6px_1px_var(--accent)]"
      />
    </div>
  );
}

export default TracingBeam;
