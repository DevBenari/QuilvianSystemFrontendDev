'use client';
import React, { useState } from 'react';
import ButtonNav from '@/components/ui/button-navigation';
import { dataPasienRadiologi } from '@/utils/dataPerjanjian';
import { Row, Col } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import CustomTableComponent from '@/components/features/CustomTable/custom-table';
import CustomSearchFilter from '@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard';
const TableListDaftarPegawai = () => {
    const methods = useForm();
    const [filteredPatients, setFilteredPatients] = useState(dataPasienRadiologi);
    const handleRemovePatient = (id) => {
        const updatedPatients = filteredPatients.filter((patient) => patient.id !== id);
        setFilteredPatients(updatedPatients);
    };

    const handleEditPatient = (patient) => {
        alert(`Edit Patient: ${patient.nama}`);
    };
    return (
        <FormProvider {...methods}>
            <Col lg="12" className="iq-card p-4">
                <div className="d-flex justify-content-between iq-card-header">
                    <h2 className="mb-3">Master Data <br></br> <span className='letter-spacing fw-bold'>List Daftar Pegawai</span></h2>
                    <button className="btn btn-dark my-3 mx-3" onClick={() => window.location.reload()}>
                        <i className="ri-refresh-line"></i>
                    </button>
                </div>
                <Col lg="12" className="mt-2">
                    <CustomSearchFilter
                        data={dataPasienRadiologi}
                        setFilteredPatients={setFilteredPatients}
                        onFilteredPatients={filteredPatients}

                    />
                </Col>
            </Col>
            <div className="mt-3">
                <Row>
                    <Col sm="12" className="p-3">
                        <div className="iq-card p-3">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title font-widest">Tabel Daftar Pegawai</h4>
                                </div>
                                <ButtonNav
                                    path="/MasterData/master-pegawai/add-pegawai"
                                    label="Add Pegawai"
                                    icon="ri-add-fill"
                                    size="sm"
                                    variant=""
                                    className="btn btn-sm iq-bg-success"
                                />
                            </div>
                            <div className="iq-card-body">
                                <CustomTableComponent
                                    data={filteredPatients}
                                    columns={[
                                        { key: 'id', label: 'ID' },
                                        { key: 'nomorRekamMedis', label: 'No Rekam Medis' },
                                        { key: 'date', label: 'Tanggal' },
                                        { key: 'nama', label: 'Nama' },
                                        { key: 'dokter', label: 'Dokter' },
                                        { key: 'penjamin', label: 'Penjamin' },
                                        { key: 'telepon', label: 'No Telp' },
                                    ]}
                                    slugConfig={{ textField: 'nama', idField: 'id' }}
                                    basePath="/MasterData/master-pegawai/edit-pegawai"
                                    itemsPerPage={10}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </FormProvider>
    )
}
export default TableListDaftarPegawai;