import ProgressCards from "../../components/dashboard/cards/progressCards";
import TotalSales from "../../components/dashboard/charts/TotalSales";
import OrdersCards from "../../components/dashboard/cards/OrdersCards";
import TotalStatistics from "../../components/dashboard/charts/TotalStatistics";
import RecentOrders from "../../components/dashboard/tables/RecentOrders";
import Revenue from "../../components/dashboard/charts/Revenue";
import SalesByCounty from "../../components/dashboard/charts/salesByCounty";
import ProductCards from "../../components/dashboard/cards/ProductCards";
import { useEffect } from "react";
export default function DashboardContent() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div className="sherah-body">
      {/* <!-- Dashboard Inner --> */}
      <div className="sherah-dsinner">
        <ProgressCards />

        <div className="row sherah-gap-30">
          <div className="col-lg-6 col-12">
            {/* <!-- Charts Two --> */}
            <TotalSales />
            {/* <!-- End Charts Two --> */}
            <OrdersCards />
          </div>
          <div className="col-lg-6 col-12">
            {/* <!-- Charts One --> */}
            <TotalStatistics />
            {/* <!-- End Charts One --> */}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <RecentOrders />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* <!-- Charts Three --> */}
            <Revenue />
            {/* <!-- End Charts Three --> */}
          </div>
          <div className="col-lg-6 col-12">
            {/* <!-- Charts One --> */}
            <SalesByCounty />
            {/* <!-- End Charts One --> */}
          </div>
        </div>

        <ProductCards />
      </div>
      {/* <!-- End Dashboard Inner --> */}
    </div>
  );
}
