import React, { useContext } from "react";
import "./verticalProd.css";
import { Link } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ToggleContext } from "../../../context/ToggleContext";

const VerticalProductCard = ({ product }) => {
  const [imageError, setImageError] = React.useState(false);
  const { addToCart, toggleCart } = useContext(ToggleContext);

  const handleImageError = () => {
    setImageError(true);
  };

  // Array of mock tech product images
  const mockImages = [
    "https://via.placeholder.com/400x400/000000/FFFFFF?text=Gaming+Laptop",
    "https://via.placeholder.com/400x400/222222/FFFFFF?text=Desktop+PC",
    "https://via.placeholder.com/400x400/333333/FFFFFF?text=Graphics+Card",
    "https://via.placeholder.com/400x400/444444/FFFFFF?text=Gaming+Monitor",
    "https://via.placeholder.com/400x400/555555/FFFFFF?text=Gaming+Mouse",
  ];

  // Get a random mock image based on product ID or index
  const getProductImage = () => {
    if (!imageError && product.media && product.media.length > 0) {
      return product.media[0].filePath;
    }
    // Use product.id to consistently get the same image for the same product
    const index = product.id ? product.id % mockImages.length : 0;
    return mockImages[index];
  };

  return (
    <div className="vertical-product-card">
      {product.quantity > 0 && <span className="stock-badge">En stock</span>}

      <div className="product-image-container">
        <img
          src={getProductImage()}
          alt=""
          className="product-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <h3 className="product-title">{product.name}</h3>

      <div className="price-section">
        {product.isOnSale && (
          <span className="original-price">{product.price} DT</span>
        )}
        <span className="current-price">
          {product.isOnSale
            ? (product.price * (1 - product.discountPercentage / 100)).toFixed(
                2
              )
            : product.price}{" "}
          DT
        </span>
      </div>

      <div className="brand-logo">
        <img
          src="https://logowik.com/content/uploads/images/t_msi-micro-star-international7670.jpg"
          alt="MSI"
          className="brand-image"
        />
      </div>

      <Link to={`/product/${product.id}`} className="view-details-btn">
        Voir les détails
      </Link>
      <div className="product-icons-container">
        <IconButton aria-label="favorites" size="small">
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <FavoriteBorderIcon sx={{ color: "grey", fontSize: 24 }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-label="cart"
          size="small"
          onClick={() => {
            toggleCart();
            addToCart({ ...product, image: getProductImage() });
          }}
        >
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <ShoppingCartOutlinedIcon sx={{ color: "grey", fontSize: 24 }} />
          </Badge>
        </IconButton>
      </div>
      <div className="product-ref">Réf: {product.reference || product.ref}</div>
    </div>
  );
};

export default VerticalProductCard;
