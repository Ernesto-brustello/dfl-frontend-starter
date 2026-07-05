export const ProductCategory = {
  ELECTRONICS: "electronics",
  CLOTHING: "clothing",
  FOOD: "food",
  OTHER: "other",
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export const PRODUCT_CATEGORIES = Object.values(ProductCategory);
