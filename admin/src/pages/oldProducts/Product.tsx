// import React from "react";

import FilterHeader from "../../components/product/FilterHeader";
import Products from "../../components/product/Products";
import ProductSideBar from "../../components/product/ProductSideBar";
import Pagination from "../../components/utils/Pagination";
import { useEffect } from "react";
function product() {
  useEffect(() => {
    document.title = "Products";
  }, []);
  return (
    <div className="sherah-dsinner">
      <div className="row mg-top-30">
        <div className="col-12 sherah-flex-between">
          {/* <!-- Sherah Breadcrumb --> */}
          <div className="sherah-breadcrumb">
            <h2 className="sherah-breadcrumb__title">Products</h2>
            <ul className="sherah-breadcrumb__list">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">
                <a href="products.html">Shop</a>
              </li>
            </ul>
          </div>
          {/* <!-- End Sherah Breadcrumb --> */}
        </div>
      </div>

      <div className="row">
        <ProductSideBar />

        <div className="col-xxl-9 col-lg-8 col-12">
          <FilterHeader />
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="tab_1"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <Products />
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default product;
