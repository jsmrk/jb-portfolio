import { motion } from "framer-motion";
import React from "react";

type Props = { children: React.ReactNode };

const SkillCard = ({ children }: Props) => {
  return (
    <motion.div
      className="flex justify-center items-center rounded-3xl bg-white text-black text-l font-bold px-8 py-3 gap-3 md:mt-0 mt-5 hover:bg-primary-100 hover:text-white transition duration-300 hover:cursor-pointer hover:scale-110"
      whileHover={{ rotate: 360 }}
      whileTap={{
        scale: 0.8,
      }}
    >
      {children}
    </motion.div>
  );
};

export default SkillCard;
