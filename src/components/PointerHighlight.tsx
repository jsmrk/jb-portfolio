import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// The exact cursor path from Aceternity's pointer-highlight.
function Pointer() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
}

type Props = {
  children: ReactNode;
  active: boolean; // start once the headline has settled
};

// PointerHighlight: draws an accent border out to the word's measured size and
// pops a cursor at its bottom-right corner — matching Aceternity's animation,
// looping every 5s once active.
function PointerHighlight({ children, active }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setDim({ width: r.width, height: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  const { width, height } = dim;
  const times = [0, 0.2, 0.85, 1];
  const loop = { duration: 5, repeat: Infinity, ease: "easeInOut" as const, times };

  return (
    <span ref={ref} className="relative inline-block">
      <span className="relative z-[1]">{children}</span>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 border border-accent"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={
          !active
            ? undefined
            : reduce
              ? { width, height, opacity: 1 }
              : { width: [0, width, width, 0], height: [0, height, height, 0], opacity: [0, 1, 1, 0] }
        }
        transition={reduce ? { duration: 0.6, ease: "easeInOut" } : loop}
      />

      {/* Anchored to the wrapper's bottom-right corner via CSS, so it never
          depends on the measured size — only the small fly-in is animated. */}
      <span aria-hidden className="pointer-events-none absolute left-full top-full z-[2]">
        <motion.span
          className="block text-accent"
          initial={{ opacity: 0, x: -14, y: -14 }}
          animate={
            !active
              ? undefined
              : reduce
                ? { opacity: 1, x: 2, y: 2 }
                : { opacity: [0, 1, 1, 0], x: [-14, 2, 2, 2], y: [-14, 2, 2, 2] }
          }
          transition={reduce ? { duration: 0.6 } : loop}
        >
          <span className="block -rotate-90">
            <Pointer />
          </span>
        </motion.span>
      </span>
    </span>
  );
}

export default PointerHighlight;
