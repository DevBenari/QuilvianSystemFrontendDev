'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "./footer";

const FooterWrapper = () => {
    const pathname = usePathname();
      // Cek apakah navbar perlu ditampilkan
    const showNavbars = !(pathname === "/Login" || pathname.startsWith("/kiosk") || pathname === "/error-page");

    return showNavbars ? <Footer /> : null;
}

export default FooterWrapper;