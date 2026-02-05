import axios from "axios";
import { ENV } from "./ENV";

export const apiService = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("localStorage");
    if (accessToken) {
      req.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (
      req.url === "/products/add" &&
      localStorage.getItem("role") !== "seller"
    )
      throw new Error("Only seller can add products");

    return req;
  },
  (error) => {
    return Promise.reject(error);
  },
);
