'use client'
import React from "react";
import { usePathname } from "next/navigation";

const ContentPage = ({ children }) => {
    const pathname = usePathname();
    const isContent = pathname == "/Login";
    return isContent ? (
        <div className="content-page-login">{children}</div>
    ) : (
        <div id="content-page" className="content-page">
            {children}
        </div>
    )
}
export default ContentPage