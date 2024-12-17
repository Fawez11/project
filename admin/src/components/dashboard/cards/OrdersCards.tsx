function OrdersCards() {
  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-12">
        {/* <!-- Sherah Order Card --> */}
        <div className="sherah-order-card sherah-default-bg sherah-border sherah-flex-between mg-top-30">
          <div className="sherah-order-card__first">
            <p className="sherah-order-card__text mg-btm-10">
              Active Creator <span className="sherah-bcolor">86,346</span>
            </p>
            <div className="sherah-chart__inside sherah-chart__inside--aorder">
              <canvas id="myChart_active_creators"></canvas>
            </div>
          </div>
          <div
            className="sherah-progress__single circle__one"
            data-value="0.115"
          ></div>
        </div>
        {/* <!-- End Sherah Order Card --> */}
      </div>
      <div className="col-lg-6 col-md-6 col-12">
        {/* <!-- Sherah Order Card --> */}
        <div className="sherah-order-card sherah-default-bg sherah-border sherah-flex-between mg-top-30">
          <div className="sherah-order-card__first">
            <p className="sherah-order-card__text mg-btm-10">
              Recent Order <span className="sherah-bcolor">135,86,346</span>
            </p>
            <div className="sherah-chart__inside sherah-chart__inside--aorder">
              <canvas id="myChart_recent_orders"></canvas>
            </div>
          </div>
          <div
            className="sherah-progress__single circle__two"
            data-value="0.115"
          ></div>
        </div>
        {/* <!-- End Sherah Order Card --> */}
      </div>
    </div>
  );
}

export default OrdersCards;
