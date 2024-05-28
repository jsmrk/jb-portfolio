import useMediaQuery from "@/hooks/useMediaQuery";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { SkillsList } from "@/shared/skillsData";
import { useState } from "react";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const Skills = ({ setSelectedPage }: Props) => {
  const [hoveredDivIndex, setHoveredDivIndex] = useState<number | null>(null);

  const handleMouseEnter = (i: number) => {
    setHoveredDivIndex(i);
  };

  const handleMouseLeave = () => {
    setHoveredDivIndex(null);
  };

  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");
  // const cardsGrid5 =
  //   "md:grid md:grid-cols-5 md:gap-5 md:mt-5 justify-center items-center ";
  // const cardsGrid4 =
  //   "md:grid md:grid-cols-4 md:gap-5 md:mt-5 justify-center items-center md:px-[100px]";

  return (
    <section id="myskills">
      <motion.div
        className={`${isAboveLargeScreen ? " w-4/6 justify-between" : " w-5/6 items-center justify-center"}  md:mt-0 pt-[100px] pb-[150px] mx-auto`}
        onViewportEnter={() => setSelectedPage(SelectedPage.MySkills)}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h2 className="text-4xl font-bold mb-1">
            <span className="text-primary-100">Technologies</span>
          </h2>
          <p>These are the technologies I have tried using</p>
        </motion.div>
        <div className="mt-11 sm:flex flex-wrap gap-8 justify-center items-center">
          {SkillsList.map((tech, i) => (
            <motion.div
              id="skillCard"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              key={tech.color && tech.name}
              className={`mt-5 sm:mt-0 flex items-center justify-center gap-3 bg-primary-300 text-white rounded-full py-5 px-20 hover:cursor-pointer hover:scale-110 hover:text-white transition-all duration-300`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: hoveredDivIndex === i ? tech.color : "bg",
              }}
            >
              <div className="text-3xl">
                <tech.icon />
              </div>
              <p className="capitalize">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
export default Skills;
