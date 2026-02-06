import { apiService } from "@/lib/axios";
import type { LoginSchemaType } from "@/lib/schemas/login-schema";
import toast from "react-hot-toast";

export const login = async (data: LoginSchemaType) => {
  const res = await apiService.post("/auth/login", {
    ...data,
  });
  return res;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  toast.success("Logout successfull");
};
