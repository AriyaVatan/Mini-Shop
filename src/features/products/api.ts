import { apiClient } from "../../lib/axios";
import type { Product } from "./types";

export type PaginatedProducts = {
  page: number;
  limit: number;
  total: number;
  data: Product[];
};

export type ProductFilters = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
};

export const getPaginatedProducts = async (
  page: number,
  limit: number = 5,
): Promise<PaginatedProducts> => {
  const { data } = await apiClient.get<PaginatedProducts>(
    "/paginated-products",
    {
      params: { page, limit },
    },
  );

  return data;
};

export const getFilteredProducts = async (
  filters: ProductFilters,
): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>("/filtered-products", {
    params: filters,
  });

  return data;
};
