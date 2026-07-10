import { MotionConfig } from "framer-motion";
import DotGrid from "@/components/DotGrid";
import TerminalIntro from "@/components/TerminalIntro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Composes the single-page portfolio; reduced-motion users get instant content.
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DotGrid className="pointer-events-none fixed inset-0 -z-10" />
      <TerminalIntro />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
