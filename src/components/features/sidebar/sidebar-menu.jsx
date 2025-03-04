'use client'

import Link from "next/link";
import React, { Fragment, memo, useState } from "react";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { usePathname } from "next/navigation";


// Sidebar Menu Component
const SideBarMenu = memo((props) => {
  const pathname = usePathname();
  
  return (
    <Fragment>
      {props.isTag === 'true' && (
        <li className={`${pathname === props.pathname ? 'active main-active' : ''}`}>
          <Link 
            className={`${pathname === props.pathname ? 'iq-waves-effect' : ''}`} 
            aria-current="page" 
            href={props.pathname}
          >
            {props.children}
            <span className="item-name">{props.title}</span>
            {props.isNew === 'true' && <span className="badge badge-danger">New</span>}
          </Link>
        </li>
      )}
    </Fragment>
  )
});

SideBarMenu.displayName = "SideBarMenu";
export default SideBarMenu