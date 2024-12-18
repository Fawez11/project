import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create the context
export const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setIsCartOpen(false);
    const storageCart = JSON.parse(localStorage.getItem("cart"));
    if (!Array.isArray(storageCart)) {
      setCart([]);
    } else {
      setCart(storageCart);
    }
  }, []);
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
  const addToCart = (item) => {
    const { id, name, image, finalPrice, availability, productQuantity } = item;
    const itemIncludes = cart.filter((product) => product.id === item.id);

    if (!availability) {
      toast.error(`Quantité insuffisante pour le produit ${item.name}.`);
    } else if (!itemIncludes.length) {
      setCart([
        ...cart,
        {
          id,
          name,
          image,
          unitPrice: +finalPrice,
          quantity: productQuantity || 1,
        },
      ]);

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cart,
          {
            id,
            name,
            image,
            unitPrice: +finalPrice,
            quantity: productQuantity || 1,
          },
        ])
      );
      toast.success("Element added to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    const newQuantity = updatedCart[index].quantity + delta;

    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return updatedCart;
  };

  const resetCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <ToggleContext.Provider
      value={{
        isToggled,
        toggle,
        close,
        isCartOpen,
        toggleCart,
        closeCart,
        cart,
        addToCart,
        handleQuantityChange,
        removeFromCart,
        resetCart,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
