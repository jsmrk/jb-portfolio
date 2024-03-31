import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import React from "react";

import AboutMeImg from "@/assets/about-image.png";
import Sign from "@/assets/sign.png";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const AboutMe = ({ setSelectedPage }: Props) => {
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");

  return (
    <section id="aboutme" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
      <motion.div
        className={`${isAboveLargeScreen ? " w-4/6 justify-between" : " w-5/6 items-center justify-center"} md:flex md:mt-0 mt-[80px] mx-auto h-full items-center justify-center`}
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        <div className="md:flex md:justify-center items-center">
          {/* LEFT DIV */}
          <div className="md:basis-4/5 ">
            <img src={AboutMeImg} alt="" />
          </div>
          {/* RIGHT DIV */}
          <div>
            <h2>About me</h2>
            <p>
              My passion for programming ignited in high school, leading me to
              build websites and apps for all devices. Freelancing honed my
              skills while I learned and earned. Now, A Computer Science
              graduate, I still dedicate my free time daily in learning to stay
              on the cutting edge, eager to contribute innovative experiences
              through technology.
            </p>
            <img src={Sign} alt="" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
