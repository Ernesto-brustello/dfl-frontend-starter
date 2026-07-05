import { describe, expect, it, beforeEach } from "vitest";
import { mapApiProductToProduct } from "@/mappers/product.mapper";
import { getProducts, __resetProductsStoreForTests } from "@/services/products.service";
import { ProductCategory } from "@/enums/product-category.enum";
import type { ApiProduct } from "@/types/api-product.types";

describe("mapApiProductToProduct", () => {
  it("converte snake_case e price_cents para domínio", () => {
    const api: ApiProduct = {
      id: "99",
      product_name: "Teste",
      price_cents: "19990",
      stock_quantity: 3,
      category: ProductCategory.ELECTRONICS,
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2025-01-02T00:00:00.000Z",
    };

    const product = mapApiProductToProduct(api);

    expect(product.name).toBe("Teste");
    expect(product.price).toBe(199.9);
    expect(product.stock).toBe(3);
  });
});

describe("getProducts", () => {
  beforeEach(() => {
    __resetProductsStoreForTests();
  });

  it("retorna resposta paginada", async () => {
    const result = await getProducts({ page: 1, pageSize: 5 });

    expect(result.data).toHaveLength(5);
    expect(result.total).toBeGreaterThan(5);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBeGreaterThan(1);
  });
});
