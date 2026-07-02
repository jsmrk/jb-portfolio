import { useEffect, useState } from "react";

// Tracks which section id is currently in view, for nav link highlighting.
// Pass a stable (module-level) array to avoid re-subscribing every render.
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // The middle band of the viewport decides the "current" section.
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
