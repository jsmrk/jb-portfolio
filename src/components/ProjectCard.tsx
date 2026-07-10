import { motion } from "framer-motion";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

type Props = {
  project: Project;
  className?: string;
};

// Bento card: a thumbnail header over a serif title, tagline, and tech line.
// The whole card lifts with a shadow on hover.
function ProjectCard({ project, className }: Props) {
  const href = project.demoLink ?? project.ghLink;
  const shell =
    "group flex flex-col overflow-hidden rounded-xl border border-line bg-card p-3 transition-colors duration-300 hover:border-accent hover:shadow-lg";

  const body = (
    <>
      <div className="relative flex-1 overflow-hidden rounded-lg bg-bg">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-[transform,filter] duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <div className="mt-3 shrink-0">
        <p className="font-serif text-lg leading-tight">
          {project.name}
          {href && (
            <span
              aria-hidden
              className="ml-1 inline-block text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          )}
        </p>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{project.tagline}</p>
        <p className="kicker mt-2 tracking-[0.2em]">{project.technologies.join(" · ")}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        variants={fadeUp}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} (opens in a new tab)`}
        className={cn(shell, className)}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.article variants={fadeUp} className={cn(shell, className)}>
      {body}
    </motion.article>
  );
}

export default ProjectCard;
