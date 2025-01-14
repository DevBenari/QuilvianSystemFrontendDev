'use client'
import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard"
import { pasienBayi } from "@/utils/dataPasien";
import React, { memo, useState} from "react"
import { Row, Col,Button, Table} from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
const DashboardPendaftaranBayi = memo(() => {
     const methods = useForm();
        const [filteredPatients, setFilteredPatients] = useState(pasienBayi);
       
    
        const handleRemovePatient = (id) => {
            const updatedPatients = filteredPatients.filter(patient => patient.id !== id);
            setFilteredPatients(updatedPatients);
        };
        
    return (
        <FormProvider {...methods}>
            <Col lg="12" className=" iq-card p-4">
                <div className="d-flex justify-content-between iq-card-header">
                    <h2 className="mb-3">Searching Pasien Bayi  </h2>
                    <button
                        className="btn btn-dark my-3 mx-3"
                        onClick={() => window.location.reload()}
                    >
                        <i className="ri-refresh-line"></i>
                    </button>
                </div>
                    <Col lg="12" className="mt-2">
                        <CustomSearchFilter
                            data={pasienBayi}
                            setFilteredPatients={setFilteredPatients}
                            onFilteredPatients={filteredPatients}
                        />
                    </Col>       
            </Col>
            <div className="mt-5">
                <Row>
                    <Col sm='12' >
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title font-widest">Tabel Registrasi Pasien</h4>
                                </div>
                                </div>
                                <div className="iq-card-body">
                                <div id="table" className="table-editable">
                                    <span className="table-add float-end mb-3 me-2">
                                    <Button size='sm' variant='' className="btn btn-sm iq-bg-success "><i
                                        className="ri-add-fill"><span className="ps-1">Add New</span></i>
                                    </Button>
                                    </span>
                                    <div className="table-responsive-md w-100">
                                        <Table className="text-center" bordered striped>
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>No Rekam Medis</th>
                                                <th>Tanggal</th>
                                                <th>Nama</th>
                                                <th>dokter</th>
                                                <th>kelas</th>
                                                <th>ruang</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {filteredPatients.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>{item.noRekamMedis}</td>
                                                        <td>{item.date}</td>
                                                        <td>{item.nama}</td>
                                                        <td>{item.dokter}</td>
                                                        <td>{item.kelas}</td>
                                                        <td>{item.ruang}</td>
                                                        <td>
                                                            <span className="table-remove"><button type="button"
                                                                className="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => handleRemovePatient(item.id)} >Remove</button></span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </Col>
                </Row>          
            </div>
        </FormProvider>
    )
})
DashboardPendaftaranBayi.displayName = "DashboardPendaftaranBayi"
export default DashboardPendaftaranBayi

