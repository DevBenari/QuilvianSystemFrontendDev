"use client";
import React from "react";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import { Col, Row } from "react-bootstrap";
import Navbars from "@/components/features/navbars/navbars";
import { RiHospitalLine } from "react-icons/ri";

const LayoutIGD = ({ children }) => {
  const isMobile = UseIsMobile(1000);
  return (
    <div>
      <Navbars module={"IGD"} iconJudul={RiHospitalLine} />
      <Row>
        <Col md="2" className="fixed">
          <ResponsiveNav module={"IGD"} />
        </Col>
        <Col md={isMobile ? "12" : "10"} className={isMobile ? "mt-5" : ""}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default LayoutIGD;
