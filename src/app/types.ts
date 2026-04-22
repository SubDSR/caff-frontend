export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FrequentClient {
  dni: string;
  saldo_cafes: number;
}

export interface Promotion {
  id: string;
  name: string;
  discount: number;
  conditions: string;
}
