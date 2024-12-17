import React from "react";

function Pagination() {
  return (
    <div className="row mg-top-40">
      <div className="sherah-pagination">
        <ul className="sherah-pagination__list">
          <li className="sherah-pagination__button">
            <a href="#">
              <i className="fas fa-angle-left"></i>
            </a>
          </li>
          <li>
            <a href="#">01</a>
          </li>
          <li className="active">
            <a href="#">02</a>
          </li>
          <li>
            <a href="#">03</a>
          </li>
          <li>
            <a href="#">04</a>
          </li>
          <li>
            <a href="#">05</a>
          </li>
          <li className="sherah-pagination__button">
            <a href="#">
              <i className="fas fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
