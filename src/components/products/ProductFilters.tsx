import { formFieldClass, Input } from "@/components/ui";
import { PRODUCT_CATEGORY_FILTER_OPTIONS } from "@/constants/product-category.constants";
import type { ProductCategoryFilter } from "@/types";

interface ProductFiltersProps {
  searchTerm: string;
  category: ProductCategoryFilter;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: ProductCategoryFilter) => void;
}

export function ProductFilters({
  searchTerm,
  category,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 sm:flex-row">
      <div className="flex-1">
        <label
          htmlFor="search"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Buscar por nome
        </label>
        <Input
          id="search"
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Digite o nome do produto..."
        />
      </div>
      <div className="sm:w-56">
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Categoria
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as ProductCategoryFilter)}
          className={formFieldClass}
        >
          {PRODUCT_CATEGORY_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
