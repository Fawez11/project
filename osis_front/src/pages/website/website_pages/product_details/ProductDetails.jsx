import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import apiEndpoints from "../../../../api/api";
import "./productDetails.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-gallery">
      <div className="main-image-container">
        <img
          src={images[currentIndex]?.filePath}
          alt="Product view"
          className="w-full h-full object-contain"
        />

        {images.length > 1 && (
          <>
            {/* Previous Arrow */}
            <button
              className="gallery-arrow prev"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next Arrow */}
            <button
              className="gallery-arrow next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-thumbnail ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image.filePath}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  // This array will be replaced by product.media when real data comes
  const sampleImages = [
    { filePath: "https://swiperjs.com/demos/images/nature-1.jpg" },
    { filePath: "https://swiperjs.com/demos/images/nature-2.jpg" },
    { filePath: "https://swiperjs.com/demos/images/nature-3.jpg" },
    { filePath: "https://swiperjs.com/demos/images/nature-4.jpg" },
    // ... more sample images
  ];

  // When you have real data, just replace sampleImages with product.media
  const images = product?.media || sampleImages;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const fetchSimilarProducts = async (productId) => {
    try {
      const response = await apiEndpoints.getData(
        `/product/similar/${productId}`
      );
      if (response.success) {
        setSimilarProducts(response.products);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiEndpoints.getData(`/product/getOne/${id}`);
        if (response.success) {
          setProduct(response.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.id) {
      fetchSimilarProducts(product.id);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Chargement...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <div className="error-message">Produit non trouvé</div>
      </div>
    );
  }

  const discountedPrice = product.isOnSale
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price;

  const handleSimilarProductClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="product-details-container">
      <div className="product-main">
        <ProductGallery images={images} />
        {/* Right Box - Product Info */}
        <div className="product-info">
          {/* Header Section */}
          <div className="product-header">
            <div className="product-category">
              {product.subSubCategory?.name || "Catégorie"}
            </div>
            <h1 className="product-title">{product.name}</h1>
          </div>

          {/* Price and Stock Section */}
          <div className="price-stock-section">
            <div className="price-box">
              {product.isOnSale && (
                <span className="original-price">{product.price} DT</span>
              )}
              <span className="current-price">{discountedPrice} DT</span>
            </div>

            <div className="stock-status">
              <div className="in-stock">
                <span className="stock-dot"></span>
                <span>En stock ({product.quantity})</span>
              </div>
            </div>
          </div>

          {/* Description Preview */}
          <div className="product-description">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Section */}
          <div className="quantity-control">
            <span className="quantity-label">Quantité:</span>
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                min="1"
                max={product.quantity}
              />
              <button
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.quantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              disabled={product.quantity === 0}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Ajouter au panier
            </button>
            <button className="wishlist-btn">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button
            className={`tab-button ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`tab-button ${
              activeTab === "characteristics" ? "active" : ""
            }`}
            onClick={() => setActiveTab("characteristics")}
          >
            Caractéristiques
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "description" ? (
            <div className="description-content">
              {product?.description ? (
                <p>{product.description}</p>
              ) : (
                <p>Aucune description disponible</p>
              )}
            </div>
          ) : (
            <div className="characteristics-content">
              {product?.subCharacteristics &&
              product.subCharacteristics.length > 0 ? (
                <div className="characteristics-grid">
                  {product.subCharacteristics.map((char, index) => (
                    <div key={index} className="characteristic-item">
                      <span className="characteristic-label">{char.name}</span>
                      <span className="characteristic-value">{char.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Aucune spécification disponible</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <h2 className="similar-title">Produits similaires</h2>
          <div className="similar-products-container">
            {similarProducts.map((similarProduct) => (
              <Link
                to={`/product/${similarProduct.id}`}
                key={similarProduct.id}
                className="similar-product-card"
                onClick={handleSimilarProductClick}
              >
                <div className="similar-image-container">
                  <img
                    src={similarProduct.media[0]?.filePath}
                    alt={similarProduct.name}
                    className="similar-product-image"
                  />
                </div>
                <div className="similar-product-info">
                  <h3 className="similar-product-name">
                    {similarProduct.name}
                  </h3>
                  <p className="similar-product-price">
                    {similarProduct.price} DT
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
