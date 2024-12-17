interface Order {
  id: string;
  date: string;
  status: string;
  items: number;
  amount: number;
}

interface CustomerOrdersTableProps {
  orders: Order[];
  totalSpent: number;
  totalOrders: number;
}

const CustomerOrdersTable: React.FC<CustomerOrdersTableProps> = ({
  orders,
  totalSpent,
  totalOrders,
}) => {
  return (
    <>
      <div className="sherah-table__head sherah-table__main">
        <h4 className="sherah-order-title">Orders</h4>
        <p className="sherah-order-text">
          Total spent ${totalSpent} on {totalOrders} orders
        </p>
      </div>
      <div className="sherah-table p-0">
        <table className="sherah-table__main sherah-table__main-v3">
          <tbody className="sherah-table__body">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="sherah-table__column-1 sherah-table__data-1">
                  <div className="sherah-table__product--id">
                    <p className="crany-table__product--number">
                      <a href="#" className="sherah-color1">
                        #{order.id}
                      </a>
                    </p>
                  </div>
                </td>
                <td className="sherah-table__column-2 sherah-table__data-2">
                  <div className="sherah-table__product-content">
                    <p className="sherah-table__product-desc">{order.date}</p>
                  </div>
                </td>
                <td className="sherah-table__column-3 sherah-table__data-3">
                  <div className="sherah-table__product-content">
                    <p className="sherah-table__product-desc">{order.status}</p>
                  </div>
                </td>
                <td className="sherah-table__column-4 sherah-table__data-4">
                  <div className="sherah-table__product-content">
                    <p className="sherah-table__product-desc">
                      {order.items} items
                    </p>
                  </div>
                </td>
                <td className="sherah-table__column-5 sherah-table__data-5">
                  <div className="sherah-table__product-content">
                    <p className="sherah-table__product-desc">
                      ${order.amount}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerOrdersTable;
