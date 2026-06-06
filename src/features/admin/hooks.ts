import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../products/types";
import type { AdminProduct } from "./types";
import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "./api";
import { statusAdminProduct } from "./utils";

export function useAdminProducts() {
  return useQuery<Product[], Error, AdminProduct[]>({
    queryKey: ["admin-products"],
    queryFn: getAdminProducts,
    select: (products) => products.map(statusAdminProduct),
  });
}

export function useCreateAdminProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, "id">) => createAdminProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}

export function useUpdateAdminProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) =>
      updateAdminProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}

export function useDeleteAdminProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAdminProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}
