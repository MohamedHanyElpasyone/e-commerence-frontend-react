export interface Product {
  category: string;
  price: number;
  title: string;
  rating: number;
  id: number;
  thumbnail: string;
  description: string;
}

export interface Data {
  products: Product[];
  total: number;
}

export interface Products {
  products: Product[];
}
