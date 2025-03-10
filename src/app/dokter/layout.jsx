"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import TopNav from "@/components/features/navbars/hamburger-menu";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import Navbars from "@/components/features/navbars/navbars";

const LayoutDokter = ({ children }) => {
  const isMobile = UseIsMobile(1500);
  return (
    <div>
      <Navbars module={"dokter"} />
      <Row>
        {!isMobile && (
          <Col md="2" className="fixed">
            <ResponsiveNav module={"dokter"} />
          </Col>
        )}
        <Col md={isMobile ? "12" : "10"} className={isMobile ? "mt-5" : ""}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default LayoutDokter;
