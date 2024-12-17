import React from "react";

const ProductInfo = () => {
  return (
    <div className="product-detail-body__content">
      <h2 className="product-detail-body__title">
        Atu Body Couture Bow Front Dress
      </h2>
      <p className="product-detail-body__stats">
        Sold 21 Products in last 10 Hours
      </p>

      {/* Price and Rating */}
      <div className="product-detail-body__deal--rating">
        <h5 className="sherah-product-card__price">
          <del>$155</del>$135
        </h5>
        <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
          <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="sherah-color4">
                <i className="fa fa-star"></i>
              </span>
            ))}
            (33)
          </div>
        </div>
      </div>

      <p className="product-detail-body__stock sherah-color3">45 In stock</p>
      <div className="product-detail-body__text">
        To achieve this, it would be necessary to have uniform grammar
        pronunciation and more our common words If several languages coalesce
      </div>

      {/* Add to Cart Section */}
      <div className="product-inside-button">
        <div className="sherah-button-group">
          <QuantityInput />
          <CartButtons />
        </div>
      </div>

      <div className="sherah-border-btm pd-top-40 mg-btm-40"></div>
      <ProductMeta />
    </div>
  );
};

const QuantityInput = () => {
  return (
    <div className="quantity">
      <div className="input-group">
        <div className="button minus">
          <button
            type="button"
            className="btn btn-primary btn-number"
            disabled={false}
            data-type="minus"
            data-field="quant[1]"
          >
            -
          </button>
        </div>
        <input
          type="text"
          name="quant[1]"
          className="input-number"
          data-min="1"
          data-max="10"
          value="0"
        />
        <div className="button plus">
          <button
            type="button"
            className="btn btn-primary btn-number"
            data-type="plus"
            data-field="quant[1]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const CartButtons = () => {
  return (
    <>
      <a href="#" className="sherah-btn">
        Add to Cart
      </a>
      <a href="#" className="sherah-btn default">
        {/* Heart Icon SVG */}
      </a>
      <a href="#" className="sherah-btn default">
        {/* Share Icon SVG */}
      </a>
    </>
  );
};

const ProductMeta = () => {
  return (
    <div className="sherah-products-meta">
      <ul className="sherah-products-meta__list">
        <li>
          <span className="p-list-title">SKU :</span> KE-91039
        </li>
        <li>
          <span className="p-list-title">Category : </span> Cloth
        </li>
        <li>
          <span className="p-list-title">Tags :</span> Grown Dress, Dress, Party
          Dress
        </li>
        <SocialShare />
      </ul>
    </div>
  );
};

const SocialShare = () => {
  const socialLinks = [
    { icon: "fa-facebook-f", link: "#" },
    { icon: "fa-twitter", link: "#" },
    { icon: "fa-linkedin", link: "#" },
    { icon: "fa-instagram", link: "#" },
  ];

  return (
    <li>
      <span className="p-list-title">Share:</span>
      <ul className="sherah-contact-info sherah-contact-social">
        {socialLinks.map((social, index) => (
          <li key={index} className="sherah-border">
            <a href={social.link}>
              <span className="sherah-color1__bg--offset">
                <i className={`fa-brands ${social.icon}`}></i>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ProductInfo;
