'use client'
import DateInput from "@/components/ui/date-input"
import SelectField from "@/components/ui/select-field"
import TextField from "@/components/ui/text-field"
import { dataPasien } from "@/utils/config"
import { range } from "@amcharts/amcharts5/.internal/core/util/Animation"

import axios from "axios"
import Link from "next/link"
import React, { memo, useState} from "react"
import { Row, Col,Button, Table, Form } from "react-bootstrap"
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
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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

    const handleFilterDate = () => {
        if (!startDate || !endDate) {
            alert("Harap pilih rentang tanggal!");
            return;
        }

        const filtered = dataPasien.filter(pasien => {
            const pasienDate = new Date(pasien.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            // Hanya bandingkan tanggal tanpa waktu (set waktu menjadi pukul 00:00:00)
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        
            return pasienDate >= start && pasienDate <= end;
        });
        
        console.log(filtered)
        setFilteredPatients(filtered);
    };

     // Fungsi untuk menangani perubahan pada pilihan filter
  const handleFilterTime = (filterType) => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    switch (filterType) {
      case "Today":
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case "Last Day":
        start.setDate(now.getDate() - 1);
        end = start;
        break;
      case "Last Week":
        start.setDate(now.getDate() - 7);
        end = now;
        break;
      case "This Month":
        start.setDate(1);
        end.setMonth(now.getMonth() + 1);
        end.setDate(0); // Set to the last date of this month
        break;
      case "Last Month":
        start.setMonth(now.getMonth() - 1);
        start.setDate(1);
        end.setMonth(now.getMonth());
        end.setDate(0);
        break;
      default:
        return;
    }

    // Filter data pasien berdasarkan tanggal
    const filtered = dataPasien.filter(pasien => {
      const pasienDate = new Date(pasien.date);
      return pasienDate >= start && pasienDate <= end;
    });

    // Update state dengan data yang sudah difilter
    setFilteredPatients(filtered);
  };
    
  
    return (
        <FormProvider {...methods}>
            <Col lg="12" className=" iq-card p-4">
                <div className="d-flex justify-content-between iq-card-header">
                    <h2 className="mb-3">Searching Pasien  </h2>
                    <button
                        className="btn btn-dark my-3 mx-3"
                        onClick={() => window.location.reload()}
                    >
                        <i className="ri-refresh-line"></i>
                    </button>
                </div>
                    <Col lg="12" className="mt-2">
                    <Row>
                        <Col xs="3">
                            <TextField 
                                label="Cari Regist Pasien :"
                                name="noRekamMedis"
                                type="text"
                                placeholder="Enter your No Rekam Medis..."
                                className="form-control mb-0"
                                onChange={(e) => handleFilterChange("noRekamMedis", e.target.value)}
                            />
                        </Col>
                        <Col xs="2">
                        <SelectField
                            name="ByTime"
                            label="Filter By : *"
                            options={[
                                { value:"Today", label:"Today"},
                                { value: 'last day', label: 'last day' },
                                { value: 'Last Week', label: 'Last Week' },
                                { value: 'This Month', label: 'This Month' },
                                { value: 'Last Month', label: 'Last Month' },
                            ]}
                            onChangeCallback={handleFilterTime}
                        />
                        </Col>
                        <Col xs="3">
                            <DateInput 
                                name="startDate"
                                label=" tanggal Awal regist Pasien : "
                                placeholder={'Enter tanggal regist Pasien'}
                                // options={{ 
                                //     MaxDate: startDate,
                                //         allowInput: false,
                                // }}
                                onChange={([date]) => setStartDate(date)}
                            />
                        </Col>
                        <Col xs="3">
                            <DateInput 
                                name="endDate"
                                label=" tanggal Akhir regist Pasien : "
                                placeholder={'Enter tanggal regist Pasien'}
                                // options={{ 
                                // MaxDate: endDate,
                                //     allowInput: false,
                                // }}
                                onChange={([date]) => setEndDate(date)}
                            />
                        </Col>
                        <Col xs="1" className="mt-2">

                                    <button 
                                        onClick={handleFilterDate} 
                                        className="btn btn-info mt-4 "
                                    >
                                        <i className="ri-search-line"></i>
                                    </button>
                              
                        </Col>

                        
                    </Row>
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
                                                        <td>{item.date}</td>
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