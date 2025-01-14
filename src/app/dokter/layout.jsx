'use client'
import React from "react"
import { Col, Row } from 'react-bootstrap'
import TopNav from '@/components/features/navbars/top-nav'
import UseIsMobile from "@/lib/hooks/useIsMobile";
import ResponsiveNav from "@/components/features/navbars/responsive-nav";
const LayoutDokter = ({children}) => {
    const isMobile = UseIsMobile(1500);
    return (
        <div>
            <Row className=''>
                <Col md="2" className=''>
                    <ResponsiveNav module={"dokter"} />
                </Col>
                <Col md={isMobile ? "12" : "10"} className={isMobile ? "mt-5" : ""}  >
                    {children}
                </Col>
            </Row>
        </div>
    )
}

export default LayoutDokter