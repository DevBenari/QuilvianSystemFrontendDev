'use client';
import React, { useState } from 'react';
import CustomSearchFilter from '@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard';
import ButtonNav from '@/components/ui/button-navigation';
import { dataODC } from '@/utils/dataPerjanjian';
import { Row, Col } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import CustomTableComponent from '@/components/features/CustomTable/custom-table';
const DashboardPerjanjianOdc = () => {
    const methods = useForm();
    const [filteredPatients, setFilteredPatients] = useState(dataODC);
    const handleRemovePatient = (id) => {
        const updatedPatients = filteredPatients.filter((patient) => patient.id !== id);
        setFilteredPatients(updatedPatients);
    };
    return (
        <FormProvider {...methods}>
            <Col lg="12" className="iq-card p-4">
                <div className="d-flex justify-content-between iq-card-header">
                    <h2 className="mb-3">Searching Perjanjian ODC</h2>
                    <button className="btn btn-dark my-3 mx-3" onClick={() => window.location.reload()}>
                        <i className="ri-refresh-line"></i>
                    </button>
                </div>
                <Col lg="12" className="mt-2">
                    <CustomSearchFilter
                        data={dataODC}
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
                                    <h4 className="card-title font-widest">Tabel Perjanjian Pasien</h4>
                                </div>
                                <ButtonNav
                                    path="/perjanjian/add-perjanjian"
                                    label="Buat Janji"
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
                                        { key: 'nama', label: 'Nama Pasien' },
                                        { key: 'alamat', label: 'Alamat' },
                                        { key: 'departemen', label: 'Poli' },
                                        { key: 'dokter', label: 'Dokter' },
                                        { key: 'penjamin', label: 'Penjamin' },
                                    ]}
                                    itemsPerPage={10}
                                    onRemove={handleRemovePatient}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </FormProvider>
    )
}

export default DashboardPerjanjianOdc;