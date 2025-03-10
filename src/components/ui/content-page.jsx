'use client';

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const ContentPage = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    // State untuk menandakan apakah halaman seharusnya dirender
    const [shouldRender, setShouldRender] = useState(false);
    
    // Cek apakah pathname termasuk dalam hierarchy /kiosk atau adalah halaman login
    const isKioskRoute = pathname.startsWith("/kiosk");
    const isLoginPage = pathname === "/Login";
    
    // Cek token dan tentukan apakah halaman boleh dirender
    useEffect(() => {
        const token = Cookies.get('token');
        
        if (!token && !isLoginPage && !isKioskRoute) {
            // Redirect tanpa menunggu render
            router.replace('/Login');
            return;
        }
        
        // Jika sudah divalidasi, baru render konten
        setShouldRender(true);
    }, [isLoginPage, isKioskRoute, router]);
    
    // Return null saat validasi belum selesai untuk mencegah flash konten
    if (!shouldRender && !isLoginPage && !isKioskRoute) {
        return null;
    }
    
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