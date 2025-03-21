"use client";
// components/ScrollLayout.js
import { useEffect } from "react";
import store from "@/lib/state/store";
import { Provider } from "react-redux";
import AuthWrapper from "./auth-wrapper";

export default function ScrollLayout({ children }) {
  useEffect(() => {
    // Menangani scroll ke atas ketika halaman dimuat
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Provider store={store}>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </Provider>
    </>
  );
}
