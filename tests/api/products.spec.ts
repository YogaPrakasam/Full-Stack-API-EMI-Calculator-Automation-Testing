import { test, expect } from "@playwright/test";

test.describe("Products API - Section B2", () => {

test("TC_API_001 - Get all products", async ({ request }) => {
const response = await request.get("/api/products");


expect(response.status()).toBe(200);

const body = await response.json();

expect(body.success).toBe(true);
expect(Array.isArray(body.data)).toBe(true);
expect(body.data.length).toBeGreaterThan(0);

for (const product of body.data) {
  expect(product).toHaveProperty("id");
  expect(product).toHaveProperty("name");
  expect(product).toHaveProperty("category");
  expect(product).toHaveProperty("price");
  expect(product).toHaveProperty("stock");
  expect(product).toHaveProperty("rating");
}


});

test("TC_API_002 - Get product by valid ID", async ({ request }) => {
const response = await request.get("/api/products/1");


expect(response.status()).toBe(200);

const body = await response.json();

expect(body.success).toBe(true);
expect(body.data.id).toBe(1);
expect(body.data.name).toBe("Laptop");


});

test("TC_API_003 - Search products by name", async ({ request }) => {
const response = await request.get(
"/api/products?search=Laptop"
);


expect(response.status()).toBe(200);

const body = await response.json();

expect(body.success).toBe(true);
expect(body.data.length).toBeGreaterThan(0);

for (const product of body.data) {
  expect(product.name.toLowerCase()).toContain("laptop");
}


});

test("TC_API_004 - Filter products by category", async ({ request }) => {
const response = await request.get(
"/api/products?category=Electronics"
);


expect(response.status()).toBe(200);

const body = await response.json();

expect(body.success).toBe(true);
expect(body.data.length).toBeGreaterThan(0);

for (const product of body.data) {
  expect(product.category).toBe("Electronics");
}


});

test("TC_API_005 - Filter products by price range", async ({ request }) => {
const response = await request.get(
"/api/products?minPrice=10000&maxPrice=50000"
);


expect(response.status()).toBe(200);

const body = await response.json();

expect(body.success).toBe(true);

for (const product of body.data) {
  expect(product.price).toBeGreaterThanOrEqual(10000);
  expect(product.price).toBeLessThanOrEqual(50000);
}


});

test("TC_API_006 - Sort and paginate products", async ({ request }) => {
const response = await request.get(
"/api/products?sortBy=price&order=asc&page=1&limit=2"
);


expect(response.status()).toBe(200);

const body = await response.json();

expect(body.success).toBe(true);
expect(body.data.length).toBeLessThanOrEqual(2);

const prices = body.data.map(
  (product: { price: number }) => product.price
);

expect(prices).toEqual([...prices].sort((a, b) => a - b));


});

test("TC_API_007 - Reject invalid price range", async ({ request }) => {
const response = await request.get(
"/api/products?minPrice=50000&maxPrice=10000"
);


expect(response.status()).toBe(400);


});

test("TC_API_008 - Reject invalid sorting parameter", async ({ request }) => {
const response = await request.get(
"/api/products?sortBy=invalid"
);


expect(response.status()).toBe(400);


});

test("TC_API_009 - Return 404 for non-existent product", async ({ request }) => {
const response = await request.get("/api/products/99999");


expect(response.status()).toBe(404);

});

});
