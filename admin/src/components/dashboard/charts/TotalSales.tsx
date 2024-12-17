function TotalSales() {
  return (
    <div className="charts-main sherah-default-bg charts-home-two sherah-border mg-top-30">
      <div className="charts-main__heading  mg-btm-20 charts-main__heading--v2">
        <h3 className="sherah-heading__title">Total sales</h3>
        <div className="sherah-charts-tabs">
          {/* <!-- Tab List --> */}
          <div
            className="sherah-charts-tabs__list list-group "
            id="list-tab"
            role="tablist"
          >
            <a
              className="list-group-item"
              data-bs-toggle="list"
              href="#sherah_tab1"
              role="tab"
            >
              7 Days
            </a>
            <a
              className="list-group-item active"
              data-bs-toggle="list"
              href="#sherah_tab1"
              role="tab"
            >
              Monthly
            </a>
            <a
              className="list-group-item"
              data-bs-toggle="list"
              href="#sherah_tab1"
              role="tab"
            >
              Yearly
            </a>
          </div>
        </div>
        {/* <!-- End Topbar --> */}
      </div>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="sherah_tab1"
          role="tabpanel"
          aria-labelledby="sherah_tab1"
        >
          <div className="sherah-chart__inside sherah-chart__total--sales">
            <canvas id="myChart_Total_Sales_Home"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalSales;
