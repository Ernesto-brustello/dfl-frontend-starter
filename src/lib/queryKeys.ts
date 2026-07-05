import type { ProductListParams } from "@/types";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    allProducts: ["products", "all"] as const,
    lists: () => ["products", "list"] as const,
    list: (params: ProductListParams) => ["products", "list", params] as const,
    detail: (id: string) => ["products", id] as const,
  },
  suppliers: {
    all: ["suppliers"] as const,
  },
} as const;
