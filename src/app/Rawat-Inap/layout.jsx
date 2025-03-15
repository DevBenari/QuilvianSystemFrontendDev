"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import UseIsMobile from "@/lib/hooks/useIsMobile";

const RawatInapLayout = ({ children }) => {
  return (
    <div>
      <Row>
        <Col md="12">{children}</Col>
      </Row>
    </div>
  );
};

export default RawatInapLayout;
