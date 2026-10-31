export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 55000,
    stock: 12,
    rating: 4.5
  },
  {
    id: 2,
    name: "Smartphone",
    category: "Electronics",
    price: 25000,
    stock: 25,
    rating: 4.2
  },
  {
    id: 3,
    name: "Office Chair",
    category: "Furniture",
    price: 8500,
    stock: 8,
    rating: 4.0
  },
  {
    id: 4,
    name: "Headphones",
    category: "Electronics",
    price: 3000,
    stock: 40,
    rating: 4.3
  },
  {
    id: 5,
    name: "Study Table",
    category: "Furniture",
    price: 12000,
    stock: 5,
    rating: 4.1
  },
  {
    id: 6,
    name: "Keyboard",
    category: "Accessories",
    price: 1500,
    stock: 30,
    rating: 4.4
  },
  {
    id: 7,
    name: "Mouse",
    category: "Accessories",
    price: 800,
    stock: 50,
    rating: 4.0
  },
  {
    id: 8,
    name: "Monitor",
    category: "Electronics",
    price: 18000,
    stock: 10,
    rating: 4.6
  }
];
