import type { ApiProduct } from "@/types/api-product.types";
import type { Product } from "@/types/product.types";

export function mapApiProductToProduct(api: ApiProduct): Product {
  return {
    id: api.id,
    name: api.product_name,
    price: Number(api.price_cents) / 100,
    stock: api.stock_quantity,
    category: api.category,
    supplierId: api.supplier_id,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  };
}

export function mapProductToApiProduct(product: Product): ApiProduct {
  return {
    id: product.id,
    product_name: product.name,
    price_cents: String(Math.round(product.price * 100)),
    stock_quantity: product.stock,
    category: product.category,
    supplier_id: product.supplierId,
    created_at: product.createdAt,
    updated_at: product.updatedAt,
  };
}

export function mapCreateDtoToApiProduct(
  dto: {
    name: string;
    price: number;
    stock: number;
    category: Product["category"];
    supplierId?: string;
  },
  id: string,
  timestamps: { createdAt: string; updatedAt: string },
): ApiProduct {
  return {
    id,
    product_name: dto.name,
    price_cents: String(Math.round(dto.price * 100)),
    stock_quantity: dto.stock,
    category: dto.category,
    supplier_id: dto.supplierId,
    created_at: timestamps.createdAt,
    updated_at: timestamps.updatedAt,
  };
}
