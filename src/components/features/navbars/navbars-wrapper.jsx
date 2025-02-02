'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Navbars from "./navbars";

const NavbarsWrapper = () => {
    const pathname = usePathname();
    const showNabars = pathname !== "/Login" && pathname !== "/kiosk";
    return showNabars ? <Navbars /> : null;
}

export default NavbarsWrapper