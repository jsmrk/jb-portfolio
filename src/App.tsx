import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <About />
      </main>
    </MotionConfig>
  );
}

export default App;
