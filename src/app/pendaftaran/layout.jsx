"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import Navbars from "@/components/features/navbars/navbars";

const PendaftaranLayout = ({ children }) => {
  const isMobile = UseIsMobile(1500);

  return (
    <div>
      <Navbars module={"pendaftaran"} />
      <Row>
        {/* Sidebar hanya muncul jika ukuran layar ≥ 1500 */}
        <Col md="2" className="fixed">
          <ResponsiveNav module={"pendaftaran"} />
        </Col>

        {/* Content mengisi seluruh lebar jika ukuran layar < 1500 */}
        <Col md={isMobile ? "12" : "10"} className={isMobile ? "mt-5" : ""}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default PendaftaranLayout;
