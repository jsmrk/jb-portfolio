import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import { site } from "@/data/site";

// Contact section: big mailto link, phone, and social links.
function Contact() {
  return (
    <Section id="contact">
      <motion.p variants={fadeUp} className="kicker">
        Contact
      </motion.p>
      <motion.h2 variants={fadeUp} className="mt-4 font-serif text-4xl font-medium md:text-5xl">
        Let's build <em className="text-accent">something.</em>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
        I'm open to web developer roles and freelance projects. The fastest way
        to reach me:
      </motion.p>
      <motion.p variants={fadeUp} className="mt-6 font-serif text-2xl">
        <a href={`mailto:${site.email}`} className="link-grow text-accent">
          {site.email}
        </a>
      </motion.p>
      <motion.p variants={fadeUp} className="mt-2 text-sm text-muted">
        <a href={site.phoneHref} className="link-grow">
          {site.phone}
        </a>
      </motion.p>
      <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-6 text-xs text-muted">
        {site.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              className="link-grow"
            >
              {social.label} ↗
            </a>
          </li>
        ))}
      </motion.ul>
    </Section>
  );
}

export default Contact;
