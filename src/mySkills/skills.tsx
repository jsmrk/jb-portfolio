/* eslint-disable @typescript-eslint/no-unused-vars */
import useMediaQuery from "@/hooks/useMediaQuery";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import SkillCard from "./skillCard";
import { GrMysql } from "react-icons/gr";
import {
  IoLogoCss3,
  IoLogoJavascript,
  IoLogoFirebase,
  IoLogoFigma,
} from "react-icons/io5";
import {
  FaHtml5,
  FaReact,
  FaGithub,
  FaJava,
  FaAngular,
  FaNodeJs,
  FaBootstrap,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiTypescript,
  SiFlutter,
  SiVisualbasic,
  SiSupabase,
  SiMongodb,
} from "react-icons/si";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const Skills = ({ setSelectedPage }: Props) => {
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");

  const cardsGrid5 =
    "md:grid md:grid-cols-5 md:gap-5 md:mt-5 justify-center items-center ";
  const cardsGrid4 =
    "md:grid md:grid-cols-4 md:gap-5 md:mt-5 justify-center items-center md:px-[100px]";

  return (
    <section
      id="myskills"
      className={`m:h-full mx-auto ${isAboveMediumScreen ? "pt-[150px]" : "pt-[500px]"} pb-[150px]`}
    >
      <motion.div
        className={`${isAboveLargeScreen ? " w-4/6 justify-between" : " w-5/6 items-center justify-center"}  md:mt-0 mt-[80px] mx-auto h-full`}
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
            My <span className="text-primary-100">Skills</span>
          </h2>
          <p>Technologies I have used and practiced</p>
        </motion.div>
        <div className="md:mt-[75px] mt-5 md:w-full">
          <motion.div
            className={`${cardsGrid4}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <SkillCard>
              <FaHtml5 className="h-10 w-auto" />
              <p>HTML</p>
            </SkillCard>
            <SkillCard>
              <IoLogoCss3 className="h-10 w-auto" />
              <p>CSS</p>
            </SkillCard>{" "}
            <SkillCard>
              <SiTailwindcss className="h-10 w-auto" />
              <p>Tailwind</p>
            </SkillCard>
            <SkillCard>
              <IoLogoJavascript className="h-10 w-auto" />
              <p>JavaScript</p>
            </SkillCard>
          </motion.div>

          <motion.div
            className={`${cardsGrid5}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <SkillCard>
              <FaReact className="h-10 w-auto" />
              <p>React</p>
            </SkillCard>
            <SkillCard>
              <SiFlutter className="h-10 w-auto" />
              <p>Flutter</p>
            </SkillCard>
            <SkillCard>
              <SiVisualbasic className="h-10 w-auto" />
              <p>VB.net</p>
            </SkillCard>
            <SkillCard>
              <IoLogoFirebase className="h-10 w-auto" />
              <p>Firebase</p>
            </SkillCard>
            <SkillCard>
              <SiTypescript className="h-10 w-auto" />
              <p>TypeScript</p>
            </SkillCard>
          </motion.div>

          <motion.div
            className={`${cardsGrid4}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <SkillCard>
              <SiSupabase className="h-10 w-auto" />
              <p>SupaBase</p>
            </SkillCard>
            <SkillCard>
              <GrMysql className="h-10 w-auto" />
              <p>MySQL</p>
            </SkillCard>
            <SkillCard>
              <FaGithub className="h-10 w-auto" />
              <p>GitHub</p>
            </SkillCard>
            <SkillCard>
              <FaAngular className="h-10 w-auto" />
              <p>Angular </p>
            </SkillCard>
          </motion.div>

          <motion.div
            className={`md:grid md:grid-cols-3 md:gap-5 md:mt-5 justify-center items-center md:px-[200px]`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <SkillCard>
              <FaJava className="h-10 w-auto" />
              <p>Java</p>
            </SkillCard>
            <SkillCard>
              <FaNodeJs className="h-10 w-auto" />
              <p>NodeJs</p>
            </SkillCard>
            <SkillCard>
              <SiMongodb className="h-10 w-auto" />
              <p>Mongodb </p>
            </SkillCard>
          </motion.div>

          <motion.div
            className={`md:grid md:grid-cols-2 md:gap-5 md:mt-5 justify-center items-center md:px-[300px]`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <SkillCard>
              <IoLogoFigma className="h-10 w-auto" />
              <p>Figma </p>
            </SkillCard>
            <SkillCard>
              <FaBootstrap className="h-10 w-auto" />
              <p>Bootstrap </p>
            </SkillCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
export default Skills;
