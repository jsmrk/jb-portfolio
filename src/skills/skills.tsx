import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import React from "react";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const Skills = ({ setSelectedPage }: Props) => {
  return (
    <section id="skills" className="h-full">
      <motion.div
        className=""
        onViewportEnter={() => setSelectedPage(SelectedPage.Skills)}
      >
        <h2 className="text-4xl font-bold mb-8">
          My <span className="text-primary-100">Skills</span>
        </h2>
      </motion.div>
    </section>
  );
};

export default Skills;
