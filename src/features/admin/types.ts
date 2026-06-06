import type { Product } from "../products/types";

export type AdminProductStatus = "Active" | "Out of Stock";

export interface AdminProduct extends Product {
  status: AdminProductStatus;
}
