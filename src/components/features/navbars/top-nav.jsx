  'use client';
  import React, { useEffect, useState } from "react";
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
      <div className={` iq-card fixed-header`}>
        <div className="iq-navbar-custom px-4">
          <div className="topnav-container">
            {/* Sidebar (your existing sidebar layout) */}
            <div className="sidebar">
              {/* Sidebar content */}
            </div>

            {/* Submenu below the sidebar */}
            <div className="submenu">
              <div className="submenu-list">
                {menu.map((item, index) => (
                  <div key={index} className="menu-item">
                    <h5>{item.title}</h5>
                    <ul className="submenu-items">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="submenu-item">
                          <Link href={subItem.href}>{subItem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TopNav;
