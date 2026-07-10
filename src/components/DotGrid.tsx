import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

type Rgb = [number, number, number];

// Parse a "#rrggbb" (or "#rgb") CSS value into an [r, g, b] tuple.
function hexToRgb(value: string): Rgb {
  const h = value.trim().replace("#", "");
  const full = h.length === 3 ? h.replace(/(.)/g, "$1$1") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const SPACING = 26; // px between dots
const RADIUS = 130; // px cursor influence radius
const BASE_R = 1.1; // resting dot radius
const MAX_R = 2.6; // dot radius directly under the cursor
const BASE_A = 0.22; // resting opacity (of the muted color)
const GLOW_A = 1; // opacity under the cursor (of the accent color)

// DotGrid: a calm, cursor-reactive dot field for the hero backdrop. Dots rest
// in the muted token and glow toward the accent near the pointer. Purely
// decorative (pointer-events-none) and static when reduced motion is preferred.
function DotGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  // Re-runs on theme flip so dot colors follow the active palette.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const base = hexToRgb(styles.getPropertyValue("--muted"));
    const glow = hexToRgb(styles.getPropertyValue("--accent"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number }[] = [];
    const pointer = { x: -9999, y: -9999 }; // smoothed position
    const target = { x: -9999, y: -9999 }; // raw pointer target

    // Size the canvas to its box and lay out a centered dot grid.
    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);
      const offX = (width - (cols - 1) * SPACING) / 2;
      const offY = (height - (rows - 1) * SPACING) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: offX + c * SPACING, y: offY + r * SPACING });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        let t = 1 - Math.sqrt(dx * dx + dy * dy) / RADIUS;
        t = t > 0 ? t * t : 0; // ease-in falloff
        const cr = Math.round(base[0] + (glow[0] - base[0]) * t);
        const cg = Math.round(base[1] + (glow[1] - base[1]) * t);
        const cb = Math.round(base[2] + (glow[2] - base[2]) * t);
        const a = BASE_A + (GLOW_A - BASE_A) * t;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, BASE_R + (MAX_R - BASE_R) * t, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    const loop = () => {
      pointer.x += (target.x - pointer.x) * 0.12; // trailing glow
      pointer.y += (target.y - pointer.y) * 0.12;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    if (reduce) {
      draw(); // static field, no interaction
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full ${className ?? ""}`}
    />
  );
}

export default DotGrid;
