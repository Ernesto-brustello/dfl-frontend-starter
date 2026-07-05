import type { ProductCategory } from "@/enums/product-category.enum";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: ProductCategory;
  supplierId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: ProductCategory;
  supplierId?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export type ProductCategoryFilter = ProductCategory | "all";

export interface ProductListParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  category?: ProductCategoryFilter;
}
