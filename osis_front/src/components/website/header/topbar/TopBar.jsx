import "./topBar.css";
import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const TopBar = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="topbar_wrapper">
      <p>Welcome to online eCommerce store.</p>
      <div className="topbar_options">
        <p>Account</p>
        <p>FR</p>
      </div>
    </div>
  );
};
