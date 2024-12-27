'use client';
import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { menus } from "@/utils/config";
import Link from "next/link";

const TopNav = ({ module }) => {
  const [isFixed, setIsFixed] = useState(false);
  const menu = menus[module] || []; 

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY >= 75);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`iq-topNav fixed-header`}>
      <div className="iq-navbar-custom px-4">
        <Navbar expand="lg" className="nav-item d-flex align-items-center border-1 border-color">
          <Navbar.Toggle aria-controls="topnav-navbar" className="search-toggle iq-waves-effect ml-2" />
          <Navbar.Collapse id="topnav-navbar">
            <Nav className="me-auto ml-3">
              {menu.map((item, index) => (
                <NavDropdown
                  key={index}
                  title={item.title}
                  id={`${item.title.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
                  renderMenuOnMount
                  className="iq-sub-dropdown"
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <NavDropdown.Item className="bg-blue" as="div" key={subIndex}>
                      <Link href={subItem.href}>{subItem.title}</Link>
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default TopNav;
