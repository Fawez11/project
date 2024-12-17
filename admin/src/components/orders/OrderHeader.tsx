interface OrderHeaderProps {
  orderId: string;
  date: string;
  itemCount: number;
  totalAmount: number;
  status: {
    payment: string;
    fulfillment: string;
  };
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  orderId,
  date,
  itemCount,
  totalAmount,
  status,
}) => {
  return (
    <div className="sherah-table__head sherah-table__main">
      <h4 className="sherah-order-title">Items from Order #{orderId}</h4>
      <div className="sherah-order-right">
        <p className="sherah-order-text">
          {date} / {itemCount} items / Total ${totalAmount}
        </p>
        <div className="sherah-table-status">
          <div className="sherah-table__status sherah-color2 sherah-color2__bg--opactity">
            {status.payment}
          </div>
          <div className="sherah-table__status sherah-color3 sherah-color3__bg--opactity">
            {status.fulfillment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
