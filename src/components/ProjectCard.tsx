import { useId } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  variant?: "lead" | "featured" | "archive";
};

// Keep context and external actions separate so both demo and source remain
// available without making the whole card an ambiguous click target.
function ProjectCard({ project, variant = "archive" }: Props) {
  const titleId = useId();
  const previewHost = project.demoLink
    ? new URL(project.demoLink).hostname
    : null;

  return (
    <article
      className={cn("project-card", `project-card--${variant}`)}
      aria-labelledby={titleId}
    >
      <figure className="project-card__preview">
        <div className="project-card__window">
          {variant !== "archive" && previewHost && (
            <div className="project-card__browser" aria-hidden="true">
              <span className="project-card__dots">
                <i />
                <i />
                <i />
              </span>
              <span>{previewHost}</span>
              <FiArrowUpRight size={12} />
            </div>
          )}
          <div className="project-card__image-frame">
            <img
              src={project.image}
              alt={`${project.name} interface preview`}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </figure>
      <div className="project-card__body">
        {project.category && variant !== "archive" && (
          <p className="project-card__category">{project.category}</p>
        )}
        <h3 id={titleId} className="project-card__title">
          {project.name}
        </h3>
        <p className="project-card__description">{project.description}</p>
        <ul
          className="project-card__technologies"
          aria-label={`Technologies used for ${project.name}`}
        >
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-card__actions">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website (opens in a new tab)`}
              className="project-link project-link--primary"
            >
              Visit website <FiArrowUpRight aria-hidden="true" size={16} />
            </a>
          )}
          {project.ghLink && (
            <a
              href={project.ghLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${project.name} (opens in a new tab)`}
              className="project-link project-link--source"
            >
              <FiGithub aria-hidden="true" size={15} /> View code
            </a>
          )}
          {!project.demoLink && !project.ghLink && (
            <span className="project-card__preview-note">
              Interface preview
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
