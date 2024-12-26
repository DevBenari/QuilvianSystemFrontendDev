'use client'
import React, {Fragment, memo, useEffect, useState} from "react";
import CustomToggle from "@/components/ui/dropdown";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { menuPendaftaran } from "@/utils/config";
import Link from "next/link";

const TopNav = () => {
    const [isFixed, setIsFixed] = useState(false);
    
        useEffect(() => {
            const handleScroll = () => {
              if (window.scrollY >= 75) {
                setIsFixed(true);
              } else {
                setIsFixed(false);
              }
            };
        
            window.addEventListener("scroll", handleScroll);
        
            return () => {
              window.removeEventListener("scroll", handleScroll);
            };
          }, []);
    return (
        <div className={`iq-topNav fixed-header`}>
            <div className="iq-navbar-custom ">
                <Navbar expand="lg" className="nav-item d-flex align-items-center border-1 border-color">
                        <Navbar.Toggle aria-controls="topnav-navbar" className="search-toggle iq-waves-effect ml-2" />
                        <Navbar.Collapse id="topnav-navbar">
                            <Nav className="me-auto ml-3">
                            {/* Pendaftaran */}
                            {menuPendaftaran.map((item, index) => (
                                <NavDropdown 
                                    key={index}
                                    title={item.title}
                                    id={`${item.title.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
                                    renderMenuOnMount
                                    className="iq-sub-dropdown"
                                >
                                    {item.subItems.map((subItem, subIndex) => (
                                        <NavDropdown.Item className="bg-blue" as="div" key={subIndex}>
                                            <div className="media align-items-center d-flex">
                                                <Link href={`${subItem.href}`}>{subItem.title}</Link>
                                            </div>
                                            
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ))}

                            {/* Pemesanan Bed */}
                            <Nav.Link href="/pemesanan-bed">Pemesanan Bed</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
         </div>
    )
}

export default TopNav