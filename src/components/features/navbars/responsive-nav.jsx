"use client";
import React, { useEffect, useState } from "react";

import UseIsMobile from "@/lib/hooks/useIsMobile";
import Sidemenu from "./side-menu";

const ResponsiveNav = ({ module }) => {
  const isMobile = UseIsMobile(1000); // Menggunakan custom hook yang sudah dibuat

  return !isMobile ? <Sidemenu module={module} /> : null;
};

export default ResponsiveNav;
