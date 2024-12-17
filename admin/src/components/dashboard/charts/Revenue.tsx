import React from "react";

function Revenue() {
  return (
    <div className="charts-main sherah-default-bg  sherah-border mg-top-30">
      <div className="charts-main__heading mg-btm-30">
        <h4 className="sherah-heading__title">Revenue</h4>
        <div className="charts-main__middle">
          <ul className="sherah-progress-list sherah-progress-list__inline">
            <li>
              <span className="sherah-progress-list__color sherah-color4__bg"></span>
              <p>Visitor</p>
            </li>
            <li>
              <span className="sherah-progress-list__color sherah-color3__bg"></span>
              <p>Sells</p>
            </li>
            <li>
              <span className="sherah-progress-list__color sherah-color1__bg"></span>
              <p>Profit</p>
            </li>
          </ul>
        </div>
        {/* <!-- Chart Dropdown Menu --> */}
        <div className="sherah-chart__dropdown sherah-chart__dropdown--bg">
          <ul
            className="nav nav-tabs sherah-dropdown__list"
            id="nav-tab"
            role="tablist"
          >
            <li className="nav-item dropdown">
              <a
                className="sherah-sidebar_btn sherah-offset-bg  sherah-border sherah-heading__tabs nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                Last 7 days{" "}
                <svg
                  width="13"
                  height="6"
                  viewBox="0 0 13 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.7"
                    d="M12.4124 0.247421C12.3327 0.169022 12.2379 0.106794 12.1335 0.0643287C12.0291 0.0218632 11.917 0 11.8039 0C11.6908 0 11.5787 0.0218632 11.4743 0.0643287C11.3699 0.106794 11.2751 0.169022 11.1954 0.247421L7.27012 4.07837C7.19045 4.15677 7.09566 4.219 6.99122 4.26146C6.88678 4.30393 6.77476 4.32579 6.66162 4.32579C6.54848 4.32579 6.43646 4.30393 6.33202 4.26146C6.22758 4.219 6.13279 4.15677 6.05312 4.07837L2.12785 0.247421C2.04818 0.169022 1.95338 0.106794 1.84895 0.0643287C1.74451 0.0218632 1.63249 0 1.51935 0C1.40621 0 1.29419 0.0218632 1.18975 0.0643287C1.08531 0.106794 0.990517 0.169022 0.910844 0.247421C0.751218 0.404141 0.661621 0.616141 0.661621 0.837119C0.661621 1.0581 0.751218 1.2701 0.910844 1.42682L4.84468 5.26613C5.32677 5.73605 5.98027 6 6.66162 6C7.34297 6 7.99647 5.73605 8.47856 5.26613L12.4124 1.42682C12.572 1.2701 12.6616 1.0581 12.6616 0.837119C12.6616 0.616141 12.572 0.404141 12.4124 0.247421Z"
                  ></path>
                </svg>
              </a>
              <ul className="dropdown-menu sherah-sidebar_dropdown">
                <a
                  className="list-group-item"
                  data-bs-toggle="list"
                  data-bs-target="#sherah-chart__rev"
                  role="tab"
                >
                  Last 15 Days
                </a>
                <a
                  className="list-group-item"
                  data-bs-toggle="list"
                  data-bs-target="#sherah-chart__rev"
                  role="tab"
                >
                  Last 7 Days
                </a>
                <a
                  className="list-group-item"
                  data-bs-toggle="list"
                  data-bs-target="#sherah-chart__rev"
                  role="tab"
                >
                  Last Month
                </a>
              </ul>
            </li>
          </ul>
        </div>
        {/* <!-- End Chart Dropdown Menu --> */}
      </div>
      <div className="charts-main__three">
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active "
            id="sherah-chart__rev"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div className="sherah-chart__inside sherah-chart__revenue">
              <canvas id="myChart_Revenue"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
