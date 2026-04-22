import type { FrequentClient, Product, Promotion } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Espresso', price: 6.5, category: 'Cafés' },
  { id: '2', name: 'Cappuccino', price: 8, category: 'Cafés' },
  { id: '3', name: 'Latte', price: 8.5, category: 'Cafés' },
  { id: '4', name: 'Americano', price: 7, category: 'Cafés' },
  { id: '5', name: 'Mocha', price: 9.5, category: 'Cafés' },
  { id: '6', name: 'Frappé de Café', price: 12, category: 'Bebidas Frías' },
  { id: '7', name: 'Smoothie de Frutas', price: 11, category: 'Bebidas Frías' },
  { id: '8', name: 'Limonada Frozen', price: 9, category: 'Bebidas Frías' },
  { id: '9', name: 'Croissant', price: 6, category: 'Snacks' },
  { id: '10', name: 'Sándwich de Pollo', price: 14, category: 'Snacks' },
  { id: '11', name: 'Ensalada Cesar', price: 15, category: 'Snacks' },
  { id: '12', name: 'Brownie', price: 7.5, category: 'Postres' },
  { id: '13', name: 'Cheesecake', price: 10, category: 'Postres' },
  { id: '14', name: 'Tarta de Manzana', price: 9, category: 'Postres' },
];

export const PRODUCT_CATEGORIES = [...new Set(INITIAL_PRODUCTS.map(({ category }) => category))];

export const INITIAL_CLIENTS: FrequentClient[] = [
  { dni: '12345678', saldo_cafes: 5 },
  { dni: '87654321', saldo_cafes: 3 },
  { dni: '11111111', saldo_cafes: 0 },
  { dni: '22222222', saldo_cafes: 10 },
];

export const AVAILABLE_PROMOTIONS: Promotion[] = [
  {
    id: '1',
    name: '2x1 en Cafés',
    discount: 50,
    conditions: 'Válido en compras de 2 o más cafés del mismo tipo',
  },
  {
    id: '2',
    name: 'Combo Desayuno',
    discount: 20,
    conditions: 'Café + Croissant: 20% de descuento',
  },
  {
    id: '3',
    name: 'Happy Hour',
    discount: 30,
    conditions: 'De 3pm a 5pm: 30% en bebidas frías',
  },
];
