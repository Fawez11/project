import React from "react";
import { EditSvg, DeleteSvg } from "../svgComponenents/ActionSvg";

interface CustomerProps {
  customer: {
    id: number;
    name: string;
    image: string;
    email: string;
    orders: string;
    country: string;
    status: string;
    joinDate: string;
  };
}

const CustomerTableRow: React.FC<CustomerProps> = ({ customer }) => {
  return (
    <tr>
      <td className="sherah-table__column-1 sherah-table__data-1">
        <div className="sherah-table__product">
          <div className="sherah-language-form__input">
            <input
              className="sherah-language-form__check"
              id={`checkbox-${customer.id}`}
              name="checkbox"
              type="checkbox"
            />
          </div>
          <div className="sherah-table__vendor-img">
            <img src={customer.image} alt={customer.name} />
          </div>
          <h4 className="sherah-table__vendor--title">
            <a href="customers.html">{customer.name}</a>
          </h4>
        </div>
      </td>
      <td className="sherah-table__column-2 sherah-table__data-2">
        <div className="sherah-table__product-content">
          <p className="sherah-table__product-desc">{customer.email}</p>
        </div>
      </td>
      <td className="sherah-table__column-3 sherah-table__data-3">
        <div className="sherah-table__product-content">
          <p className="sherah-table__product-desc">{customer.orders}</p>
        </div>
      </td>
      <td className="sherah-table__column-4 sherah-table__data-4">
        <div className="sherah-table__product-content">
          <p className="sherah-table__product-desc">{customer.country}</p>
        </div>
      </td>
      <td className="sherah-table__column-5 sherah-table__data-5">
        <div className="sherah-table__status sherah-color3 sherah-color3__bg--opactity">
          {customer.status}
        </div>
      </td>
      <td className="sherah-table__column-6 sherah-table__data-6">
        <div className="sherah-table__product-content">
          <p className="sherah-table__product-desc">{customer.joinDate}</p>
        </div>
      </td>
      <td className="sherah-table__column-7 sherah-table__data-7">
        <div className="sherah-table__status__group">
          <a
            href="#"
            className="sherah-table__action sherah-color2 sherah-color3__bg--opactity"
          >
            <EditSvg />
          </a>
          <a
            href="#"
            className="sherah-table__action sherah-color2 sherah-color2__bg--opactity"
          >
            <DeleteSvg />
          </a>
        </div>
      </td>
    </tr>
  );
};

export default CustomerTableRow;
