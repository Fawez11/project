import "./layout.css";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div>
      <p>Layout admin</p>
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;
