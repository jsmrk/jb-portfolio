import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { MdEmail, MdCall } from "react-icons/md";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = { setSelectedPage: (value: SelectedPage) => void };

const ContactMe = ({ setSelectedPage }: Props) => {
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");

  return (
    <section id="contactme">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Contact)}
        className={`${isAboveLargeScreen ? "w-4/6" : "w-5/6"}  md:mt-0 mx-auto text-center py-[100px] flex-row justify-center items-center`}
      >
        <h2 className="text-4xl font-bold">Lets Build Something Awesome</h2>
        <p className="text-base mt-5 md:mx-[200px]">
          If you share my passion for creating groundbreaking solutions, grab a
          virtual coffee using the contact info below and let's chat and build
          something awesome.
        </p>
        <div className="flex items-center justify-center my-11">
          <div>
            <div className="flex items-center gap-3 text-2xl">
              <MdEmail className="size-11" />
              <p>jsmrkbaguio@gmail.com</p>
            </div>
            <div className="flex items-center gap-3 text-2xl mt-3">
              <MdCall className="size-11" />
              <p>09296651214</p>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center items-center gap-5 w-3/5 mx-auto">
          <input
            type="text"
            placeholder="Email"
            className="rounded-xl px-3 py-2 text-black border-none text-xl w-3/5"
          />
          <button className=" bg-primary-100 rounded-xl text-white py-2.5 px-7 hover:bg-white hover:text-primary-100 hover:cursor-pointer transition duration-300 flex items-center justify-between gap-3 mt-5 md:mt-0 hover:font-bold">
            Contact Me
          </button>
        </div>
        <div className="flex items-center justify-center my-11 gap-8">
          <a href="" target="_blank">
            <FaFacebook className="size-11" />
          </a>
          <a href="" target="_blank">
            <FaGithub className="size-11" />
          </a>
          <a href="" target="_blank">
            <FaLinkedin className="size-11" />
          </a>
          <a href="" target="_blank">
            <SiUpwork className="size-11" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactMe;
