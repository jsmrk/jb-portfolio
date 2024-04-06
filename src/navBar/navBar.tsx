import { useState } from "react";
import Link from "./link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";

import {
  Bars3Icon,
  XMarkIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import Logo from "/src/assets/logo.png";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
};

const Navbar = ({ selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const isAboveLargeScreen = useMediaQuery("(min-width: 1440px)");

  const flexBetween = "flex items-center justify-between";
  const navbarSettings = isTopOfPage
    ? "py-11  bg-transparent w-full py-6 before:absolute before:-top-1 before:left-0 before:z-[-1] before:content-headerwave w-full"
    : "drop-shadow py-6 bg-bg-primary";

  return (
    <nav className="bg-black ">
      <div
        className={`${navbarSettings} ${flexBetween} fixed w-full top-0 z-30 `}
      >
        {isAboveMediumScreen ? (
          <div className={`w-full `}>
            <div
              className={`${flexBetween} mx-auto ${isAboveLargeScreen ? " w-4/6" : " w-5/6"}`}
            >
              <div className={`${flexBetween} w-full`}>
                <img src={Logo} alt="" className="max-w-40" />
                <div className={`${flexBetween} gap-8 text-sm `}>
                  <Link
                    page="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="About Me"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="My Skills"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="My Projects"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="Contact Me"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>

                <a
                  href="https://drive.google.com/file/d/1TQWVO9tGGrPUkW2eFK0DzUlP0csTbopL/view"
                  target="_blank"
                  className="bg-primary-100 rounded-2xl text-white py-2.5 px-7 hover:bg-white hover:text-primary-100 hover:cursor-pointer transition duration-300 flex items-center justify-between gap-3"
                >
                  <p className="text-xs">Download Resume</p>
                  <div>
                    <ArrowDownTrayIcon className="h-3 w-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${flexBetween} w-5/6 m-auto`}>
            <img src={Logo} alt="" className="max-w-40" />

            <button
              className="rounded-full bg-secondary-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreen && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEM */}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <Link
              page="Home"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="About Me"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="My Skills"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="My Projects"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Contact Me"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
          {/* <div className={`${flexBetween} gap-8`}>
          <p>Sign In</p>
          <ActionButton setSelectedPage={setSelectedPage}>
            Become a Member
          </ActionButton>
        </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// <div className={`${flexBetween} `}></div>
