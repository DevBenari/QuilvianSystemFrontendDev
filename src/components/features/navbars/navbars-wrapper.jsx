'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Navbars from "./navbars";

const NavbarsWrapper = () => {
    const pathname = usePathname();
    const showNabars = pathname !== "/Login";
    return showNabars ? <Navbars /> : null;
}

export default NavbarsWrapper