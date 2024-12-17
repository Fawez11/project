interface Transaction {
  gateway: string;
  date: string;
  amount: number;
}

interface Balance {
  orderTotal: number;
  returnTotal: number;
  paidByCustomer: number;
  refunded: number;
}

interface OrderTransactionsProps {
  transactions: Transaction[];
  balance: Balance;
}

const OrderTransactions: React.FC<OrderTransactionsProps> = ({
  transactions,
  balance,
}) => {
  return (
    <>
      <div className="sherah-table--v1">
        <table className="sherah-table__main sherah-table__main--orderv1 sherah-border">
          <thead className="sherah-table__head">
            <tr>
              <th className="sherah-table__column-1 sherah-table__h1">
                Transactions
              </th>
              <th className="sherah-table__column-2 sherah-table__h2">Date</th>
              <th className="sherah-table__column-3 sherah-table__h3">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="sherah-table__body">
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="sherah-table__column-1 sherah-table__data-1">
                  <div className="sherah-table__product-name">
                    <h4 className="sherah-table__product-gateway">
                      {transaction.gateway}
                    </h4>
                  </div>
                </td>
                <td className="sherah-table__column-2 sherah-table__data-2">
                  <div className="sherah-table__product-content">
                    <p className="sherah-table__product-desc">
                      {transaction.date}
                    </p>
                  </div>
                </td>
                <td className="sherah-table__column-3 sherah-table__data-3">
                  <div className="sherah-table__product-content">
                    <p className="sherah-table__product-desc">
                      ${transaction.amount}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sherah-table--v1 mg-top-30">
        <table className="sherah-table__main sherah-table__main--orderv1 sherah-border">
          <thead className="sherah-table__head">
            <tr>
              <th className="sherah-table__column-1 sherah-table__h1">
                Balance
              </th>
              <th className="sherah-table__column-2 sherah-table__h2">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="sherah-table__body">
            <tr>
              <td className="sherah-table__column-1 sherah-table__data-1">
                <div className="sherah-table__product-name">
                  <h4 className="sherah-table__product-gateway">Order Total</h4>
                </div>
              </td>
              <td className="sherah-table__column-2 sherah-table__data-2">
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">
                    ${balance.orderTotal}
                  </p>
                </div>
              </td>
            </tr>
            {/* Add other balance rows similarly */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTransactions;
