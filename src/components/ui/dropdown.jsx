'use client'
import Link from "next/link";
import React, { useRef } from "react";


const CustomToggle = React.forwardRef(({children, variant, onClick}, ref) => {
    // const ref = useRef(null)
    return (
        <Link 
            href={"/#"}
            ref={ref}
            onClick={(event) => {
                event.preventDefault();
                onClick(event);
            }}
            className={variant}
        >
            {children}
        </Link>
    )
});
CustomToggle.displayName = "CustomToggle";
export default CustomToggle