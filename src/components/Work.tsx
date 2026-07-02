import { motion } from "framer-motion";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { fadeUp } from "@/lib/motion";
import { projects } from "@/data/projects";

const featured = projects.slice(0, -1);
const closer = projects[projects.length - 1];

// Work section: two-column gallery of projects with a full-width closing row.
function Work() {
  return (
    <Section id="work">
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-baseline justify-between gap-2"
      >
        <h2 className="font-serif text-3xl font-medium md:text-4xl">
          Selected <em>work</em>
        </h2>
        <p className="kicker">09 Projects — 2022–2026</p>
      </motion.div>
      <div className="mt-10 grid gap-x-7 gap-y-12 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <div className="mt-12">
        <ProjectCard project={closer} wide />
      </div>
    </Section>
  );
}

export default Work;
