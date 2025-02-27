"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import { is } from "@amcharts/amcharts4/core";

const RawatJalanLayout = ({ children }) => {
  const isMobile = UseIsMobile(1500);

  return (
    <div>
      <Row>
        {/* Sidebar hanya muncul jika ukuran layar ≥ 1500 */}
        {/* {!isMobile && (
          <Col md="2" className="fixed">
            <ResponsiveNav module={"instalasiRawatJalan"} />
          </Col>
        )} */}

        {/* Content mengisi seluruh lebar jika ukuran layar < 1500 */}
        <Col md="12" className={isMobile ? "mt-5" : ""}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default RawatJalanLayout;
