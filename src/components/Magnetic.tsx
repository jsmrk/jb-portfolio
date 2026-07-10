import type { PointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number; // fraction of the cursor offset to follow (0–1)
};

// Magnetic: eases its child toward the cursor while hovered for a subtle pull,
// springing back on leave. No-op when the user prefers reduced motion.
function Magnetic({ children, className, strength = 0.25 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}

export default Magnetic;
