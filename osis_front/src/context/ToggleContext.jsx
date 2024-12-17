import React, { createContext, useState } from "react";

// Create the context
export const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggle = () => {
    setIsToggled((prev) => !prev);
  };

  const close = () => {
    setIsToggled(false);
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <ToggleContext.Provider
      value={{ isToggled, toggle, close, isCartOpen, toggleCart, closeCart }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
