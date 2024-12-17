interface CustomerProfileProps {
  customer: {
    name: string;
    phone: string;
    email: string;
    balance: number;
    lastOrder: {
      days: number;
      id: string;
    };
    averageOrderValue: number;
    emailMarketing: string;
    image: string;
  };
}

const CustomerProfileCard: React.FC<CustomerProfileProps> = ({ customer }) => {
  return (
    <div className="sherah-upcard">
      <div className="sherah-upcard__thumb">
        <img src={customer.image} alt="Customer Profile" />
      </div>
      <div className="sherah-upcard__heading">
        <h3 className="sherah-upcard__title">{customer.name}</h3>
        <p className="sherah-upcard__phone">{customer.phone}</p>
        <p className="sherah-upcard__email">
          <a href={`mailto:${customer.email}`}>{customer.email}</a>
        </p>
      </div>
      <div className="sherah-upcard__balance sherah-default-bg sherah-border">
        Balance ${customer.balance}
      </div>
      <ul className="sherah-upcard__list mg-top-40">
        <li>
          <b>Last Order</b>
          <span>
            {customer.lastOrder.days} days ago –
            <a className="sherah-color1">#{customer.lastOrder.id}</a>
          </span>
        </li>
        <li>
          <b>Average Order Value</b>
          <span>${customer.averageOrderValue}</span>
        </li>
        <li>
          <b>Email Marketing</b>
          <span>{customer.emailMarketing}</span>
        </li>
      </ul>
    </div>
  );
};

export default CustomerProfileCard;
