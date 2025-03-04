"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";

const InstalasiBedahLayout = ({ children }) => {
  const isMobile = UseIsMobile(1500);

  return (
    <div>
      <Row>
        {/* Sidebar hanya muncul jika ukuran layar ≥ 1500 */}

        {/* Content mengisi seluruh lebar jika ukuran layar < 1500 */}
        <Col md="12" className={isMobile ? "mt-5" : ""}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default InstalasiBedahLayout;
