'use client'
import DateInput from "@/components/ui/date-input"
import TextField from "@/components/ui/text-field"

import axios from "axios"
import Link from "next/link"
import React, { memo, useState} from "react"
import { Row, Col,Button, Table } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
const DashboardPendaftaran = memo(() => {
    const methods = useForm();
    // const [isFilteredPasien, setIsFilteredPasien] = useState([])
    // const [isLoading, setIsLoading] = useState(false)

    // const handleInputChange = async (e) => {
    //     const query = e.target.valuel; 

    //     if(query.trim() === "") {
    //         setIsFilteredPasien([])
    //         return;
    //     }
    //     setIsLoading(true) 
    //     try{
    //         const response = await axios.get(`/api/patients?search=${query}`)
    //         setIsFilteredPasien(response.data);
    //     }catch(error){
    //         console.log(error)
    //     }finally{
    //         setIsLoading(false)
    //     }

    // }

    return (
        <FormProvider {...methods}>
            <Col lg="12" className="mt-5">
                <Row>
                    <Col xs="6" lg="3">
                        <TextField 
                            label="No Rekam Medis :"
                            name="nomerRekamMedis"
                            type="text"
                            placeholder="Enter your No Rekam Medis..."
                            className="form-control mb-0"
                            rules={{
                                required: 'No Rekam Medis is required',
                            }}
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </Col>
                    <Col xs="6" lg="3">
                        <TextField 
                            label="Nama :"
                            name="namaPasien"
                            type="text"
                            placeholder="Enter your Nama Pasien..."
                            className="form-control mb-0"
                            rules={{
                                required: 'Nama Pasien is required',
                            }}
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </Col>
                    <Col xs="6" lg="3">
                        <TextField 
                            label="No Telp :"
                            name="nomerRekamMedis"
                            type="text"
                            placeholder="Enter your No Rekam Medis..."
                            className="form-control mb-0"
                            rules={{
                                required: 'No Rekam Medis is required',
                            }}
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </Col>
                    <Col xs="6" lg="3">
                        <DateInput
                            name="tanggalLahir"
                            label="Tanggal Lahir"
                            placeholder={'Enter Tanggal Lahir'}
                            rules={{ required: 'Tanggal lahir harus diisi' }} // Aturan validasi
                        />
                    </Col>
                </Row>
            </Col>
            <div className="mt-5">
                <Row>
                    <Col sm='12' >
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Editable Table</h4>
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
                                                <th>Name</th>
                                                <th>Age</th>
                                                <th>Company Name</th>
                                                <th>Country</th>
                                                <th>City</th>
                                                <th>Sort</th>
                                                <th>Remove</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td contenteditable="true">Gio Metric</td>
                                                <td contenteditable="true">25</td>
                                                <td contenteditable="true">Deepends</td>
                                                <td contenteditable="true">Spain</td>
                                                <td contenteditable="true">Madrid</td>
                                                <td>
                                                    <span className="table-up me-1"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-up" aria-hidden="true"></i></Link></span>
                                                    <span className="table-down"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-down" aria-hidden="true"></i></Link></span>
                                                </td>
                                                <td>
                                                    <span className="table-remove"><button type="button"
                                                        className="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td contenteditable="true">Manny Petty</td>
                                                <td contenteditable="true">45</td>
                                                <td contenteditable="true">Insectus</td>
                                                <td contenteditable="true">France</td>
                                                <td contenteditable="true">San Francisco</td>
                                                <td>
                                                    <span className="table-up me-1"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-up" aria-hidden="true"></i></Link></span>
                                                    <span className="table-down"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-down" aria-hidden="true"></i></Link></span>
                                                </td>
                                                <td>
                                                    <span className="table-remove"><button type="button"
                                                        className="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td contenteditable="true">Lucy Tania</td>
                                                <td contenteditable="true">26</td>
                                                <td contenteditable="true">Isotronic</td>
                                                <td contenteditable="true">Germany</td>
                                                <td contenteditable="true">Frankfurt am Main</td>
                                                <td>
                                                    <span className="table-up me-1"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-up" aria-hidden="true"></i></Link></span>
                                                    <span className="table-down"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-down" aria-hidden="true"></i></Link></span>
                                                </td>
                                                <td>
                                                    <span className="table-remove"><button type="button"
                                                        className="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                </td>
                                            </tr>
                                            <tr className="hide">
                                                <td contenteditable="true">Anna Mull</td>
                                                <td contenteditable="true">35</td>
                                                <td contenteditable="true">Portica</td>
                                                <td contenteditable="true">USA</td>
                                                <td contenteditable="true">Oregon</td>
                                                <td>
                                                    <span className="table-up me-1"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-up" aria-hidden="true"></i></Link></span>
                                                    <span className="table-down"><Link href={"/"} className="indigo-text"><i className="fa fa-long-arrow-down" aria-hidden="true"></i></Link></span>
                                                </td>
                                                <td>
                                                    <span className="table-remove"><button type="button"
                                                        className="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                </td>
                                            </tr>
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
DashboardPendaftaran.displayName = "DashboardPendaftaran"
export default DashboardPendaftaran