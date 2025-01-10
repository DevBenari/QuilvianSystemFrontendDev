import React from "react"
import { Col, Row } from 'react-bootstrap'
import TopNav from '@/components/features/navbars/top-nav'
const LayoutDokter = ({children}) => {
    return (
        <div>
            <Row className=''>
                <Col md="2" className=''>
                    <TopNav module={"dokter"}/>
                </Col>
                <Col md="10" >
                    {children}
                </Col>
            </Row>
        </div>
    )
}

export default LayoutDokter