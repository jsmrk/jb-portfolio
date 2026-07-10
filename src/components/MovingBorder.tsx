import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

type Props = {
  visible: boolean;
  duration?: number; // seconds for one full lap
};

const DASH = 44; // length of the traveling segment, px
const STROKE = 1.5;
const INSET = STROKE / 2;

// MovingBorder: a solid hairline ring with an accent dash that travels around
// it. The dash is part of the SVG stroke, so it follows the rounded corners
// exactly (no chord/tangent glitch). Render as an absolute layer.
function MovingBorder({ visible, duration = 4 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [len, setLen] = useState(0);
  const offset = useMotionValue(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (rectRef.current) setLen(rectRef.current.getTotalLength());
  }, [size]);

  useAnimationFrame((t) => {
    if (!len) return;
    offset.set(-((t / (duration * 1000)) % 1) * len);
  });

  const { w, h } = size;
  const rect = {
    x: INSET,
    y: INSET,
    width: Math.max(w - STROKE, 0),
    height: Math.max(h - STROKE, 0),
    rx: Math.max((h - STROKE) / 2, 0),
    ry: Math.max((h - STROKE) / 2, 0),
    fill: "none",
  };

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <svg width={w} height={h} className="absolute left-0 top-0 overflow-visible">
        <rect {...rect} stroke="var(--line)" strokeWidth={STROKE} />
        <motion.rect
          ref={rectRef}
          {...rect}
          stroke="var(--accent)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${DASH} ${Math.max(len - DASH, 0.001)}`}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
    </div>
  );
}

export default MovingBorder;
