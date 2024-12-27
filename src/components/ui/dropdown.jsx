'use client'
import Link from "next/link";
import React, { useRef, useState } from "react";


const CustomToggle = React.forwardRef(({children, variant, href}, ref) => {
    // const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
        onClick(event);
    }
    return (
        <Link 
            href={`${href}`}
            ref={ref}
            passHref
            className={variant}
        >
            {children}
        </Link>
    )
});
CustomToggle.displayName = "CustomToggle";
export default CustomToggle