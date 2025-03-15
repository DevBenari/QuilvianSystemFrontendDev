"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";

const RawatLaboratoriumLayout = ({ children }) => {
  return (
    <div>
      <Row>
        <Col md="12">{children}</Col>
      </Row>
    </div>
  );
};

export default RawatLaboratoriumLayout;
