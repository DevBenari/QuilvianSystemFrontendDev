'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPasienSlice } from '@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice';
import CustomSearchFilter from '@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard';
import ButtonNav from '@/components/ui/button-navigation';
import { Row, Col } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import CustomTableComponent from '@/components/features/CustomTable/custom-table';

const ListPasienBaruPage = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState([]);
  
  // Ambil data dari Redux store
  const { data: pasienData, loading, error } = useSelector((state) => state.pasien);

  useEffect(() => {
    dispatch(GetPasienSlice());
  }, [dispatch]);

  // Tampilkan loading jika data sedang dimuat
  if (loading) {
    return <div>Loading data pasien...</div>;
  }

  // Tampilkan pesan error jika ada kesalahan
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <FormProvider {...methods}>
        <Col lg="12" className="iq-card p-4">
          <div className="d-flex justify-content-between iq-card-header">
            <h2 className="mb-3">Table List Pasien Baru</h2>
            <button className="btn btn-dark my-3 mx-3" onClick={() => window.location.reload()}>
              <i className="ri-refresh-line"></i>
            </button>
          </div>
          <Col lg="12" className="mt-2">
            <CustomSearchFilter
              data={pasienData}
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
                    <h4 className="card-title font-widest">Tabel Daftar Pasien Baru</h4>
                  </div>
                  <ButtonNav
                    path="/pendaftaran/pendaftaran-pasien-baru/add-pasien-baru"
                    label="Tambah Pasien"
                    icon="ri-add-fill"
                    size="sm"
                    variant=""
                    className="btn btn-sm iq-bg-success"
                  />
                </div>
                  <div className="iq-card-body">
                    <CustomTableComponent
                      data={filteredPatients.length > 0 ? filteredPatients : pasienData}
                      columns={[
                          { key: 'kodePasien', label: 'kodePasien' },
                          { key: 'noRekamMedis', label: 'No Rekam Medis' },
                          // { key: 'date', label: 'Tanggal' },
                          { key: 'namaLengkap', label: 'Nama Pasien' },
                          { key: 'jenisKelamin', label: 'Jenis Kelamin' },
                          { key: 'tempatLahir', label: 'Tempat Lahir' },
                      ]}
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

export default ListPasienBaruPage;
