import React from "react";

interface Order {
  id: string;
  customerName: string;
  date: string;
  paymentStatus: string;
  total: number;
  paymentMethod: string;
  orderStatus: string;
}

interface OrderRowProps {
  order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  return (
    <tr>
      <td className="sherah-table__column-1 sherah-table__data-1">
        <div className="sherah-language-form__input">
          <input
            className="sherah-language-form__check"
            id="checkbox"
            name="checkbox"
            type="checkbox"
          />
          <p className="crany-table__product--number">
            <a href="#" className="sherah-color1">
              #{order.id}
            </a>
          </p>
        </div>
      </td>
      <td className="sherah-table__column-2 sherah-table__data-2">
        <div className="sherah-table__product-content">
          <p className="sherah-table__product-desc">{order.customerName}</p>
        </div>
      </td>
      <td className="sherah-table__column-3 sherah-table__data-3">
        <p className="sherah-table__product-desc">{order.date}</p>
      </td>
      <td className="sherah-table__column-4 sherah-table__data-4">
        <div className="sherah-table__product-content">
          <div
            className={`sherah-table__status ${
              order.paymentStatus === "Paid" ? "sherah-color2" : "sherah-color1"
            } sherah-color2__bg--opactity`}
          >
            {order.paymentStatus}
          </div>
        </div>
      </td>
      <td className="sherah-table__column-5 sherah-table__data-5">
        <div className="sherah-table__product-content">
          <p className="sherah-table__product-desc">${order.total}</p>
        </div>
      </td>
      <td className="sherah-table__column-6 sherah-table__data-6">
        <div className="sherah-table__product-content">
          <p className="sherah-table__product-desc">{order.paymentMethod}</p>
        </div>
      </td>
      <td className="sherah-table__column-7 sherah-table__data-7">
        <div
          className={`sherah-table__status ${
            order.orderStatus === "Shipped" ? "sherah-color2" : "sherah-color4"
          } sherah-color2__bg--opactity`}
        >
          {order.orderStatus}
        </div>
      </td>
      <td className="sherah-table__column-8 sherah-table__data-8">
        <div className="sherah-table__status__group">
          <a
            href="#"
            className="sherah-table__action sherah-color2 sherah-color3__bg--opactity"
          >
            View
          </a>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
