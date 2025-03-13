"use client";
import Link from "next/link";
import { Image } from "react-bootstrap";

import { usePathname } from "next/navigation";
import React, { Fragment, memo, useRef, useEffect, useState } from "react";
import SideBarItems from "./sidebar-items";

// Main Sidebar Component
const Sidebar = memo(() => {
  const pathname = usePathname();
  const showSidebar = pathname !== "/Login";

  return showSidebar ? (
    <Fragment>
      <div className="iq-sidebar">
        <div className="iq-sidebar-logo d-flex justify-content-between ">
          <Link href="/#">
            <Image
              src="/Images/icon-dashboard.png"
              className="img-fluid sidebar-logo"
              alt="logo"
            />
          </Link>
        </div>

        <SideBarItems />
      </div>
    </Fragment>
  ) : null;
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
