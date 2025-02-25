"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/features/navbars/top-nav";
import Sidemenu from "@/components/features/navbars/side-menu";

const ResponsiveNav = ({ module }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tentukan apakah ukuran layar < 1500px
    };

    // Initial check and event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <Sidemenu module={module} /> : <TopNav module={module} />;
};

export default ResponsiveNav;
