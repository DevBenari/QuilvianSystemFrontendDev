import React, { Fragment, memo, useState } from "react"
import TextField from "@/components/ui/text-field"
import TextArea from "@/components/ui/textArea-field"
import { Col,Row, Form, Accordion, Card } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import CPPTAccordionUI from "@/components/ui/cppt-accordion-ui"
const SoapDokter = memo(() => {
    const methods = useForm({
        defaultValues: {
            namaPasien: '',
        }, 
        mode: 'onSubmit'
    });

    const onSubmit = (value) => {
        console.log(value);
    }

    const [cpptRecords, setCpptRecords] = useState([
        {
          id: 1,
          timestamp: "2025-01-02 09:30",
          profession: "Perawat",
          staff: "Ns. Sarah",
          status: "pending",
          verifiedBy: null,
          verificationTime: null,
          soap: {
            subjective: "Pasien mengeluh nyeri pada area dada",
            objective: "TD: 130/80 mmHg, HR: 88x/m, RR: 20x/m, Suhu: 36.8°C",
            assessment: "Nyeri akut",
            plan: "Monitoring tanda vital, Pemberian analgesik sesuai advice dokter",
          },
        },
        {
          id: 2,
          timestamp: "2025-01-02 10:15",
          profession: "Dokter",
          staff: "dr. Andi",
          status: "verified",
          verifiedBy: "dr. Budi (KSM)",
          verificationTime: "2025-01-02 11:00",
          soap: {
            subjective: "Pasien masih merasakan nyeri dada",
            objective: "EKG: Sinus Rhythm, TD: 128/78 mmHg",
            assessment: "Suspect Angina Pectoris",
            plan: "Rujuk ke Poli Jantung, Pemberian NTG sublingual",
          },
        },
      ]);
    
      const handleVerification = (id) => {
        setCpptRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.id === id
              ? {
                  ...record,
                  status: "verified",
                  verifiedBy: "dr. Budi (KSM)",
                  verificationTime: new Date().toLocaleString("id-ID"),
                }
              : record
          )
        );
      };
    

    return (
        <FormProvider {...methods}>
            <Col xs="12" className="mt-5">
                <Card className="shadow-sm mt-3">
                    <Card.Body>
                        <Card.Title className="d-flex justify-content-between align-items-center">
                            <p>SOAP Notes - Catatan Perkembangan </p>
                            <div>
                                <p>{new Date().toLocaleString()}</p>
                            </div>
                        </Card.Title>   
                            <Row>
                                <Col xs="4">
                                    <TextField 
                                        name="namaPasien"
                                        label="Nama Pasien :  * "
                                        placeholder={''}
                                        rules={{ required: 'Nama Pasien harus diisi' }} 
                                        disabled={true}
                                        value={"Dionysius"}
                                    />
                                </Col>
                                <Col xs="4">
                                    <TextField 
                                        name="noRm"
                                        label="No. Rm :  * "
                                        placeholder={''}
                                        rules={{ required: 'No. Rm harus diisi' }} 
                                        disabled={true}
                                        value={"08-03-12032024"}
                                    />
                                </Col>
                                <Col xs="4">
                                    <TextField 
                                        name="ruangan"
                                        label="Ruangan :  * "
                                        placeholder={''}
                                        rules={{ required: 'Ruangan harus diisi' }} 
                                        disabled={true}
                                        value={"Rawat Inap"}
                                    />
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>
                <Card className="mt-3 shadow-sm">
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Card.Body>
                            <Col xs="12">
                                <TextArea  
                                    label="Subjectif : * "
                                    name="Subjectif"
                                    placeholder="Keluhan untuk Pasien..."
                                    rules={{ required: 'Subjectif  Pasien harus diisi' }}
                                    rows={5}      
                                />
                            </Col>
                            <Col xs="12"> 
                                <p className="text-bold text-black">Objectif : *</p>
                                    <Col xs="12">
                                        <Row className="g-2">
                                            <Col md="3">
                                                <TextField 
                                                    name="tekananDarah"
                                                    label=""
                                                    placeholder={'TD(mmHg)'}
                                                    rules={{ required: 'Tekanan Darah harus diisi' }} 

                                                />
                                            </Col>
                                            <Col md="3">
                                                <TextField 
                                                    name="beratBadan"
                                                    label=""
                                                    placeholder={'TB(Kg)'}
                                                    rules={{ required: 'Tekanan Darah harus diisi' }} 
                                                />
                                            </Col>
                                            <Col md="3">
                                                <TextField 
                                                    name="tinggiBadan"
                                                    label=""
                                                    placeholder={'TB(cm)'}
                                                    rules={{ required: 'tinggi Badan harus diisi' }} 
                                                />
                                            </Col>
                                            <Col md="3">
                                                <TextField 
                                                    name="heartRate"
                                                    label=""
                                                    placeholder={'HR(bpm)'}
                                                    rules={{ required: 'Tekanan Darah harus diisi' }} 
                                                />
                                            </Col>
                                            <Col md="3">
                                                <TextField
                                                    name="RespiratoryRate"
                                                    label=""
                                                    placeholder={"RR(bpm)"}
                                                    rules={{ required: 'Respiratory Rate harus diisi' }}
                                                />
                                            </Col>
                                            <Col md="3">
                                                <TextField 
                                                    name="suhu"
                                                    label=""
                                                    placeholder={'suhu °C'}
                                                    rules={{ required: 'Tekanan Darah harus diisi' }} 
                                                />
                                            </Col>
                                            <Col md="12">
                                                <TextArea  
                                                    label=""
                                                    name="pemeriksaanlainnya"
                                                    placeholder="Pemeriksaan dan Keluhan Pasien..."
                                                    rules={{ required: 'Keluhan Pasien harus diisi' }}
                                                    rows={5}      
                                                />
                                            </Col>
                                    </Row>
                                </Col>
                            </Col>
                            <Col xs="12" className="mt-3">
                                <p className="text-bold text-black">Assesment : *</p>
                                <TextField 
                                    name="icd-10"
                                    label=""
                                    placeholder={'Diagnosis ICD-10'}
                                    rules={{ required: 'Diagnosis ICD-10 harus diisi' }}
                                />
                                <TextArea  
                                    label=""
                                    name="assesment"
                                    placeholder="Analisis dan diagnosis..."
                                    rules={{ required: 'Analisis dan diagnosis harus diisi' }}
                                    rows={5}      
                                />
                            </Col>
                            <Col xs="12" className="mt-3">
                                <p className="text-bold text-black">Planning : *</p>
                                    <TextArea  
                                        label=""
                                        name="planning"
                                        placeholder="Rencana tindakan medis, pemeriksaan penunjang..."
                                        rules={{ required: 'Planning harus diisi' }}
                                        rows={5}      
                                    />
                            </Col>
                            <div className="d-flex justify-content-end mt-3 gap-2">
                                <button type="reset" className="btn btn-secondary"> <span className="ri-save-line"> </span>Simpan Draft</button>
                                <button className="btn btn-dark" type="submit"><span className="ri-send-plane-fill"></span> Simpan & Verifikasi</button>
                            </div>
                        </Card.Body>
                    </Form>
                </Card>
                <Card className="mt-3 shadow-sm">
                    <Card.Body> 
                        <Card.Title className="d-flex justify-content-between align-items-center">
                            <h5 className="text-bold text-black">Riwayat SOAP Pasien</h5>
                        </Card.Title>
                        <Col xs="12">
                            <CPPTAccordionUI records={cpptRecords} onVerify={handleVerification} />
                        </Col>
                    </Card.Body>
                </Card>
            </Col>
        </FormProvider>
    )
}) 
SoapDokter.displayName = "SoapDokter"
export default SoapDokter;