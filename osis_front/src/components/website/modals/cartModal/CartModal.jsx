import React, { useState, useEffect, useContext } from "react";
import { ToggleContext } from "../../../../context/ToggleContext";
import "./cart.css";
import axios from "axios";
import { toast } from "react-toastify";

export const CartModal = () => {
  const { closeCart, cart, handleQuantityChange, removeFromCart, resetCart } =
    useContext(ToggleContext);

  const handleSendDevis = async () => {
    try {
      console.log("response");
      const response = await axios.post(
        `${"http://localhost:5000"}/api/cart/add`,
        { products: cart },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include Bearer token in headers
          },
        }
      );

      if (response.status === 201) {
        resetCart();
        toast.success(response.data.message);
      } else if (response.status === 403) {
        toast.error(`vous devez être connecté pour ajouter un article.`);
      } else if (response.status === 404) {
        toast.error(`vous devez être connecté pour ajouter un article.`);
      }
    } catch (error) {
      if (error.response.status) {
        toast.error(error.response.data.message);
      } else {
        toast.error(`Erreur, veuillez réessayer plus tard.`);
      }
    }
  };

  return (
    <>
      <div className="modalOverlay" onClick={closeCart} />
      <div className="cardContainer" onClick={(e) => e.stopPropagation()}>
        <div className="titlee">
          <p>Panier</p>
          <div className="close-button" onClick={closeCart}>
            <i className="bi bi-x-lg"></i>
          </div>
        </div>

        <div className="cardModalTable">
          <div className="theader">
            <div className="theaderImg">
              <p>Image</p>
            </div>
            <div className="theaderProduct">
              <p>Produit</p>
            </div>
            <div className="theaderPrice">
              <p>Prix unitaire</p>
            </div>
            <div className="theaderQuantity">
              <p>Quantité</p>
            </div>
            <div className="theaderTotal">
              <p>Total</p>
            </div>
          </div>

          <div className="thbody">
            {cart.map((item, index) => (
              <div className="col" key={index}>
                <div className="thbodyImg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                </div>
                <div className="thbodyProduct">
                  <p>{item.name}</p>
                </div>
                <div className="thbodyPrice">
                  <p>${item.unitPrice.toFixed(2)}</p>
                </div>
                <div className="thbodyQuantity">
                  <button onClick={() => handleQuantityChange(index, -1)}>
                    <i className="bi bi-dash"></i>
                  </button>
                  <p>{item.quantity}</p>
                  <button onClick={() => handleQuantityChange(index, 1)}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <div className="thbodyTotal">
                  <p>${(item.unitPrice * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-button"
                    onClick={(e) => removeFromCart(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout">
          <button onClick={() => handleSendDevis()}>
            Envoyer devis <i className="bi bi-send-check-fill"></i>
          </button>
          <div className="subtotal">
            <p>TOTAL:</p>
            <p>
              $
              {cart
                .reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
