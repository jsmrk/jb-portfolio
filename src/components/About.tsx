import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import { site } from "@/data/site";

// About section: editorial side label, lead, bio, and inline toolbox list.
function About() {
  return (
    <Section id="about" className="grid gap-8 md:grid-cols-[160px_1fr]">
      <motion.p variants={fadeUp} className="kicker">
        About
      </motion.p>
      <div>
        <motion.p variants={fadeUp} className="font-serif text-2xl leading-snug md:text-[1.65rem]">
          For the past two years I've been building production web apps at Born
          Digital, a remote-first team — working mainly in React and Next.js.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-sm leading-loose text-muted">
          Along the way I spent a year teaching computer science at the
          University of Mindanao — explaining code to students taught me to
          write it more clearly. I care about interfaces that feel effortless:
          fast, legible, and honest about what they do. Outside client work I
          build my own things — web apps, mobile apps in Flutter, and the
          occasional experiment that never leaves localhost.
        </motion.p>
        <motion.div variants={fadeUp}>
          <p className="kicker mt-8">Toolbox</p>
          <p className="mt-2 text-sm leading-loose">{site.toolbox.join(" · ")}</p>
        </motion.div>
      </div>
    </Section>
  );
}

export default About;
