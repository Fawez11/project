import "./layout.css";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../../components/website/header/Header";
import { Footer } from "../../../components/website/footer/Footer";
import { ToggleContext } from "../../../context/ToggleContext";

const LayoutWebsite = () => {
  const { close } = useContext(ToggleContext);

  const handleWrapperClick = () => {
    close();
  };

  return (
    <div className="website_wrapper" onClick={handleWrapperClick}>
      <div className="navbar">
        <Header />
      </div>
      <div className="main">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LayoutWebsite;
