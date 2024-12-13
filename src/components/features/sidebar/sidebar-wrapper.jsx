'use client'
import React from "react";
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";

const SideBarWrapper = ({children}) => {
    const pathname = usePathname();
    const isLogin = pathname === "/Login";
    
    return isLogin ? (
        <>{children}</>
    ) : (
        <div className="wrapper">
            <Sidebar />
            {children}
        </div>
    )
}

export default SideBarWrapper