import axios from "axios";
import { ENV } from "./ENV";
import { emitCustomRedirect } from "./helpers/events/redirect-event";

export const apiService = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      req.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiService.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      emitCustomRedirect(
        `/auth/login?redirect=${globalThis.window.location.pathname}`,
      );
    } else if (error.response && error?.response?.status === 500) {
      emitCustomRedirect("/server-error");
    }
    return Promise.reject(error);
  },
);
