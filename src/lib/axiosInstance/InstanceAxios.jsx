import axios from "axios";
import { getHeaders } from "@/lib/headers/headers"; // Tetap gunakan getHeaders
import Cookies from "js-cookie";
import { showAlert } from "@/components/features/alert/custom-alert";

export const InstanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_QUILVIAN,
});

// Interceptor untuk menambahkan header secara dinamis sebelum setiap request
InstanceAxios.interceptors.request.use(
  (config) => { // Selalu perbarui headers dengan token terbaru
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani response error (terutama 401 Unauthorized)
InstanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Hapus token dari Cookies
      Cookies.remove("token");

      // Tampilkan SweetAlert session expired dengan delay untuk redirect
      showAlert.error(
        "Sesi Anda telah berakhir. Silakan login kembali.",
        () => {
          setTimeout(() => {
            window.location.replace("/Login"); // Gunakan window.location.replace() agar langsung redirect
          }, 500);
        }
      );
    }

    return Promise.reject(error);
  }
);
