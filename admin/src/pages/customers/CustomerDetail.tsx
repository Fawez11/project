import React from "react";
import CustomerProfileCard from "../../components/customers/CustomerProfileCard";
import CustomerOrdersTable from "../../components/customers/CustomerOrdersTable";
import Breadcrumb from "../../components/common/Breadcrumb";

const CustomerDetail: React.FC = () => {
  // Mock data - should come from API/props
  const customerData = {
    name: "Margaret Raw",
    phone: "+38 (094) 730-24-25",
    email: "margaretraw@gmail.com",
    balance: 1200,
    lastOrder: {
      days: 7,
      id: "80294",
    },
    averageOrderValue: 574.0,
    emailMarketing: "Subscribed",
    image: "/img/customer-profile.png",
  };

  const ordersData = {
    orders: [
      {
        id: "Kz025417",
        date: "Today at 4:55 pm",
        status: "Pending",
        items: 6,
        amount: 520.0,
      },
      // Add more orders as needed
    ],
    totalSpent: 85560.0,
    totalOrders: 7,
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Customers", link: "/customers", active: true },
  ];

  return (
    <div className="sherah-dsinner">
      <div className="row mg-top-30">
        <div className="col-12 sherah-flex-between">
          <Breadcrumb title="Customers" items={breadcrumbItems} />
          <button className="sherah-btn sherah-gbcolor">Add customer</button>
        </div>
      </div>

      <div className="sherah-page-inner sherah-border sherah-default-bg mg-top-25 pt-0">
        <div className="row">
          <div className="col-lg-3 col-12 mg-top-30">
            <CustomerProfileCard customer={customerData} />
          </div>
          <div className="col-lg-9 col-12 mg-top-30">
            <CustomerOrdersTable
              orders={ordersData.orders}
              totalSpent={ordersData.totalSpent}
              totalOrders={ordersData.totalOrders}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
