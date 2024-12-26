'use client'
import DateInput from "@/components/ui/date-input"
import TextField from "@/components/ui/text-field"
import { dataPasien } from "@/utils/config"

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

    const [filters, setFilters] = useState({
        noRekamMedis: "",
        nama: "",
        noTelp: "",
    });
    const [filteredPatients, setFilteredPatients] = useState(dataPasien);

    // Fungsi untuk mengupdate filter
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    // Fungsi untuk memfilter data pasien
    const applyFilters = (filters) => {
        const filtered = dataPasien.filter((patient) => {
            const matchNoRekamMedis = filters.noRekamMedis
                ? patient.noRekamMedis?.toLowerCase().includes(filters.noRekamMedis.toLowerCase())
                : true;
            const matchNama = filters.nama
                ? patient.nama?.toLowerCase().includes(filters.nama.toLowerCase())
                : true;
            const matchNoTelp = filters.noTelp
                ? patient.noTelp?.toLowerCase().includes(filters.noTelp.toLowerCase())
                : true;
    
            return matchNoRekamMedis && matchNama && matchNoTelp;
        });
        setFilteredPatients(filtered);
    };
    


    return (
        <FormProvider {...methods}>
            <Col lg="12" className="mt-5">
                <Row>
                    <Col xs="6" lg="3">
                        <TextField 
                            label="No Rekam Medis :"
                            name="noRekamMedis"
                            type="text"
                            placeholder="Enter your No Rekam Medis..."
                            className="form-control mb-0"
                            rules={{
                                required: 'No Rekam Medis is required',
                            }}
                            onChange={(e) => handleFilterChange("noRekamMedis", e.target.value)}
                        />
                    </Col>
                    <Col xs="6" lg="3">
                        <TextField 
                            label="Nama :"
                            name="nama"
                            type="text"
                            placeholder="Enter your Nama Pasien..."
                            className="form-control mb-0"
                            rules={{
                                required: 'Nama Pasien is required',
                            }}
                            onChange={(e) => handleFilterChange("nama", e.target.value)}
                        />
                    </Col>
                    <Col xs="6" lg="3">
                        <TextField 
                            label="No Telp :"
                            name="noTelp"
                            type="text"
                            placeholder="Enter your No Rekam Medis..."
                            className="form-control mb-0"
                            rules={{
                                required: 'No Rekam Medis is required',
                            }}
                            onChange={(e) => handleFilterChange("noTelp", e.target.value)}
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
                                                <th>Nama</th>
                                                <th>Jenis Kelamin</th>
                                                <th>Tanggal Lahir</th>
                                                <th>Umur</th>
                                                <th>No Telp</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {filteredPatients.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>{item.noRekamMedis}</td>
                                                        <td>{item.nama}</td>
                                                        <td>{item.jenisKelamin}</td>
                                                        <td>{item.tglLahir}</td>
                                                        <td>{item.umur}</td>
                                                        <td>{item.noTelp}</td>
                                                        <td>
                                                            <span className="table-remove"><button type="button"
                                                                className="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* <td>
                                                    <span className="table-remove"><button type="button"
                                                        className="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                </td> */}
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