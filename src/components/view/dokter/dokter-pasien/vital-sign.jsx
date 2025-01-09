import React, {memo } from "react"
import { Col,  Row,  Table, Form,} from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import TextField from "@/components/ui/text-field"
import TimeField from "@/components/ui/time-input"
import DateInput from "@/components/ui/date-input"
const VitalSign = memo(() => {
    const methods = useForm({
        defaultValues: {
            tanggalPengkajian: '',
        },
        onSubmit: 'onSubmit'
    });

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <FormProvider {...methods}>
            <div>
                <Col xs="12" className="iq-card">
                    <div className="card-body">
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
                                    <td>22-12-2024</td>
                                    <td>08-00-7563</td>
                                    <td>Umum</td>
                                    <td>Dr. Abdul</td>                                           
                                </tr>
                                <tr>
                                    <td>22-12-2024</td>
                                    <td>08-00-7563</td>
                                    <td>Umum</td>
                                    <td>Dr. Abdul</td>                                           
                                </tr>
                                <tr >
                                    <td>22-12-2024</td>
                                    <td>08-00-7563</td>
                                    <td>Umum</td>
                                    <td>Dr. Abdul</td>                                           
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    </div>
               </Col>
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Col xs="12" className="iq-card">
                        <div className="iq-card-header">
                        <h4>Tanggal Pemeriksaan Medis *</h4>
                        <Col xs="12" className="mb-3">
                            <Row>
                                <Col md="6">
                                    <div className="mt-3">
                                        <DateInput
                                            name="tanggalPengkajian"
                                            label=""
                                            placeholder={'Enter Tanggal Pengkajian Pemeriksaan Medis'}
                                            rules={{ required: 'Tanggal Pengkajian Pemeriksaan Medis harus diisi' }} // Aturan validasi
                                        />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mt-3">
                                       <TimeField 
                                            name="waktuPengkajian"
                                            label=""
                                            placeholder={'Enter Waktu Penkajian'}
                                            rules={{ required: 'Waktu Penkajian harus diisi' }} // Aturan validasi   
                                        />
                                    </div>
                                </Col>
                           </Row>
                        </Col>
                        </div>
                    </Col>
                    <Col xs="12" className="iq-card-header">
                        <div>
                            <h4 className="mb-3">Vital Sign *</h4>
                            <Col Col md="7">
                                <Row>
                                    <Col xs="5" className="mb-3">
                                        <TextField 
                                            name="tekananDarah"
                                            label="TD :  *   "
                                            placeholder={'Enter TD'}
                                            rules={{ required: 'Tekanan Darah harus diisi' }} // Aturan validasi
                                        />
                                    </Col>
                                    <Col xs="auto" className="d-flex align-items-center">
                                        <span>/</span>
                                    </Col>
                                    <Col xs="3" >
                                        <TextField 
                                            name="tekananDarahBawah"
                                            className="textField"
                                            label=""
                                            rules={{ required: 'Tekanan Darah harus diisi' }} // Aturan validasi
                                        />
                                    </Col>
                                    <Col xs="auto" className="d-flex align-items-center">
                                        <span>mmHg</span>
                                    </Col>
                               </Row>
                            </Col>
                            <Col xs="6">
                                <TextField 
                                    name="Hr"
                                    label="HR :  *"
                                    placeholder={'Enter HR'}
                                    rules={{ required: 'HR harus diisi' }} 
                                />
                            </Col>
                            <Col xs="6">
                                <TextField 
                                    name="tinggiBadan"
                                    label="TB :  *"
                                    placeholder={'Enter TB'}
                                    rules={{ required: 'TB harus diisi' }} 
                                />
                            </Col>
                            <Col xs="6">
                                <TextField 
                                    name="BeratBadan"
                                    label="BB :  *"
                                    placeholder={'Enter BB'}
                                    rules={{ required: 'BB harus diisi' }} 
                                />
                            </Col>
                            <Col xs="6">
                                <TextField 
                                    name="rr"
                                    label="RR :  *"
                                    placeholder={'Enter RR'}
                                    rules={{ required: 'RR harus diisi' }} 
                                />
                            </Col>
                            <Col xs="6">
                                <TextField 
                                    name="suhu"
                                    label="suhu *C :  *"
                                    placeholder={'Enter suhu C'}
                                    rules={{ required: 'suhu *C harus diisi' }} 
                                />
                            </Col>
                        </div>
                    </Col>
                    <Col xs="12" className="iq-card-header">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Col>
                </Form>
                <Col xs="12" className="iq-card-header">
                    <div className="mt-4">
                    <h4 className="mb-3">Grafik Pemeriksaan Vital Sign *</h4>
                    <Col xs="6">
                        <TextField 
                            name="suhu"
                            label="suhu *C :  *"
                            placeholder={'Enter suhu C'}
                            rules={{ required: 'suhu *C harus diisi' }} 
                        />
                    </Col>
                    <Col xs="6">
                        <TextField 
                            name="suhu"
                            label="suhu *C :  *"
                            placeholder={'Enter suhu C'}
                            rules={{ required: 'suhu *C harus diisi' }} 
                        />
                    </Col>
                </div>
                </Col>
            </div>
        </FormProvider>
    )
})
VitalSign.displayName = "VitalSign"
export default VitalSign