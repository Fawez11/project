import React from "react";
import SearchSVg from "../svgComponenents/SearchSVg";
import { Link } from "react-router-dom";

function FilterHeader() {
  return (
    <div className="sherah-breadcrumb__right mg-top-30">
      <div className="sherah-breadcrumb__right--first">
        <div className="sherah-header__form sherah-header__form--product">
          <form className="sherah-header__form-inner" action="#">
            <button className="search-btn" type="submit">
              <SearchSVg />
            </button>
            <input name="s" value="" type="text" placeholder="Search" />
          </form>
        </div>
        <p>Showing 1–8 of 60 results</p>
      </div>
      <div className="sherah-breadcrumb__right--second">
        <div
          className="sherah-product__nav list-group "
          id="list-tab"
          role="tablist"
        >
          <a
            className="list-group-item active"
            data-bs-toggle="list"
            role="tab"
            href="profile.html"
          >
            <span>Top Rated</span>
          </a>
          <a
            className="list-group-item"
            data-bs-toggle="list"
            href="#tab_2"
            role="tab"
          >
            <span>Popular</span>
          </a>
          <a
            className="list-group-item"
            data-bs-toggle="list"
            href="#tab_1"
            role="tab"
          >
            <span>Newest</span>
          </a>
        </div>
        <Link to={"/addProduct"} className="sherah-btn sherah-gbcolor">
          Upload Product
        </Link>
        <Link to={"/addProduct"} className="sherah-btn sherah-gbcolor">
          Categories & Options
        </Link>
      </div>
    </div>
  );
}

export default FilterHeader;
