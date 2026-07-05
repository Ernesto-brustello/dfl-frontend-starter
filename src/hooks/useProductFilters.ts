import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination.constants";
import { SEARCH_DEBOUNCE_MS } from "@/constants/app.constants";
import type { ProductCategoryFilter, ProductListParams } from "@/types";
import { useDebounce } from "./useDebounce";

export function useProductFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<ProductCategoryFilter>("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);

  const debouncedSearch = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);

  const params: ProductListParams = {
    page,
    pageSize,
    searchTerm: debouncedSearch || undefined,
    category,
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleCategoryChange = (value: ProductCategoryFilter) => {
    setCategory(value);
    setPage(1);
  };

  return {
    searchTerm,
    category,
    page,
    pageSize,
    params,
    setPage,
    handleSearchChange,
    handleCategoryChange,
  };
}
