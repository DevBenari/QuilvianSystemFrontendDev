"use client";
import Link from "next/link";
import { Image } from "react-bootstrap";
import SideBarItems from "./siderbar-items";
import { usePathname } from "next/navigation";
import React, { Fragment, memo, useRef, useEffect, useState } from "react";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import SideBarLogo from "./sidebar-logo";

// Main Sidebar Component
const Sidebar = memo(() => {
  const [isClicked, setIsClicked] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const pathname = usePathname();
  const showSidebar = pathname !== "/Login";
  const sidebarRef = useRef(null);
  const isMobile = UseIsMobile(1300); // Hanya aktif di layar < 1300px
  const [isMini, setIsMini] = useState(false);

  const minisidebar = () => {
    setIsClicked(!isClicked);
    setShowIcons(!showIcons);
    setIsMini(!isMini);
    document.body.classList.toggle("sidebar-main");
  };

  // Event untuk menutup sidebar ketika klik di luar sidebar
  useEffect(() => {
    if (!isMobile) return; // Hanya aktif jika layar di bawah 1300px

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsClicked(false);
        setShowIcons(false);
        setIsMini(false);
        document.body.classList.remove("sidebar-main");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  return showSidebar ? (
    <Fragment>
      <div className="iq-sidebar">
        <div className="iq-sidebar-logo d-flex justify-content-between ">
          <Link href="/#">
            <Image
              src={
                isMini ? "/Images/logo_mmc.jpeg" : "/Images/icon-dashboard.png"
              }
              className="img-fluid"
              alt="logo"
            />
          </Link>
          <div ref={sidebarRef} className="iq-menu-bt-sidebar">
            <div className="iq-menu-bt align-self-center">
              <div className="wrapper-menu">
                <div className="main-circle">
                  <i className="ri-more-fill"></i>
                </div>
                <div className="hover-circle">
                  <i className="ri-more-2-fill" onClick={minisidebar}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="sidebar-scrollbar">
          <SideBarItems isMini={isMini} />
        </div>
      </div>
    </Fragment>
  ) : null;
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
