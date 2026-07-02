import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
      </main>
    </MotionConfig>
  );
}

export default App;
