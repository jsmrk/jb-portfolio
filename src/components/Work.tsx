import { useState } from "react";
import type { PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

// Per-project bento spans (applied from md up). Chosen so the 3-column grid
// tiles with no gaps: every row of the twelve cards sums to three columns
// (2+1, 1+1+1, 1+2, 1+1+1, 2+1).
const SPANS = [
  "md:col-span-2",
  "",
  "",
  "",
  "",
  "",
  "md:col-span-2",
  "",
  "",
  "",
  "md:col-span-2",
  "",
];

type TileProps = {
  project: Project;
  span: string;
  index: number;
  hovered: number | null;
  onHover: (index: number | null) => void;
};

// A bento cell that wobbles toward the cursor and shows the shared accent halo
// while hovered.
function ProjectTile({ project, span, index, hovered, onHover }: TileProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const active = hovered === index;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: ((e.clientX - r.left) / r.width - 0.5) * 14,
      y: ((e.clientY - r.top) / r.height - 0.5) * 14,
    });
  };

  return (
    <div
      className={cn("relative isolate transition-transform duration-200 ease-out", span)}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${active ? 1.015 : 1})` }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => {
        onHover(null);
        setOffset({ x: 0, y: 0 });
      }}
      onPointerMove={handleMove}
    >
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="project-hover"
            aria-hidden
            className="absolute -inset-2 z-0 rounded-2xl"
            style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>
      <ProjectCard project={project} className="relative z-10 h-full" />
    </div>
  );
}

// Personal projects: a bento gallery of screenshot tiles that wobble on hover,
// with an accent halo that slides behind whichever tile is active.
function Work() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="work">
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-baseline justify-between gap-2"
      >
        <h2 className="font-serif text-3xl font-medium md:text-4xl">
          Personal <em>projects</em>
        </h2>
        <p className="kicker">12 Projects — 2022–2026</p>
      </motion.div>
      <div className="mt-8 grid auto-rows-[20rem] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectTile
            key={project.name}
            project={project}
            span={SPANS[i]}
            index={i}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </div>
    </Section>
  );
}

export default Work;
