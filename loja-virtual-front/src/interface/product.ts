export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  image_url: string;
  category?: {
    name: string;
  } | null;
};