import { useQuery } from "@tanstack/react-query";
import {
  getPaginatedProducts,
  getFilteredProducts,
  type ProductFilters,
} from "./api";

export const usePaginatedProducts = (page: number, limit: number = 5) => {
  return useQuery({
    queryKey: ["products", "paginated", page, limit],
    queryFn: () => getPaginatedProducts(page, limit),
  });
};

export const useFilteredProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: [
      "products",
      "filtered",
      filters.search,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
    ],

    queryFn: () => getFilteredProducts(filters),

    enabled:
      !!filters.search ||
      !!filters.category ||
      !!filters.minPrice ||
      !!filters.maxPrice,
  });
};
