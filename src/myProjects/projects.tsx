/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const MyProjects = ({ setSelectedPage }: Props) => {
  return (
    <section id="myprojects">
      <motion.div></motion.div>
    </section>
  );
};

export default MyProjects;
