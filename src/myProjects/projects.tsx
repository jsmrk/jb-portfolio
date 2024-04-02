/* eslint-disable @typescript-eslint/no-unused-vars */
import useMediaQuery from "@/hooks/useMediaQuery";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import ProjectsList from "./projectsCard";
import TopWave from "@/assets/skill-bottom-wave.png";
import BottomWave from "@/assets/contact-top-wave.png";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const MyProjects = ({ setSelectedPage }: Props) => {
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");

  return (
    <section id="myprojects" className="">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Projects)}
      >
        <div>
          <img src={TopWave} alt="top-wave" />
        </div>
        <div>
          <div className=" bg-primary-300  ">
            <div
              className={`${isAboveLargeScreen ? " w-4/6 justify-between" : " w-5/6 items-center justify-center"}  md:mt-0 mx-auto`}
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
                  My <span className="text-primary-100">Projects</span>
                </h2>
                <p>Projects I have created and develop</p>
              </motion.div>
              <ProjectsList />
            </div>
          </div>
        </div>
        <div>
          <img src={BottomWave} alt="top-wave" />
        </div>
      </motion.div>
    </section>
  );
};

export default MyProjects;
