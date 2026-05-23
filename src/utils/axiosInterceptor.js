// utils/axiosInterceptor.js
import axios from "axios";
import { toast } from "react-toastify";

let isToastShown = false;

// Các URL không cần redirect về login khi lỗi 401
const AUTH_URLS = [
  "/auth/reset-password",
  "/auth/verify-reset-otp",
  "/auth/update-password",
  "/auth/login",
  "/auth/register",
];

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;
      const requestUrl = error?.config?.url || "";
        console.log("Interceptor:", { status, message, requestUrl });

      // Bỏ qua redirect nếu đang gọi các API auth
      const isAuthUrl = AUTH_URLS.some((url) => requestUrl.includes(url));

      if (status === 401 && message?.includes("jwt expired") && !isAuthUrl) {
        if (!isToastShown) {
          localStorage.removeItem("token");
          toast.info("Phiên đăng nhập đã hết hạn.");
          isToastShown = true;
        }

        const event = new Event("tokenExpired");
        window.dispatchEvent(event);

        setTimeout(() => {
          isToastShown = false;
        }, 3000);

        navigate("/login", { replace: true });
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;