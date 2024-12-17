import React from "react";

interface CustomerDetailsProps {
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

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div>
      <h2>{customer.name}</h2>
      <img src={customer.image} alt={customer.name} />
      <p>Email: {customer.email}</p>
      <p>Orders: {customer.orders}</p>
      <p>Country: {customer.country}</p>
      <p>Status: {customer.status}</p>
      <p>Join Date: {customer.joinDate}</p>
    </div>
  );
};

export default CustomerDetails;
