export interface OrderProduct {
  id: string;
  name: string;
  image_url: string;
  price: number | string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number | string;
  product: OrderProduct;
}


export interface Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string; 
  complement?: string;
}


export interface Payment {
  id: string;
  method: 'credit_card' | 'pix' | 'boleto' | 'stripe';
  status: string;
  amount: number | string;
}

export interface Order {
  id: string;
  status: 'pending' | 'paid' | 'failed' | 'canceled';
  total: number | string;
  created_at: string;
  items: OrderItem[];
  address: Address; 
  payment: Payment; 
}