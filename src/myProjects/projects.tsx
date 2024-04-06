/* eslint-disable @typescript-eslint/no-unused-vars */
import useMediaQuery from "@/hooks/useMediaQuery";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import ProjectsList from "./projectsCard";
import TopWave from "@/assets/skill-bottom-wave.png";
import BottomWave from "@/assets/contact-top-wave.png";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { MyProjectsList, Technologies } from "./projectsData";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const MyProjects = ({ setSelectedPage }: Props) => {
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");

  return (
    <section id="myprojects" className="relative">
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
              <div className="mt-11 md:w-full md:grid md:grid-cols-3 gap-11 mx-auto drop-shadow-2xl shadow-white">
                {MyProjectsList.map((project, i) => (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="bg-white rounded-xl overflow-hidden text-black md:flex-row justify-start items-start md:mt-0 mt-11 "
                  >
                    <div className="hover:transition-transform hover:scale-110 duration-200 md:h-[150px] h-[350px] ">
                      <img
                        src={project.image}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="px-7 mt-3 pb-5 mb-0">
                      <div className="font-bold text-xl ">{project.name}</div>
                      <div className="font-bold text-sm line-clamp-1">
                        {project.system}
                      </div>
                      <div className="text-sm mt-3 line-clamp-3">
                        {project.description}
                      </div>

                      <div className="flex mt-4 mb-5 gap-3 ">
                        {project.technologies.map((tech) => (
                          <div
                            className="py-1 px-3 rounded-full text-[10px] uppercase"
                            style={{
                              backgroundColor: Technologies.find(
                                (t) => t.name === tech
                              )?.color,
                            }}
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3 items-end justify-end">
                        <a
                          href={project.ghLink}
                          target="_blank"
                          className="flex gap-2 justify-center items-end bg-black rounded-xl text-white py-2 px-5 text-xs text-center hover:bg-primary-100 transition-all duration-300 "
                        >
                          <FaGithub className="size-4" />
                          Github
                        </a>

                        <a
                          href={project.demoLink}
                          target="_blank"
                          className="flex gap-2 justify-center items-end bg-black rounded-xl text-white py-2 px-5 text-xs text-center hover:bg-primary-100 transition-all duration-300"
                        >
                          <BsArrowUpRightCircleFill className="size-4" />
                          Demo
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src={BottomWave} alt="top-wave" />
        </div>
      </motion.div>{" "}
    </section>
  );
};

export default MyProjects;
