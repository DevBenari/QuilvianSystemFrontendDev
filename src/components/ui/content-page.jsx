'use client'
import React from "react";
import { usePathname } from "next/navigation";

const ContentPage = ({ children }) => {
    const pathname = usePathname();

    // Cek apakah pathname termasuk dalam hierarchy /kiosk atau adalah halaman login
    const isKioskRoute = pathname.startsWith("/kiosk");
    const isLoginPage = pathname === "/Login";

    // Pilih container berdasarkan rute
    if (isKioskRoute) {
        return <div className="content-page-kiosk">{children}</div>;
    } else if (isLoginPage) {
        return <div className="content-page-login">{children}</div>;
    } else {
        return (
            <div id="content-page" className="content-page">
                {children}
            </div>
        );
    }
};

export default ContentPage;
