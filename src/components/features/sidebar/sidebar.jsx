'use client'
import Link from "next/link";
import React, { Fragment, memo, useState } from "react";
import { Image } from "react-bootstrap";
import SideBarItems from "./siderbar-items";
import { usePathname } from "next/navigation";

// Main Sidebar Component
const Sidebar = memo(() => {
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();
  const showSidebar = pathname !== "/Login";

  const minisidebar = () => {
    setIsClicked(!isClicked);
    document.body.classList.toggle('sidebar-main');
  };

  return showSidebar ? (
    <Fragment>
      <div className="iq-sidebar">
        <div className="iq-sidebar-logo d-flex justify-content-between">
          <Link href="/#">
            <Image src="/Images/icon-dashboard.png" className="img-fluid" alt="logo" />
          </Link>
          <div className="iq-menu-bt-sidebar">
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
          <SideBarItems />
        </div>
      </div>
    </Fragment>
  ) : null;
});

Sidebar.displayName = "Sidebar";
export default Sidebar;