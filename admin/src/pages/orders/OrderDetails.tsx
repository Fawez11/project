import React from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import OrderHeader from "../../components/orders/OrderHeader";
import OrderItemsTable from "../../components/orders/OrderItemsTable";
import OrderTransactions from "../../components/orders/OrderTransactions";
import CustomerContact from "../../components/orders/CustomerContact";

const OrderDetails: React.FC = () => {
  // Mock data - should come from API/props
  const orderData = {
    orderId: "BD80288",
    date: "October 7, 2020 at 9:08 pm",
    itemCount: 3,
    totalAmount: 10254.0,
    status: {
      payment: "Paid",
      fulfillment: "Partially Fulfilled",
    },
  };

  const orderItems = [
    {
      image: "img/product-img1.png",
      name: "Polka Dots Woman Dress",
      color: "Black",
      price: 135,
      quantity: 2,
      total: 270,
    },
    // Add more items as needed
  ];

  const orderTotals = {
    subtotal: 8500,
    storeCredit: 200,
    deliveryCharges: 150,
    shipping: 100,
    vatTax: 850,
    total: 9400,
  };

  const contactInfo = {
    shipping: {
      name: "John Doe",
      phone: "+25 (734) 697-2907",
      email: "margaretraw@gmail.com",
      address: "374 William S Canning Blvd, Fall River MA 2721, USA",
    },
    billing: {
      name: "John Doe",
      phone: "+25 (734) 697-2907",
      email: "sherah@consultio.com",
      address: "3556 Hartford Way Vlg, Mount Pleasant, SC, Australia",
    },
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Order List", link: "/orders", active: true },
  ];

  return (
    <div className="sherah-dsinner">
      <div className="row mg-top-30">
        <div className="col-12 sherah-flex-between">
          <Breadcrumb title="Order List" items={breadcrumbItems} />
          <button className="sherah-btn sherah-gbcolor">Add New Vendor</button>
        </div>
      </div>

      <div className="sherah-page-inner sherah-border sherah-default-bg mg-top-25">
        <OrderHeader {...orderData} />

        <div className="row">
          <div className="col-lg-6 col-md-6 col-12 mg-top-30">
            <OrderItemsTable items={orderItems} totals={orderTotals} />
            <OrderTransactions
              transactions={[
                {
                  gateway: "Stripe",
                  date: "Oct 7, 2020",
                  amount: 9400,
                },
              ]}
              balance={{
                orderTotal: 9400,
                returnTotal: 0,
                paidByCustomer: 9400,
                refunded: 0,
              }}
            />
          </div>
          <div className="col-lg-4 col-12">
            <CustomerContact
              shipping={contactInfo.shipping}
              billing={contactInfo.billing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
