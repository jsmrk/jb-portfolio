import type { Variants } from "framer-motion";

// Parent container that staggers its children's entrance animations.
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Fade-up entrance used by section content revealed on scroll.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.6, 0.2, 1] },
  },
};

// Simple fade-in used in the hero load sequence.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// A line of text rising from behind an overflow-hidden mask (hero headline).
export const riseUp: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.2, 0.65, 0.2, 1] },
  },
};

// Shared whileInView settings: reveal once, when 20% of the block is visible.
export const viewportOnce = { once: true, amount: 0.2 } as const;
