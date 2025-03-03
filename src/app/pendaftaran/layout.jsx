"use client";
import React from "react";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import { Col, Row } from "react-bootstrap";
import Navbars from "@/components/features/navbars/navbars";

import { RiClipboardLine } from "react-icons/ri";
const LayoutPendaftaran = ({ children }) => {
  const isMobile = UseIsMobile(1000);

  return (
    <div>
      <Navbars
        module={"pendaftaran"}
        icon={RiClipboardLine}
        iconJudul={RiClipboardLine}
      />
      <Row>
        {/* Sidebar hanya muncul jika bukan mobile */}
        {!isMobile && (
          <Col md="2" className="fixed">
            <ResponsiveNav module={"pendaftaran"} />
          </Col>
        )}
        {/* Konten utama harus tetap col-md-10 */}
        <Col md={isMobile ? "12" : "10"} className={isMobile ? "mt-5" : ""}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default LayoutPendaftaran;
