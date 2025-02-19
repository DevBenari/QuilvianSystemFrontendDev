"use client";

import { Row, Col, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTindakanOperasi } from "@/lib/hooks/masterData/manajemen-operasi/tindakan-operasi";
import CustomTableComponent from "@/components/features/edit-table/custom-table/custom-table-edit-remove";
// import CustomTableComponent from "@/components/features/CustomTable/custom-table";

const TableTindakanOperasi = () => {
  const methods = useForm();
  const { tindakanOperasi, loading, error } = useTindakanOperasi();
  const [filteredTindakanOperasi, setFilteredTindakanOperasi] = useState([]);
  const router = useRouter();

  // Fetch data and set filtered data
  useEffect(() => {
    if (tindakanOperasi) {
      setFilteredTindakanOperasi(tindakanOperasi);
    }
  }, [tindakanOperasi]);

  const handleEdit = (id) => {
    router.push(
      `/MasterData/master-operasi/daftar-tindakan-operasi/edit-add-tindakan-operasi?id=${id}`
    );
  };

  const handleEditHarga = (id) => {
    router.push(
      `/MasterData/master-operasi/daftar-tindakan-operasi/edit-harga-tindakan-operasi?id=${id}`
    );
  };

  const handleTambah = () => {
    router.push(
      `/MasterData/master-operasi/daftar-tindakan-operasi/edit-add-tindakan-operasi`
    );
  };

  const handleRemovePatient = (id) => {
    const updatedData = filteredTindakanOperasi.filter(
      (item) => item.id !== id
    );
    setFilteredTindakanOperasi(updatedData);
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={tindakanOperasi}
            setFilteredPatients={setFilteredTindakanOperasi}
            onFilteredPatients={filteredTindakanOperasi}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title font-widest">Tabel Operasi</h4>
                </div>
                <Button
                  onClick={handleTambah}
                  className="btn btn-sm iq-bg-success"
                >
                  Tambah Tindakan Operasi
                </Button>
              </div>
              <div className="iq-card-body">
                {loading && <div>Loading...</div>}
                {error && <div className="text-danger">{error}</div>}
                {!loading && !error && (
                  <CustomTableComponent
                    data={filteredTindakanOperasi}
                    columns={[
                      { key: "id", label: "NO" },
                      { key: "namaTindakanOperasi", label: "Tindakan Operasi" },
                      { key: "tipeOperasi", label: "Jenis Operasi" },
                    ]}
                    itemsPerPage={10}
                    onRemove={handleRemovePatient}
                    onEdit={handleEdit}
                    labelEdit="Edit"
                    onCustom={handleEditHarga}
                    labelCustom="Edit Harga"
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableTindakanOperasi;
