import type { ProductCategory } from "@/enums/product-category.enum";

export interface ApiProduct {
  id: string;
  product_name: string;
  price_cents: string;
  stock_quantity: number;
  category: ProductCategory;
  supplier_id?: string;
  created_at: string;
  updated_at: string;
}
