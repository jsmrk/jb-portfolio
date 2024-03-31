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
    <section id="aboutme" className="md:h-4/5">
      <div>
        <img src={TopWave} alt="" />
      </div>
      <div className=" bg-bg-secondary py-10 md:pb-0 ">
        <motion.div
          className={`${isAboveLargeScreen ? " w-4/6 justify-between" : " w-5/6 items-center justify-center"} md:flex md:mt-0 mt-[80px] mx-auto h-full items-center justify-center`}
          onViewportEnter={() => setSelectedPage(SelectedPage.AboutMe)}
        >
          <div className="md:flex md:justify-between items-center md:gap-[150px]">
            {/* LEFT DIV */}
            <div className="flex justify-center">
              <img src={AboutMeImg} alt="" />
            </div>
            {/* RIGHT DIV */}
            <div className="md:basis-4/5 ">
              <h2 className="text-4xl font-bold mb-8">
                About <span className="text-primary-100">me</span>
              </h2>
              <p className="text-l leading-relaxed">
                My passion for programming ignited in high school, leading me to
                build websites and apps for all devices. Freelancing honed my
                skills while I learned and earned. Now, A Computer Science
                graduate, I still dedicate my free time daily in learning to
                stay on the cutting edge, eager to contribute innovative
                experiences through technology.
              </p>
              <div className="flex justify-end mt-6">
                <img className="max-w-[100px]" src={Sign} alt="" />
              </div>
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
