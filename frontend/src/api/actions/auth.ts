import { apiService } from "@/lib/axios";
import type { LoginSchemaType } from "@/lib/schemas/login-schema";

export const login = async (data: LoginSchemaType) => {
  const res = await apiService.post("/auth/login", {
    ...data,
  });
  return res;
};
