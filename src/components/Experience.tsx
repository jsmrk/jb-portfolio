import { useRef } from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import TracingBeam from "@/components/TracingBeam";
import BackgroundLines from "@/components/BackgroundLines";
import { fadeUp } from "@/lib/motion";
import { roles } from "@/data/roles";
import { experience } from "@/data/experience";

// Work experience: a dated employment timeline (with a scroll-tracing beam),
// followed by anonymized client work over an ambient line backdrop.
function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="experience">
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-baseline justify-between gap-2"
      >
        <h2 className="font-serif text-3xl font-medium md:text-4xl">
          Work <em>experience</em>
        </h2>
        <p className="kicker">2022 — 2026</p>
      </motion.div>

      <div ref={timelineRef} className="relative mt-10 md:pl-10">
        <TracingBeam targetRef={timelineRef} />

        <ul>
          {roles.map((role) => (
            <motion.li
              key={`${role.company}-${role.title}`}
              variants={fadeUp}
              className="grid gap-1.5 border-t border-line py-7 md:grid-cols-[160px_1fr] md:gap-8"
            >
              <p className="text-[13px] text-muted md:pt-1">{role.period}</p>
              <div>
                <h3 className="font-serif text-xl">{role.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {role.company} · {role.type}
                  {role.location ? ` · ${role.location}` : ""}
                </p>
                {role.summary && (
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                    {role.summary}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="relative mt-16">
          <BackgroundLines className="absolute inset-0 -z-10 h-full w-full" />
          <motion.p variants={fadeUp} className="kicker">
            Websites &amp; platforms I've worked on
          </motion.p>
          <ul className="mt-4">
            {experience.map((item) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="grid gap-2 py-4 md:grid-cols-[160px_1fr] md:gap-8"
              >
                <p className="kicker md:pt-1">{item.sector}</p>
                <div>
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default Experience;
