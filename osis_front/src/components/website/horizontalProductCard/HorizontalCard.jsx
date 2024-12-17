import React from "react";
import "./HorizontalCard.css";

const HorizontalProductCard = () => {
  const product = {
    image: "https://example.com/path/to/your/image.jpg", // Replace with a valid image URL
    name: "PC Portable DELL Latitude 7350",
    description:
      "Lorem ips. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    price: "7,299,000",
    promotionalPrice: "6,999,000",
    available: true,
  };

  return (
    <div className="cardH">
      <img
        src="https://codingyaar.com/wp-content/uploads/chair-image.jpg"
        className="card-img-top"
        alt={product.title}
      />
      <div className="card-body">
        <div className="text-section">
          <h5 className="card-title fw-bold">{product.title}</h5>
          <p className="card-text">{product.description}</p>
        </div>
        <div className="cta-section">
          <div className="pricee">
            {product.promotionalPrice ? (
              <>
                <span className="original-price">{product.price} DT</span>
                <span className="promotional-price">
                  {product.promotionalPrice} DT
                </span>
              </>
            ) : (
              <span className="current-price">{product.price} DT</span>
            )}
          </div>
          <div className="button-section">
            <button className="custom-button">Buy Now</button>
            {product.available ? (
              <span className="availability">In Stock</span>
            ) : (
              <span className="availability out-of-stock">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
