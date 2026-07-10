import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp } from "@/lib/motion";
import { site } from "@/data/site";

// Small Philippine flag mark shown beside the local phone number.
function PhFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 14" className={className} role="img" aria-label="Philippine number">
      <defs>
        <clipPath id="ph-round">
          <rect width="28" height="14" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath="url(#ph-round)">
        <rect width="28" height="7" fill="#0038A8" />
        <rect y="7" width="28" height="7" fill="#CE1126" />
        <polygon points="0,0 0,14 14,7" fill="#FFFFFF" />
        <circle cx="4.6" cy="7" r="1.5" fill="#FCD116" />
        <circle cx="2.3" cy="2.6" r="0.6" fill="#FCD116" />
        <circle cx="2.3" cy="11.4" r="0.6" fill="#FCD116" />
        <circle cx="10.8" cy="7" r="0.6" fill="#FCD116" />
      </g>
      <rect
        x="0.4"
        y="0.4"
        width="27.2"
        height="13.2"
        rx="2.1"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="0.7"
      />
    </svg>
  );
}

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
      <motion.p variants={fadeUp} className="mt-2 flex items-center gap-2 text-sm text-muted">
        <PhFlag className="h-3.5 w-7 shrink-0" />
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
