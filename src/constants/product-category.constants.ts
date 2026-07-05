import type { ProductCategory } from "@/enums/product-category.enum";

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  electronics: "Eletrônicos",
  clothing: "Roupas",
  food: "Alimentos",
  other: "Outros",
};

export const PRODUCT_CATEGORY_FILTER_OPTIONS = [
  { value: "all", label: "Todas as categorias" },
  ...(Object.entries(PRODUCT_CATEGORY_LABELS) as [ProductCategory, string][]).map(
    ([value, label]) => ({ value, label }),
  ),
];
