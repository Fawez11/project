import "./header.css";
import React from "react";
// import { TopBar } from "./topbar/TopBar";
import { MiddleBar } from "./middleBar/MiddleBar";
import { Navbar } from "./navbar/Navbar";

export const Header = () => {
  return (
    <div className="header_wrapper">
      {/* <TopBar /> */}
      <MiddleBar />
      <Navbar />
    </div>
  );
};
