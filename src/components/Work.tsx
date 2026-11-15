import { useState } from "react";
import { FiArrowDown, FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import "./projects.css";

const featuredProjects = projects.filter((project) => project.featured);
const archivedProjects = projects.filter((project) => !project.featured);

// Tall collections stay readable without a section-wide intersection threshold,
// which can never be reached on a fresh mobile visit.
function Work() {
  const [archiveOpen, setArchiveOpen] = useState(false);

  return (
    <section
      id="work"
      className="projects-section"
      aria-labelledby="projects-title"
    >
      <div className="projects-shell mx-auto w-5/6 max-w-5xl">
        <header className="projects-header">
          <div>
            <p className="projects-eyebrow">
              <span aria-hidden="true" /> The work · 2022–2026
            </p>
            <h2 id="projects-title">
              Selected <em>projects.</em>
            </h2>
            <p className="projects-intro">
              Websites, finance tools, and the systems that keep a university
              moving. A closer look at what I build.
            </p>
          </div>
          <p className="projects-index">
            <span>{String(featuredProjects.length).padStart(2, "0")}</span>
            featured projects
            <br />
            from a collection of {projects.length}
          </p>
        </header>
        <div className="projects-featured" aria-label="Featured projects">
          <div className="projects-supporting">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                variant="featured"
              />
            ))}
          </div>
        </div>
        {archivedProjects.length > 0 && (
          <div className="projects-archive">
            <div className="projects-archive__header">
              <div>
                <p className="projects-eyebrow">The rest of the collection</p>
                <h3 id="projects-archive-title">More to explore.</h3>
                <p>
                  Websites, mobile apps, and the projects that started it all.
                </p>
              </div>
              <button
                type="button"
                className="projects-archive__toggle"
                aria-expanded={archiveOpen}
                aria-controls="projects-archive-grid"
                onClick={() => setArchiveOpen((open) => !open)}
              >
                {archiveOpen
                  ? "Show fewer projects"
                  : `Browse ${archivedProjects.length} more projects`}
                {archiveOpen ? (
                  <FiArrowUp aria-hidden="true" size={17} />
                ) : (
                  <FiArrowDown aria-hidden="true" size={17} />
                )}
              </button>
            </div>
            <p className="sr-only" role="status">
              {archiveOpen
                ? `All ${projects.length} projects are shown.`
                : `${featuredProjects.length} featured projects are shown.`}
            </p>
            <div
              id="projects-archive-grid"
              className="projects-archive-grid"
              role="region"
              aria-labelledby="projects-archive-title"
              hidden={!archiveOpen}
            >
              {archivedProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        )}
        <div className="projects-contact">
          <p>
            Have something in mind? <span>I’d love to hear about it.</span>
          </p>
          <a href="#contact">
            Let’s talk <FiArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Work;
