import Link from "next/link";
import React, { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";

const ToggleCustom = ({children, eventKey, onClick}) => {
    const {activeEventKey} = useContext(AccordionContext)
    const decoratedOnClick = useAccordionButton(eventKey, (active) => {
        onClick({state: !active, eventKey: eventKey})
    })

    const isCurrentEventKey = activeEventKey === eventKey
    return (
        <Link 
            aria-expanded={isCurrentEventKey ? "true" : "false"}
            href={"/#"}
            className="nav-link"
            role="button"
            onClick={(e) => {
                e.preventDefault()
                decoratedOnClick(isCurrentEventKey)
            }}
        >
            {children}
        </Link>
    )
}

export default ToggleCustom