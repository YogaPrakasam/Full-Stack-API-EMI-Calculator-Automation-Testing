import type { Request, Response } from "express";
import { z } from "zod";
import {
  getProducts,
  getProductById,
  createProduct
} from "../services/productService.js";

const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sortBy: z.enum(["price", "name", "rating"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10)
}).refine(
  (data) =>
    data.minPrice === undefined ||
    data.maxPrice === undefined ||
    data.minPrice <= data.maxPrice,
  {
    message: "minPrice cannot be greater than maxPrice"
  }
);

const createProductSchema = z.object({
  name: z.string().trim().min(2),
  category: z.string().trim().min(2),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  rating: z.number().min(0).max(5)
});

export function listProducts(req: Request, res: Response) {
  const validation = productQuerySchema.safeParse(req.query);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid query parameters",
      errors: validation.error.issues
    });
  }

  const result = getProducts(validation.data);

  return res.status(200).json({
    success: true,
    ...result
  });
}

export function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Product ID must be a positive integer"
    });
  }

  const product = getProductById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  return res.status(200).json({
    success: true,
    data: product
  });
}

export function addProduct(req: Request, res: Response) {
  const validation = createProductSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
      errors: validation.error.issues
    });
  }

  const product = createProduct(validation.data);

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product
  });
}
