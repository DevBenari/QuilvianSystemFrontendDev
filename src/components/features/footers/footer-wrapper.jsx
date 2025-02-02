'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "./footer";

const FooterWrapper = () => {
    const pathname = usePathname();
    const showFooter = pathname !== "/Login" && pathname !== "/kiosk";
    return showFooter ? <Footer /> : null;
}

export default FooterWrapper;