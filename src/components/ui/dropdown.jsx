'use client'
import Link from "next/link";
import React, { useRef, useState } from "react";


const CustomToggle = React.forwardRef(({children, className, href}, ref) => {
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
            className={className}
        >
            {children}
        </Link>
    )
});
CustomToggle.displayName = "CustomToggle";
export default CustomToggle