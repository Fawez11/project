import React from "react";

function ProductSideBar() {
  return (
    <div className="col-xxl-3 col-lg-4 col-12">
      {/* <!-- Product Category Sidebar --> */}
      <div className="sherah-product-sidebar sherah-default-bg mg-top-30">
        <h4 className="sherah-product-sidebar__title sherah-border-btm">
          Product Categories
        </h4>
        <ul className="sherah-product-sidebar__list">
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Women’s Bag
              </span>
              <span className="count">15</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Men’s Accessories
              </span>
              <span className="count">20</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>School Bag
              </span>
              <span className="count">33</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Boots
              </span>
              <span className="count">40</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Boy’s Dress
              </span>
              <span className="count">44</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Women’s Fashion
              </span>
              <span className="count">50</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Fashion Accessories
              </span>
              <span className="count">33</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Leather Bags
              </span>
              <span className="count">31</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Makeup Corner
              </span>
              <span className="count">25</span>
            </a>
          </li>
        </ul>
      </div>
      {/* <!-- End Product Category Sidebar --> */}
      {/* <!-- Product Price Range Sidebar --> */}
      <div className="sherah-product-sidebar sherah-default-bg mg-top-30">
        <h4 className="sherah-product-sidebar__title sherah-border-btm">
          Price Range
        </h4>
        <div className="price-filter">
          <div className="price-filter-inner">
            <div id="slider-range"></div>
            <div className="price_slider_amount">
              <div className="label-input">
                <span>Range:</span>
                <input
                  type="text"
                  id="amount"
                  name="price"
                  placeholder="Add Your Price"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Product Price Range Sidebar --> */}
      {/* <!-- Product Brand Sidebar --> */}
      <div className="sherah-product-sidebar sherah-default-bg mg-top-30">
        <h4 className="sherah-product-sidebar__title sherah-border-btm">
          Product Brands
        </h4>
        <ul className="sherah-product-sidebar__list">
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Nike
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Zara
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Denim
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Madame
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa-solid fa-chevron-right"></i>Arong
              </span>
            </a>
          </li>
        </ul>
      </div>
      {/* <!-- End Product Brand Sidebar --> */}
      {/* <!-- Product Category Sidebar --> */}
      <div className="sherah-product-sidebar sherah-default-bg mg-top-30">
        <h4 className="sherah-product-sidebar__title sherah-border-btm">
          Size
        </h4>
        <ul className="sherah-product-sidebar__size">
          <li>
            <a className="sherah-border" href="#">
              XL
            </a>
          </li>
          <li>
            <a className="sherah-border" href="#">
              X
            </a>
          </li>
          <li>
            <a className="sherah-border" href="#">
              L
            </a>
          </li>
          <li>
            <a className="sherah-border" href="#">
              M
            </a>
          </li>
          <li>
            <a className="sherah-border" href="#">
              Slim Fit
            </a>
          </li>
        </ul>
      </div>
      {/* <!-- End Product Category Sidebar --> */}
    </div>
  );
}

export default ProductSideBar;
