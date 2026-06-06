import { apiClient } from "../../lib/axios";
import type { Product } from "../products/types";

export const getAdminProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>("/products");
  return data;
};

export const createAdminProduct = async (product: Omit<Product, "id">) => {
  const { data } = await apiClient.post<Product>("/products", product);
  return data;
};

export const updateAdminProduct = async (
  id: number,
  product: Partial<Product>,
) => {
  const { data } = await apiClient.put<Product>(`/products/${id}`, product);
  return data;
};

export const deleteAdminProduct = async (id: number) => {
  const { data } = await apiClient.delete(`/products/${id}`);
  return data;
};
