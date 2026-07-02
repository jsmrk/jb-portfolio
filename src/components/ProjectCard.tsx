import { motion } from "framer-motion";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

type Props = {
  project: Project;
  wide?: boolean;
};

// Gallery card: clipped screenshot with hover zoom, serif title, tech meta line.
function ProjectCard({ project, wide = false }: Props) {
  const href = project.demoLink ?? project.ghLink;

  const body = (
    <>
      <div
        className={cn(
          "overflow-hidden rounded border border-line bg-card",
          wide ? "aspect-[32/10]" : "aspect-[16/10]"
        )}
      >
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <p className="mt-3 font-serif text-xl">
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
      <p className="kicker mt-1 tracking-[0.2em]">{project.technologies.join(" · ")}</p>
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
        className="group block"
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.article variants={fadeUp} className="group">
      {body}
    </motion.article>
  );
}

export default ProjectCard;
