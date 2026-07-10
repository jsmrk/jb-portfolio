import { motion } from "framer-motion";

// A few faint hairlines that slowly draw in when scrolled into view, used as an
// ambient backdrop. Stretched to fill its container; purely decorative.
const PATHS = [
  "M40 0 C 90 120, 10 250, 70 440",
  "M180 0 C 140 150, 230 270, 170 440",
  "M320 0 C 380 120, 300 280, 360 440",
  "M470 0 C 430 160, 520 300, 460 440",
];

function BackgroundLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 520 440"
      preserveAspectRatio="none"
      fill="none"
    >
      {PATHS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.6, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

export default BackgroundLines;
