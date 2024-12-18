import "./favorite.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const FavoriteModal = ({ toggleFavDrawer }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async function () {
      const response = await axios.get(
        "http://localhost:5000/api/product/getAllBookmarks",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include Bearer token in headers
          },
        }
      );
      setItems(response.data);
    })();
  }, []);

  const removeFromFavorite = async (itemId, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/removeBookmark/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include Bearer token in headers
          },
        }
      );
      const newFavorites = items.filter((item) => item.id !== itemId);

      setItems(newFavorites);
    } catch (error) {
      toast.success("Failed to remove product");
    }
  };

  return (
    <div className="favContainer">
      <div className="titlee">
        <p>Favorite Products</p>
        <p onClick={() => toggleFavDrawer(false)}>
          <i className="bi bi-x-lg"></i>
        </p>
      </div>
      <div className="cardModalTable">
        <div className="thbodyaa">
          {items.map((item, index) => (
            <div className="col" key={index}>
              <div className="firstSection">
                <div className="productImage"></div>
                <div className="productTitle">
                  <p>{item.name}</p>
                </div>
              </div>
              <div className="secondSection">
                <div className="priceSec">
                  <p>{item.price}</p>
                </div>
                <div
                  className="closeBtn"
                  onClick={() => removeFromFavorite(item.id, index)}
                >
                  <i className="bi bi-x-lg"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
