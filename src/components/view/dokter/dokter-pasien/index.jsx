'use client'

import ReusableTabs from "@/components/ui/tabs-ui"

import { Col, Image, Row} from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import SoapDokter from "./soap-dokter"
import CpptDokter from "./cppt-dokter"
import ResepDokter from "./resep-dokter"
import VitalSign from "./vital-sign"


const DokterPage = () => {
    const methods = useForm();

    // const onSubmit = (data) => {
    //     console.log(data);
    // }

    // const handleButtonClick = () => {
    //     alert("Mulai ditekan!");
    //   };
    return (
        <div className="mt-3" >
            <FormProvider {...methods}>
                <Col xs="12" className="iq-card">
                    <Row>
                        <Col md="3">
                            <div className="iq-card-profile-dokter py-2  ">
                                
                                <div className="iq-card-header mt-3">
                                    <h3>List Pasien :</h3>
                                </div>
                                <Col md="12" className="my-2">
                                    <div className="iq-card-body">
                                        {/* <h4>Sedang tidak ada Pasien</h4> */}
                                        <Col md="12" className="mt-1 ">
                                            <div className="iq-card-pasien-name p-2">
                                                <h5> Pasien : Dio Dear Mahardika </h5>
                                                <p>00-84-22-89:: Laki-Laki ::  37 th 4 Bln 21 Hr</p>
                                            </div>
                                        </Col>
                                        <Col md="12" className="mt-2 ">
                                            <div className="iq-card-pasien-name p-2">
                                                <h5> Pasien : Dio Dear Mahardika </h5>
                                                <p>00-84-22-89:: Laki-Laki ::  37 th 4 Bln 21 Hr</p>
                                            </div>
                                        </Col>
                                        <Col md="12" className="mt-2 ">
                                            <div className="iq-card-pasien-name p-2">
                                                <h5> Pasien : Dio Dear Mahardika </h5>
                                                <p>00-84-22-89:: Laki-Laki ::  37 th 4 Bln 21 Hr</p>
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                        
                        <Col md="9" className="my-2 iq-card py-3">
                            <div className="iq-card-header">
                                <Col md="12" >
                                    <Row>
                                        <Col md="6">
                                            <div className="">
                                                <Col md="12" className="" > 
                                                    <Row>
                                                        <Col xs="3" className="mb-3">
                                                            <Image
                                                                src="/Images/jamal.jpg"
                                                                className="img-fluid rounded w-100 h-100"
                                                                alt="user"  
                                                            />
                                                        </Col>
                                                        <Col xs="9">
                                                            <div className="d-flex flex-column gap-2">
                                                                <h4 className=" text-black" >Rizki Gunawan Adiputro, spB,dr. <span> (09:00 - 12:00)</span> </h4>
                                                                
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <Col md="12" className="mb-2" >
                                                <div className="d-flex flex-row gap-5">
                                                    <div className="">
                                                        <h5>nama pasien </h5>
                                                        <p>Perempuan 16 Apr 1970 (54 Thn 8 Bln 2 Hr)</p>
                                                    </div>
                                                    <button className="btn btn-primary mb-2 ">History resume</button>
                                                </div>
                                            </Col>
                                            <Col md="12">
                                                <Row>
                                                    <Col md="8">
                                                        <div>
                                                            <p className="m-0">Waktu Registrasi : 27/12/2024 08:00:00</p>
                                                            <p className="m-0">Waktu Panggil       : 27/12/2024 08:00:00</p>
                                                            <p className="m-0">Selisih Waktu       : 00:00</p>
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div>
                                                            <p className="m-0">Penjamin    : Umum</p>
                                                            <p className="m-0">Alergi      : Disangkal</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                            <Col md="12" className="iq-card-header p-2">
                            <div>
                                <ReusableTabs >
                                    <ReusableTabs.TabItem eventKey="tab1" title="VITAL-SIGN">
                                        <VitalSign />
                                    </ReusableTabs.TabItem>
                                    <ReusableTabs.TabItem eventKey="tab2" title="SOAP">
                                        <SoapDokter />
                                    </ReusableTabs.TabItem>
                                    <ReusableTabs.TabItem eventKey="tab3" title="CPPT">
                                        <CpptDokter />
                                    </ReusableTabs.TabItem>
                                    <ReusableTabs.TabItem eventKey="tab4" title="RESEP">
                                        <ResepDokter />
                                    </ReusableTabs.TabItem>
                                    <ReusableTabs.TabItem eventKey="tab5" title="TINDAKAN">
                                        <div>Konten Tab 5</div>
                                    </ReusableTabs.TabItem>
                                    <ReusableTabs.TabItem eventKey="tab6" title="PERALATAN MEDIS">
                                        <div>Konten Tab 6</div>
                                    </ReusableTabs.TabItem>
                                    <ReusableTabs.TabItem eventKey="tab7" title="PENUNJANG">
                                        <div>Konten Tab 7</div>
                                    </ReusableTabs.TabItem>
                                </ReusableTabs>
                            </div>
                            </Col>
                        </Col>
                    </Row>
                </Col>
            </FormProvider>
        </div>
    )
}

export default DokterPage;