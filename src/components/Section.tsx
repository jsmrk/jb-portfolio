import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SectionId } from "@/types";
import { cn } from "@/lib/cn";
import { stagger, viewportOnce } from "@/lib/motion";

type Props = {
  id: SectionId;
  className?: string;
  children: ReactNode;
};

// Section shell: anchor target, top divider, page gutter, scroll-staggered reveal.
function Section({ id, className, children }: Props) {
  return (
    <section id={id}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger}
        className={cn("mx-auto w-5/6 max-w-5xl py-12 md:py-16", className)}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default Section;
