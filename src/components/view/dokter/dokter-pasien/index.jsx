'use client'
import { Col, Image, Row, Tab, Nav, Table } from "react-bootstrap"

const DokterPage = () => {
    return (
        <div className="mt-3">
            <Row>
                <Col md="3">
                    <div className="iq-card py-2 my-2">
                        <div className="iq-card-header">
                            <Col md="12" className="my-3 " >
                                <Row>
                                    <Col xs="4">
                                        <Image
                                            src="/Images/jamal.jpg"
                                            className="img-fluid rounded w-100 h-100"
                                            alt="user"
                                        />
                                    </Col>
                                    <Col xs="8">
                                        <div className="d-flex flex-column gap-2">
                                            <p className="font-size-24 text-black" >Rizki Gunawan Adiputro, spB,dr. <span> (09:00 - 12:00)</span> </p>
                                            <button className="btn btn-primary">mulai</button>
                                        </div>
                                    </Col> 
                                </Row>
                            </Col>
                        </div>
                        <Col md="12" className="my-2">
                            <div className="iq-card-header ">
                                <Col md="12" className="mt-5 ">
                                    <div className="iq-card-pasien-name p-2">
                                        <h5> Pasien : Dio Dear Mahardika </h5>
                                        <p>00-84-22-89:: Laki-Laki ::  37 th 4 Bln 21 Hr</p>
                                    </div>
                                </Col>
                                {/* <Col md="12" className="mt-5 ">
                                    <div className="iq-card-pasien-name p-2">
                                        <h5> Pasien : Dio Dear Mahardika </h5>
                                        <p>00-84-22-89:: Laki-Laki ::  37 th 4 Bln 21 Hr</p>
                                    </div>
                                </Col>
                                <Col md="12" className="mt-5 ">
                                    <div className="iq-card-pasien-name p-2">
                                        <h5> Pasien : Dio Dear Mahardika </h5>
                                        <p>00-84-22-89:: Laki-Laki ::  37 th 4 Bln 21 Hr</p>
                                    </div>
                                </Col> */}
                                
                            </div>
                        </Col>
                    </div>
                </Col>
                <Col md="9" className="my-2 iq-card p-3">
                    <div className="iq-card-header">
                        <Col md="12" >
                            <Row>
                                <Col md="6">
                                    <div >
                                        <h5>nama pasien </h5>
                                        <p>Perempuan 16 Apr 1970 (54 Thn 8 Bln 2 Hr)</p>
                                        <button className="btn btn-primary mb-2">History resume</button>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col md="6">
                                            <div>
                                                <p className="m-0">Waktu Registrasi : 27/12/2024 08:00:00</p>
                                                <p className="m-0">Waktu Panggil       : 27/12/2024 08:00:00</p>
                                                <p className="m-0">Selisih Waktu       : 00:00</p>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div>
                                                <p className="m-0">Penjamin    : Umum</p>
                                                <p className="m-0">Alergi      : Disangkal</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <Col md="12" className="iq-card-header p-2">
                    <div >
                        <Tab.Container defaultActiveKey={"pills-home-fill"}>
                            <div className="iq-card-header d-flex justify-content-between">
                            {/* <div className="iq-header-title">
                                <h4 className="card-title">Tabs Fill and justify</h4>
                            </div> */}
                            </div>
                            <div className="iq-card-body">
                                <Nav
                                    as={"ul"}
                                    className="nav nav-pills mb-3 nav-fill"
                                    id="pills-tab-1"
                                    role="tablist"
                                >
                                    <Nav.Item as={"li"}>
                                    <Nav.Link
                                        id="pills-home-tab-fill"
                                        data-bs-toggle="pill"
                                        eventKey="CPPT"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected="true"
                                    >
                                        CPPT
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as={"li"}>
                                    <Nav.Link
                                        id="pills-profile-tab-fill"
                                        data-bs-toggle="pill"
                                        eventKey="SOAP"
                                        role="tab"
                                        aria-controls="pills-profile"
                                        aria-selected="false"
                                    >
                                        SOAP
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as={"li"}>
                                    <Nav.Link
                                        id="pills-contact-tab-fill"
                                        data-bs-toggle="pill"
                                        eventKey="Vital-Sign"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false"
                                    >
                                        Vital-Sign
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as={"li"}>
                                    <Nav.Link
                                        id="pills-contact-tab-fill"
                                        data-bs-toggle="pill"
                                        eventKey="Resep"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false"
                                    >
                                        Resep
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as={"li"}>
                                    <Nav.Link
                                        id="pills-contact-tab-fill"
                                        data-bs-toggle="pill"
                                        eventKey="Tindakan"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false"
                                    >
                                        Tindakan
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as={"li"}>
                                    <Nav.Link
                                        id="pills-contact-tab-fill"
                                        data-bs-toggle="pill"
                                        eventKey="Peralatab-Medis"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false"
                                    >
                                        Peralatan Medis
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as={"li"}>
                                    <Nav.Link
                                        id="pills-contact-tab-fill"
                                        data-bs-toggle="pill"
                                        eventKey="Penunjang"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false"
                                    >
                                        Penunjang
                                    </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content className="tab-content" id="pills-tabContent-1">
                                    <Tab.Pane
                                        className="tab-pane fade show"
                                        eventKey="CPPT"
                                        role="tabpanel"
                                        aria-labelledby="pills-home-tab-fill"
                                    >
                                        <div>
                                            <Row>
                                                <Col md="6">
                                                    <div>
                                                        <h1>Hallo</h1>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div>
                                                        <h1>hallo</h1>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane
                                    className="tab-pane fade"
                                    eventKey="SOAP"
                                    role="tabpanel"
                                    aria-labelledby="pills-profile-tab-fill"
                                    >
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the
                                        industrys standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and
                                        scrambled it to make a type specimen book.
                                    </p>
                                    </Tab.Pane>
                                    <Tab.Pane
                                        className="tab-pane fade"
                                        eventKey="Vital-Sign"
                                        role="tabpanel"
                                        aria-labelledby="pills-contact-tab-fill"
                                    >
                                        <div>
                                            <Col xs="12" className="iq-card">
                                                <div >
                                                    <h5 className="mb-3">Histori Vital sign</h5>
                                                    <div className="table-responsive-md w-100">
                                                        <Table className="text-center" bordered striped>
                                                            <thead>
                                                                <tr>
                                                                    <th>Tanggal</th>
                                                                    <th>No Registrasi</th>
                                                                    <th>Unit(REGIS)</th>
                                                                    <th>Edited By</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>                                    
                                                                <tr >
                                                                                                            
                                                                                                                
                                                                </tr>
                                                                                                    
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
                        </div>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default DokterPage