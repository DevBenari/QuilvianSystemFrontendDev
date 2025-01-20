'use client'
import React from "react";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
import UseIsMobile from "@/lib/hooks/useIsMobile";
import { Col, Row } from "react-bootstrap";

const LayoutMasterData = ({children}) => {
    const isMobile = UseIsMobile(1500)
    return (
        <div>
            <Row>
                <Col md="2" className="fixed">
                    <ResponsiveNav module={"masterData"} />
                </Col>
                <Col md={isMobile ? "12" : "10"} className={isMobile ? "mt-5" : ""}>{children}</Col>
            </Row>
        </div>
    )
}

export default LayoutMasterData;