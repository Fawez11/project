import React from "react";
import OrderRow from "./OrderRow";

interface Order {
  id: string;
  customerName: string;
  date: string;
  paymentStatus: string;
  total: number;
  paymentMethod: string;
  orderStatus: string;
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="sherah-page-inner sherah-border sherah-default-bg mg-top-25">
      <div className="sherah-table">
        <div className="sherah-table__head">
          <h4 className="sherah-table__head-title">Order List</h4>
        </div>
        <table
          id="sherah-table__vendor"
          className="sherah-table__main sherah-table__main-v3"
        >
          <thead className="sherah-table__head">
            <tr>
              <th className="sherah-table__column-1 sherah-table__h1">
                Order ID
              </th>
              <th className="sherah-table__column-2 sherah-table__h2">
                Customer Name
              </th>
              <th className="sherah-table__column-3 sherah-table__h3">Date</th>
              <th className="sherah-table__column-4 sherah-table__h4">
                Payment Status
              </th>
              <th className="sherah-table__column-5 sherah-table__h5">Total</th>
              <th className="sherah-table__column-6 sherah-table__h6">
                Payment Method
              </th>
              <th className="sherah-table__column-7 sherah-table__h7">
                Order Status
              </th>
              <th className="sherah-table__column-8 sherah-table__h8">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="sherah-table__body">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
