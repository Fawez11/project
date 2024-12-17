export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  profileImage?: string;
  role?: string;
}

export interface Order {
  id: string;
  orderId: string;
  products: string;
  date: string;
  total: number;
  status: string;
}

export interface CustomerProfileProps {
  customer: Customer;
}

export interface CustomerOrdersProps {
  orders: Order[];
}
