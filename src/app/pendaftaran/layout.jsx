"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

const LayoutPendaftaran = ({ children }) => {
  return (
    <div>
      <Row>{children}</Row>
    </div>
  );
};

export default LayoutPendaftaran;
