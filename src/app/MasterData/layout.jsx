"use client";
import React from "react";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import { Col, Row } from "react-bootstrap";
import Navbars from "@/components/features/navbars/navbars";
import { RiDatabase2Line, RiClipboardLine } from "react-icons/ri";

const LayoutMasterData = ({ children }) => {
  const isMobile = UseIsMobile(1000);
  return (
    <div>
      <Navbars module={"masterData"} iconJudul={RiDatabase2Line} />
      <Row>
        <Col md="12">{children}</Col>
      </Row>
    </div>
  );
};

export default LayoutMasterData;
