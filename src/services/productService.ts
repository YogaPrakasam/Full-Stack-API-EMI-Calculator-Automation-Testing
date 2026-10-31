import { products, type Product } from "../data/products.js";

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "name" | "rating";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export function getProducts(filters: ProductFilters) {
  let result = [...products];

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();

    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.category) {
    result = result.filter(
      (product) =>
        product.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters.minPrice !== undefined) {
    result = result.filter(
      (product) => product.price >= filters.minPrice!
    );
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter(
      (product) => product.price <= filters.maxPrice!
    );
  }

  if (filters.sortBy) {
    const sortBy = filters.sortBy;
    const direction = filters.order === "desc" ? -1 : 1;

    result.sort((a, b) => {
      const first = a[sortBy];
      const second = b[sortBy];

      if (typeof first === "string" && typeof second === "string") {
        return first.localeCompare(second) * direction;
      }

      return (Number(first) - Number(second)) * direction;
    });
  }

  const total = result.length;
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const startIndex = (page - 1) * limit;

  return {
    data: result.slice(startIndex, startIndex + limit),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function createProduct(
  productData: Omit<Product, "id">
): Product {
  const newProduct: Product = {
    id: Math.max(0, ...products.map((product) => product.id)) + 1,
    ...productData
  };

  products.push(newProduct);

  return newProduct;
}
