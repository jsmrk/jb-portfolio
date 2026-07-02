import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { navItems, site } from "@/data/site";

const SECTION_IDS = navItems.map((item) => item.id);

// Fixed top bar: wordmark, section links, resume, theme toggle, mobile menu.
function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  const themeIcon = theme === "light" ? <FiMoon size={14} /> : <FiSun size={14} />;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 border-b bg-bg transition-colors duration-300",
        isScrolled ? "border-line" : "border-transparent"
      )}
    >
      <div className="mx-auto flex w-5/6 max-w-5xl items-center justify-between py-4">
        <a href="#top" className="font-serif text-lg italic">
          {site.name}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
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
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-grow text-sm text-accent"
          >
            Resume ↗
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {themeIcon}
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          className="p-2 text-ink md:hidden"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg md:hidden">
          <div className="mx-auto flex w-5/6 items-center justify-between py-4">
            <span className="font-serif text-lg italic">{site.name}</span>
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
