'use client'
import React from "react";
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";

const SideBarWrapper = ({children}) => {
    const pathname = usePathname();

    const isKioskRoute = pathname.startsWith("/kiosk");
    const isLogin = pathname === "/Login";
    
    if(isKioskRoute) {
        return <div className="content-page-login">{children}</div>
    } else if(isLogin){
        return <div className="content-page-login">{children}</div>
    }else{
        return (
            <div className="wrapper">
                <Sidebar />
                {children}
            </div>
        )
    }
}

export default SideBarWrapper