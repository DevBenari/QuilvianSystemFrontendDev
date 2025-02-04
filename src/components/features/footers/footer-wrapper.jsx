'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "./footer";

const FooterWrapper = () => {
    const pathname = usePathname();
      // Cek apakah navbar perlu ditampilkan
    const showNavbars = !(pathname === "/Login" || pathname.startsWith("/kiosk"));

    return showNavbars ? <Footer /> : null;
}

export default FooterWrapper;