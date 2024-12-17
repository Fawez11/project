import React from "react";

function salesByCounty() {
  return (
    <div className="charts-main charts-home-four sherah-default-bg sherah-border mg-top-30">
      {/* <!-- Top Heading --> */}
      <div className="charts-main__heading  mg-btm-30">
        <h4 className="sherah-heading__title">Sales by Countrys</h4>
      </div>
      <div className="sherah-vector-map mg-top-20">
        <div id="sherah-map"></div>
      </div>
    </div>
  );
}

export default salesByCounty;
