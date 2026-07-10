import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Tone = "cmd" | "muted" | "ok";

// Boot-sequence lines typed out on load — a nod to starting the dev server
// before the site "launches".
const LINES: { text: string; tone: Tone }[] = [
  { text: "$ npm run dev", tone: "cmd" },
  { text: "", tone: "muted" },
  { text: "> jb-portfolio dev", tone: "muted" },
  { text: "> vite", tone: "muted" },
  { text: "", tone: "muted" },
  { text: "  VITE v5  ready in 312 ms", tone: "muted" },
  { text: "  ➜  Local:   http://localhost:5173/", tone: "muted" },
  { text: "", tone: "muted" },
  { text: "✓ compiled — launching portfolio", tone: "ok" },
];

const TONE: Record<Tone, string> = {
  cmd: "text-ink",
  muted: "text-muted",
  ok: "text-accent",
};

// One tick per character, plus one per line break.
const FLAT = LINES.map((line) => line.text).join("\n");
const TOTAL = LINES.reduce((n, line) => n + line.text.length + 1, 0);
const CHAR_MS = 34; // typing speed

// Lazily-created audio context for synthesized keystroke clicks. Browsers keep
// it suspended until a user gesture, so clicks are silent until audio unlocks.
let audioCtx: AudioContext | null = null;

// Play a short, soft keystroke click. No-op when audio is unavailable/blocked.
function playType() {
  try {
    const w = window as unknown as {
      AudioContext?: typeof AudioContext;
      webkitAudioContext?: typeof AudioContext;
    };
    const Ctx = w.AudioContext ?? w.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === "suspended") void audioCtx.resume();
    if (audioCtx.state !== "running") return;
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 220 + Math.random() * 70;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.035);
  } catch {
    // Audio not supported — stay silent.
  }
}

// TerminalIntro: types out a brief, skippable boot sequence on every load.
// Skips entirely for reduced-motion users.
function TerminalIntro() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!show) return;

    let i = 0;
    let end: ReturnType<typeof setTimeout>;
    const step = window.setInterval(() => {
      const ch = FLAT[i];
      if (ch && ch !== " " && ch !== "\n") playType();
      i += 1;
      setTyped(i);
      if (i >= TOTAL) {
        window.clearInterval(step);
        end = setTimeout(() => setShow(false), 750);
      }
    }, CHAR_MS);

    const skip = () => {
      window.clearInterval(step);
      setShow(false);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      window.clearInterval(step);
      clearTimeout(end);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [show]);

  // Lock page scroll while the intro is on screen.
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // Reveal each line up to the current typed-character budget.
  const visible: { text: string; tone: Tone }[] = [];
  let budget = typed;
  for (const line of LINES) {
    if (budget < 0) break;
    visible.push({ text: line.text.slice(0, budget), tone: line.tone });
    budget -= line.text.length + 1;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          role="status"
          aria-label="Launching portfolio"
        >
          <div className="w-full max-w-md overflow-hidden rounded-lg border border-line bg-card">
            <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#cc6b5a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a95c]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#7ba068]" />
              <span className="ml-2 font-mono text-[11px] text-muted">portfolio — zsh</span>
            </div>
            <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-relaxed">
              {visible.map((line, idx) => (
                <div key={idx} className={TONE[line.tone]}>
                  {line.text.length ? line.text : " "}
                  {idx === visible.length - 1 && (
                    <span className="ml-px inline-block h-[1.1em] w-[0.55ch] animate-pulse bg-accent align-text-bottom" />
                  )}
                </div>
              ))}
            </pre>
          </div>
          <p className="absolute bottom-8 font-mono text-[11px] text-muted">
            press any key to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TerminalIntro;
