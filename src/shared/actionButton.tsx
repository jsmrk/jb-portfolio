/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "./types";
import React from "react";

type Props = {
  children: React.ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
};

function ActionButton({ children, setSelectedPage }: Props) {
  return (
    <AnchorLink
      className=" bg-primary-100 rounded-2xl text-white py-2.5 px-7 hover:bg-white hover:text-primary-100 hover:cursor-pointer transition duration-300 flex items-center justify-between gap-3"
      onClick={() => setSelectedPage(SelectedPage.ContactUs)}
      href={`#${SelectedPage.ContactUs}`}
    >
      {children}
    </AnchorLink>
  );
}

export default ActionButton;
