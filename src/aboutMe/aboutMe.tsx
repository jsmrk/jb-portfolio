import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";

import useMediaQuery from "@/hooks/useMediaQuery";
import AboutMeImg from "@/assets/about-image.png";
import Sign from "@/assets/sign.png";
import TopWave from "@/assets/hero-bottom-wave.png";
import BottomWave from "@/assets/about-bottom-wave.png";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const AboutMe = ({ setSelectedPage }: Props) => {
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");

  return (
    <section id="aboutme" className="mx-auto">
      <div>
        <img src={TopWave} alt="" />
      </div>
      <div className=" bg-bg-secondary py-10 md:pb-0 ">
        <motion.div
          className={`${isAboveLargeScreen ? " w-4/6 justify-between" : " w-5/6 items-center justify-center"} md:flex md:mt-0 mt-[50px] mx-auto h-full items-center justify-center`}
          onViewportEnter={() => setSelectedPage(SelectedPage.AboutMe)}
        >
          <div className="md:flex md:justify-between items-center md:gap-[150px]">
            {/* LEFT DIV */}
            <motion.div
              className="justify-center md:pb-0 pb-11 md:block hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <img src={AboutMeImg} alt="" />
            </motion.div>
            {/* RIGHT DIV */}
            <div className="md:basis-4/5 ">
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
                <h2 className="text-4xl font-bold mb-8">
                  About <span className="text-primary-100">me</span>
                </h2>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.5 }}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-l leading-relaxed">
                  My passion for programming ignited in high school, leading me
                  to build websites and apps for all devices. Freelancing honed
                  my skills while I learned and earned. Now, A Computer Science
                  graduate, I still dedicate my free time daily in learning to
                  stay on the cutting edge, eager to contribute innovative
                  experiences through technology.
                </p>
                <div className="flex justify-end mt-6">
                  <img className="max-w-[100px]" src={Sign} alt="" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <div>
        <img src={BottomWave} alt="" />
      </div>
    </section>
  );
};

export default AboutMe;
