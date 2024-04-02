/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import { SelectedPage } from "./shared/types";
import Navbar from "./navBar/navBar";
import Home from "./home/home";
import AboutMe from "./aboutMe/aboutMe";
import Skills from "./mySkills/skills";
import MyProjects from "./myProjects/projects";
import ContactMe from "./contactMe/contactMe";
import Footer from "./footer/footer";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isTopOfPage={isTopOfPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <AboutMe setSelectedPage={setSelectedPage} />
      <Skills setSelectedPage={setSelectedPage} />
      <MyProjects setSelectedPage={setSelectedPage} />
      <ContactMe setSelectedPage={setSelectedPage} />
      <Footer />
    </>
  );
}

export default App;
