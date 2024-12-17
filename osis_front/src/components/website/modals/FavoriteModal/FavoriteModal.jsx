import "./favorite.css";
import React from "react";

export const FavoriteModal = ({ toggleFavDrawer }) => {
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
          {Array(10)
            .fill()
            .map((_, index) => (
              <div className="col" key={index}>
                <div className="firstSection">
                  <div className="productImage"></div>
                  <div className="productTitle">
                    <p>Level Bolt Smart Lock</p>
                  </div>
                </div>
                <div className="secondSection">
                  <div className="priceSec">
                    <p>$130.00</p>
                  </div>
                  <div className="closeBtn">
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
