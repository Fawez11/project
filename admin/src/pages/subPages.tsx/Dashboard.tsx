import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import { Outlet } from "react-router-dom";
const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    return localStorage.getItem("iscicon") === "true";
  });
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => {
      const newState = !prevState;
      localStorage.setItem("iscicon", newState.toString());
      return newState;
    });
  };
  return (
    <div className="sherah-dark-light">
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className="sherah-body-area">
        <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        <section className="sherah-adashboard sherah-show">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="sherah-body">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
