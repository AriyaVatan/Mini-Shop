import type { Product } from "../products/types";
import type { AdminProduct } from "./types";

export function statusAdminProduct(product: Product): AdminProduct {
  return {
    ...product,
    status: product.stock === 0 ? "Out of Stock" : "Active",
  };
}
