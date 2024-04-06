import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";

import useMediaQuery from "@/hooks/useMediaQuery";
import HomeImage from "@/assets/hero-image.png";
import HomeText from "@/assets/hero-text.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const Home = ({ setSelectedPage }: Props) => {
  const isBelowSmallScreen = useMediaQuery("(max-width: 425px)");
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");

  return (
    <section
      id="home"
      className="bg-gray-20 md:h-4/5 md:pt-[125px] pt-11 md:pb-0"
    >
      {/* IMAGE AND MAIN HEADER*/}
      <motion.div
        className={`${isAboveLargeScreen ? " w-4/6 justify-center" : " w-5/6 items-center justify-center"} md:flex md:mt-0 mx-auto h-full items-center justify-center`}
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* MAIN HEADER */}
        <div className="z-10 md:mt-[125px] mt-[50px] md:basis-4/5">
          {/* HEADINGS */}
          <motion.div
            className="md:-mt-20 "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative">
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext md:pb-0 pb-11 ">
                <img src={HomeText} alt="home-page-text" />
              </div>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p
                className={`mt-3 mb-11 ${isBelowSmallScreen ? "text-l" : "text-xl"}`}
              >
                Hi, I am{" "}
                <span className="text-primary-100 font-bold">
                  Jess Mark A. Baguio
                </span>
                <br />
                <span
                  className={`font-bold ${isBelowSmallScreen ? "text-xl" : "text-2xl"}`}
                >
                  a web and mobile developer
                </span>
              </p>
            </motion.div>
          </motion.div>
          {/* ACTIONS BUTTON */}
          <motion.div
            className="mt-8 flex items-center gap-8 md:justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <AnchorLink
              href="#contactme"
              className=" bg-primary-100 rounded-2xl text-white py-2 px-10 hover:bg-white hover:text-primary-100 hover:cursor-pointer transition duration-300 flex items-center justify-between gap-3"
            >
              Hire Me
            </AnchorLink>
            <AnchorLink
              href="#myprojects"
              className="text-sm font-bold text-primary-500 hover:text-primary-100"
            >
              See Projects
            </AnchorLink>
          </motion.div>
        </div>

        {/* IMAGE  */}
        <motion.div
          className="flex basis-2/5 md:basis-3/5 justify-center md:z-10 md:ml-40 md:mt-0 mt-5 md:justify-items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <img
            src={HomeImage}
            alt="home-page-graphic"
            className="sm:max-w-[400px] "
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
