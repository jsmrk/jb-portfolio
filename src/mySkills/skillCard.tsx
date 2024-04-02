import { motion } from "framer-motion";
import React from "react";

type Props = { children: React.ReactNode };

const SkillCard = ({ children }: Props) => {
  // const loopAnimation = {
  //   duration: 5, // Adjust duration for animation speed (seconds)
  //   repeat: Infinity,
  //   repeatType: "loop" as const, // Ensures type safety for repeatType
  //   ease: "linear", // Ensures smooth looping transition
  // };

  return (
    <motion.div
      className="flex justify-center items-center rounded-3xl bg-white text-black text-l font-bold px-8 py-5 gap-3 md:mt-0 mt-5 hover:bg-primary-100 hover:text-white transition duration-300 hover:cursor-pointer hover:scale-110 "
      // animate={{
      //   rotate: 360,
      // }}
      // transition={loopAnimation}
    >
      {children}
    </motion.div>
  );
};

export default SkillCard;
