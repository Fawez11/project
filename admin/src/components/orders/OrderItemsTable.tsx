interface OrderItem {
  image: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderItemsTableProps {
  items: OrderItem[];
  totals: {
    subtotal: number;
    storeCredit: number;
    deliveryCharges: number;
    shipping: number;
    vatTax: number;
    total: number;
  };
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items, totals }) => {
  return (
    <div className="sherah-table-order">
      <table className="sherah-table__main sherah-table__main--orderv1">
        <thead className="sherah-table__head">
          <tr>
            <th className="sherah-table__column-1 sherah-table__h1">Product</th>
            <th className="sherah-table__column-2 sherah-table__h2">
              Products name
            </th>
            <th className="sherah-table__column-3 sherah-table__h3">Price</th>
            <th className="sherah-table__column-4 sherah-table__h4">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody className="sherah-table__body">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="sherah-table__column-1 sherah-table__data-1">
                <div className="sherah-table__product--thumb">
                  <img src={item.image} alt={item.name} />
                </div>
              </td>
              <td className="sherah-table__column-2 sherah-table__data-2">
                <div className="sherah-table__product-name">
                  <h4 className="sherah-table__product-name--title">
                    {item.name}
                  </h4>
                  <p className="sherah-table__product-name--text">
                    Color: {item.color}
                  </p>
                </div>
              </td>
              <td className="sherah-table__column-3 sherah-table__data-3">
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </td>
              <td className="sherah-table__column-4 sherah-table__data-4">
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">${item.total}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order-totals">
        <ul className="order-totals__list">
          <li className="order-totals__list--sub">
            <span>Subtotal</span>
            <span className="order-totals__amount">${totals.subtotal}</span>
          </li>
          <li>
            <span>Store Credit</span>
            <span className="order-totals__amount">$-{totals.storeCredit}</span>
          </li>
          <li>
            <span>Delivery Charges</span>
            <span className="order-totals__amount">
              ${totals.deliveryCharges}
            </span>
          </li>
          <li>
            <span>Shipping</span>
            <span className="order-totals__amount">${totals.shipping}</span>
          </li>
          <li>
            <span>Vat Tax</span>
            <span className="order-totals__amount">${totals.vatTax}</span>
          </li>
          <li className="order-totals__bottom">
            <span>Total</span>
            <span className="order-totals__amount">${totals.total}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderItemsTable;
