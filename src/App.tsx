import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <About />
        <Work />
      </main>
    </MotionConfig>
  );
}

export default App;
