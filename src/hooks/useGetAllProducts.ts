import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getAllProducts } from "@/services/products.service";

export function useGetAllProducts() {
  return useQuery({
    queryKey: queryKeys.products.allProducts,
    queryFn: getAllProducts,
  });
}
