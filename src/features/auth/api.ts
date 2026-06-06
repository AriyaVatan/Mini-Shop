import { apiClient } from "../../lib/axios";
import type { LoginFormData } from "./schema";

export async function loginApi(data: LoginFormData) {
  const res = await apiClient.post("/login", data);
  return res.data;
}
