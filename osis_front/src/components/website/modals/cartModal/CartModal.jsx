import React, { useState, useEffect, useContext } from "react";
import { ToggleContext } from "../../../../context/ToggleContext";
import "./cart.css";
import axios from "axios";
import { toast } from "react-toastify";

export const CartModal = () => {
  const { closeCart, cart, handleQuantityChange, removeFromCart, resetCart } =
    useContext(ToggleContext);
  // const [cartData, setCartData] = useState([]);

  // const fakeCartData = [
  //   {
  //     name: "MacBook Pro M2",
  //     unitPrice: 1299.99,
  //     quantity: 1,
  //     image:
  //       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1671304673229",
  //   },
  //   {
  //     name: "iPhone 15 Pro Max",
  //     unitPrice: 999.99,
  //     quantity: 2,
  //     image:
  //       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
  //   },
  //   {
  //     name: "AirPods Pro",
  //     unitPrice: 249.99,
  //     quantity: 3,
  //     image:
  //       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-select-202309?wid=440&hei=330&fmt=jpeg&qlt=95&.v=1692845702708",
  //   },
  //   {
  //     name: "iPad Air",
  //     unitPrice: 599.99,
  //     quantity: 1,
  //     image:
  //       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202309?wid=440&hei=330&fmt=jpeg&qlt=95&.v=1692845702708",
  //   },
  // ];

  // useEffect(() => {
  //   const storedCart = JSON.parse(localStorage.getItem("cart"));
  //   if (storedCart && storedCart.length > 0) {
  //     setCartData(storedCart);
  //   } else {
  //     setCartData(fakeCartData);
  //     localStorage.setItem("cart", JSON.stringify(fakeCartData));
  //   }
  // }, []);

  // const handleRemoveItem = (e, index) => {
  //   e.stopPropagation(); // Prevent cart from closing
  //   handleQuantityChange(index, -cartData[index].quantity);
  // };

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
      console.log(response);

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
