import Link from "next/link"
import React from "react"
import { Row, Col } from "react-bootstrap"
const DashboardPendaftaran = () => {
    return (
        <Col lg="12" >
            <Row>
                <Col md="6" lg="3">
                    <Link href={"/pendaftaran-pasien-baru"} className="iq-card">
                    <div className="iq-card-body iq-bg-primary rounded-4">
                        <div className="d-flex align-items-center justify-content-between">
                        <div className="rounded-circle iq-card-icon bg-primary">
                            <i className="ri-user-fill"></i>
                        </div>
                        <div className="text-end">
                            <h2 className="mb-0">Pendaftaran </h2>
                            <h5>total <span className="counter">250</span> pasien</h5>
                        </div>
                        </div>
                    </div>
                    </Link>
                </Col>
                <Col md="6" lg="3">
                    <Link href={"/#"} className="iq-card">
                    <div className="iq-card-body iq-bg-warning rounded-4">
                        <div className="d-flex align-items-center justify-content-between">
                        <div className="rounded-circle iq-card-icon bg-warning">
                            <i className="ri-women-fill"></i>
                        </div>
                        <div className="text-end">
                            <h3 className="mb-0 letter-space-1">Perjanjian</h3>
                        </div>
                        </div>
                    </div>
                    </Link>
                </Col>
                <Col md="6" lg="3">
                    <Link href={"/#"} className="iq-card">
                    <div className="iq-card-body iq-bg-danger rounded-4">
                        <div className="d-flex align-items-center justify-content-between">
                        <div className="rounded-circle iq-card-icon bg-danger">
                            <i className="ri-group-fill"></i>
                        </div>
                        <div className="text-end">
                            <h2 className="mb-0">Pasien Bayi</h2>
                        </div>
                        </div>
                    </div>
                    </Link>
                </Col>
                <Col md="6" lg="3">
                    <div className="iq-card">
                    <div className="iq-card-body iq-bg-info rounded-4">
                        <div className="d-flex align-items-center justify-content-between">
                        <div className="rounded-circle iq-card-icon bg-info">
                            <i className="ri-hospital-line"></i>
                        </div>
                        <div className="text-end">
                            <h2 className="mb-0">Pasien.....</h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </Col>
                </Row>
        </Col>
    )
}
export default DashboardPendaftaran