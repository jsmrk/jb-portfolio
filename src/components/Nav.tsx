import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { cn } from "@/lib/cn";
import Magnetic from "@/components/Magnetic";
import MovingBorder from "@/components/MovingBorder";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { navItems, site } from "@/data/site";

const SECTION_IDS = navItems.map((item) => item.id);

// Fixed top bar: wordmark, section links, resume, theme toggle, mobile menu.
// Condenses into a floating, blurred pill once the page is scrolled.
function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  const nameWords = site.name.split(" ").filter(Boolean);
  const initials = (nameWords[0][0] + nameWords[nameWords.length - 1][0]).toUpperCase();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  const themeIcon = theme === "light" ? <FiMoon size={14} /> : <FiSun size={14} />;

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div
        className={cn(
          "relative mx-auto flex items-center justify-between transition-all duration-300 ease-out",
          isScrolled
            ? "mt-3 w-11/12 max-w-3xl px-5 py-2.5"
            : "mt-0 w-5/6 max-w-5xl px-0 py-4"
        )}
      >
        {/* Floating pill: a moving-border ring with an inset glass surface. */}
        <MovingBorder visible={isScrolled} />
        <div
          aria-hidden
          className="absolute inset-[1.5px] rounded-full bg-bg shadow-sm transition-opacity duration-300"
          style={{ opacity: isScrolled ? 1 : 0 }}
        />

        <div className="group relative">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-card font-serif text-sm text-accent">
              {initials}
            </span>
            <span className="font-serif text-lg font-medium">{site.name}</span>
          </a>
          <div className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-60 translate-y-1 rounded-xl border border-line bg-card p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg font-serif text-accent">
                {initials}
              </span>
              <div>
                <p className="font-serif text-base leading-tight">{site.name}</p>
                <p className="text-xs text-muted">{site.role}</p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to work · Remote
            </p>
          </div>
        </div>

        <nav aria-label="Main" className="relative hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "text-sm transition-colors hover:text-accent",
                activeSection === item.id ? "text-accent" : "text-muted"
              )}
            >
              {item.label}
            </a>
          ))}
          <Magnetic>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-grow text-sm text-accent"
            >
              Resume ↗
            </a>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {themeIcon}
            </button>
          </Magnetic>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          className="relative p-2 text-ink md:hidden"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg md:hidden">
          <div className="mx-auto flex w-5/6 items-center justify-between py-4">
            <span className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-card font-serif text-sm text-accent">
                {initials}
              </span>
              <span className="font-serif text-lg font-medium">{site.name}</span>
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-ink"
            >
              <FiX size={20} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mx-auto mt-14 flex w-5/6 flex-col gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-3xl"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-6 border-t border-line pt-8">
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted"
              >
                Resume ↗
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={themeLabel}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink"
              >
                {themeIcon}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Nav;
