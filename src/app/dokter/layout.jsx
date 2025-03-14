"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import TopNav from "@/components/features/navbars/hamburger-menu";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import Navbars from "@/components/features/navbars/navbars";

const LayoutDokter = ({ children }) => {
  return (
    <div>
      <Row>{children}</Row>
    </div>
  );
};

export default LayoutDokter;
