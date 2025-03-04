"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/features/navbars/top-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";

const ResponsiveNav = ({ module }) => {
  const isMobile = UseIsMobile(1000); // Menggunakan custom hook yang sudah dibuat

  return !isMobile ? <TopNav module={module} /> : null;
};

export default ResponsiveNav;
