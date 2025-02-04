'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Navbars from "./navbars";

const NavbarsWrapper = () => {
    const pathname = usePathname();

    // Cek apakah navbar perlu ditampilkan
    const showNavbars = !(pathname === "/Login" || pathname.startsWith("/kiosk"));

    return showNavbars ? <Navbars /> : null;
}

export default NavbarsWrapper;
