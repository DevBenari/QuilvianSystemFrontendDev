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
            <FormProvider {...methods}>a
                <Row>
                    <Col md="3">
                        <div className="iq-card iq-card-profile-dokter py-2 my-2 ">
                            <div className="iq-card-header">
                                <Col md="12" className="my-3 iq-card-body " >
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
                                <div className="iq-card-body">
                                    {/* <h4>Sedang tidak ada Pasien</h4> */}
                                    <Col md="12" className="mt-3 ">
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
                                    <Col md="5">
                                        <div >
                                            <h5>nama pasien </h5>
                                            <p>Perempuan 16 Apr 1970 (54 Thn 8 Bln 2 Hr)</p>
                                            <button className="btn btn-primary mb-2">History resume</button>
                                        </div>
                                    </Col>
                                    <Col md="7">
                                        <Row>
                                            <Col md="7">
                                                <div>
                                                    <p className="m-0">Waktu Registrasi : 27/12/2024 08:00:00</p>
                                                    <p className="m-0">Waktu Panggil       : 27/12/2024 08:00:00</p>
                                                    <p className="m-0">Selisih Waktu       : 00:00</p>
                                                </div>
                                            </Col>
                                            <Col md="5">
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
                        <div>
                            <ReusableTabs >
                                <ReusableTabs.TabItem eventKey="tab1" title="VITAL-SIGN">
                                    <VitalSign />
                                </ReusableTabs.TabItem>
                                <ReusableTabs.TabItem eventKey="tab2" title="SOAP">
                                    <SoapDokter />

                                    {/* <Col xs="12" className="mt-5">
                                        <Row className="g-4 ">
                                            <Col xs="3" className=" ">
                                                <TextField 
                                                    name="tekananDarah"
                                                    label="Tekanan Darah :  * "
                                                    placeholder={''}
                                                    rules={{ required: 'Tekanan Darah harus diisi' }} 
                                                    disabled={true}
                                                    value={"120/08 mmHg"}
                                                            
                                                />
                                            </Col>
                                            <Col xs="3" className=" ">
                                                <TextField 
                                                    name="beratBadan"
                                                    label="Berat Badan :  *  "
                                                    placeholder={''}
                                                    rules={{ required: 'Tekanan Darah harus diisi' }} 
                                                    disabled={true}
                                                    value={"60 Kg"}
                                                />
                                            </Col>
                                            <Col xs="3" className=" ">
                                                <TextField 
                                                    name="tinggiBadan"
                                                    label="Tinggi Badan :  *  "
                                                    placeholder={''}
                                                    rules={{ required: 'tinggi Badan harus diisi' }} 
                                                    disabled={true}
                                                    value={"168 cm"}
                                                />
                                            </Col>
                                            <Col xs="3" className="">
                                                <TextField 
                                                    name="heartRate"
                                                    label="Heart Rate :  *"
                                                    placeholder={''}
                                                    rules={{ required: 'Tekanan Darah harus diisi' }} 
                                                    disabled={true}
                                                    value={"91 / menit"}
                                                />
                                            </Col>
                                                    <Col xs="3" className=" ">
                                                        <TextField
                                                            name="RespiratoryRate"
                                                            label="Respiratory Rate : *"
                                                            placeholder=""
                                                            rules={{ required: 'Respiratory Rate harus diisi' }}
                                                            disabled={true} // Set disabled ke true
                                                            value={"20 x / Menit"} // Set value dari data
                                                        />
                                                    </Col>
                                                    <Col xs="3" className=" ">
                                                        <TextField 
                                                            name="suhu"
                                                            label="Suhu :  *"
                                                            placeholder={''}
                                                            rules={{ required: 'Tekanan Darah harus diisi' }} 
                                                            disabled= {true}
                                                            value={"36.5 °C"}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                    <Col xs="12" className="iq-card bg-primary p-3">
                                        <div>
                                            <h1>hallo</h1>
                                        </div>
                                        <Col xs="12" className="bg-light p-3 rounded">
                                              <Row>
                                                <Col xs="6">
                                                    <Col xs="12">
                                                        <TextArea  
                                                            label="Subjectif: * "
                                                            name="Subjectif"
                                                            placeholder="Masukkan Subjectif  Pasien..."
                                                            rules={{ required: 'Subjectif  Pasien harus diisi' }}
                                                            rows={5}      
                                                        />
                                                    </Col>
                                                    <Col xs="12">
                                                        <TextArea  
                                                            label="Objectif: * "
                                                            name="Objectif"
                                                            placeholder="Masukkan Objectif  Pasien..."
                                                            rules={{ required: 'Objectif  Pasien harus diisi' }}
                                                            rows={5}      
                                                        />
                                                    </Col>
                                                    <Col xs="12">
                                                        <TextArea  
                                                            label="Assesment: * "
                                                            name="Assesment"
                                                            placeholder="Masukkan Assesment  Pasien..."
                                                            rules={{ required: 'Assesment  Pasien harus diisi' }}
                                                            rows={5}      
                                                        />
                                                    </Col>
                                                    <Col xs="12">
                                                        <TextArea  
                                                            label="Planning: * "
                                                            name="planning"
                                                            placeholder="Masukkan Planning  Pasien..."
                                                            rules={{ required: 'Planning  Pasien harus diisi' }}
                                                            rows={5}      
                                                        />
                                                    </Col>
                                                    <Col xs="12">
                                                        <TextArea  
                                                            label="Instruksi: * "
                                                            name="instruksi"
                                                            placeholder="Masukkan Instruksi  Pasien..."
                                                            rules={{ required: 'Instruksi  Pasien harus diisi' }}
                                                            rows={5}      
                                                        />
                                                    </Col>
                                                            
                                                </Col>
                                                <Col xs="6">
                                                    <Col xs="12">
                                                        <TextField 
                                                            label={"ICD-9: *"}
                                                            name="icd9"
                                                            placeholder="Masukkan ICD-9 Pasien..."
                                                            rules={{ required: 'ICD-9 Pasien harus diisi' }}
                                                        />
                                                    </Col>
                                                    <Col xs="12">
                                                        <TextField 
                                                            label={"ICD-9: *"}
                                                            name="icd9"
                                                            placeholder="Masukkan ICD-9 Pasien..."
                                                            rules={{ required: 'ICD-9 Pasien harus diisi' }}
                                                        />
                                                    </Col>
                                                </Col>
                                              </Row>
                                            <button className="btn btn-primary">Simpan</button>

                                        </Col>
                                    </Col>
                                    <Col xs="12" className="iq-card p-3">
                                        <div>
                                            <h4 className="mb-0">Data Pasien *</h4>
                                        </div>
                                        <Col md="12">
                                            <Accordion defaultActiveKey={"0"}>
                                                <AccordionToggle 
                                                    eventKey="1"
                                                    title="Rizki Gunawan Adiputro Dr."
                                                    department="Departement"
                                                    onButtonClick={handleButtonClick}
                                                    variant={"primary"}    
                                                /> 
                                            </Accordion>
                                        </Col>
                                        <Col md="12">
                                            <Accordion defaultActiveKey={"0"}>
                                                <AccordionToggle 
                                                    eventKey="1"
                                                    title="Rizki Gunawan Adiputro Dr."
                                                    department="Departement"
                                                    onButtonClick={handleButtonClick}
                                                    variant={"primary"}    
                                                /> 
                                            </Accordion>
                                        </Col>
                                    </Col> */}
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
            </FormProvider>
        </div>
    )
}

export default DokterPage


