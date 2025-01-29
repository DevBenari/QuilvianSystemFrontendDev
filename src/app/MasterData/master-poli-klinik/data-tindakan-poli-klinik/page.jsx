"use client";
import React, { useState } from "react";

import ButtonNav from "@/components/ui/button-navigation";

import { Button, Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { tarifPoliKlinik } from "@/utils/masterData";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import TableEditSave from "@/components/features/custom-table/edit-table/table-edit-save-cancel";
import { components } from "react-select";
import SelectField from "@/components/ui/select-field";
import { useRouter, useSearchParams } from "next/navigation";

const TableListDaftarPoliKlinik = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(tarifPoliKlinik);
  const router = useRouter();

  const columnTindakanPoliKlinik = [
    {
      headerName: "Kode",
      field: "kode",
      isEditable: false, // Kolom ini tidak dapat diedit
    },
    {
      headerName: "Nama Tindakan",
      field: "namaTindakan",
      isEditable: true,
      component: SelectField, // Menggunakan SelectField
      options: [
        { value: "Anasteologi", label: "Anasteologi" },
        { value: "Obstetri", label: "Obstetri" },
        { value: "Penyakit Dalam", label: "Penyakit Dalam" },
      ], // O
      colSize: 12,
      placeholder: "....",
    },
    {
      headerName: "Nama Poliklinik",
      field: "namaPoliKlinik",
      isEditable: true,
      component: SelectField, // Menggunakan SelectField
      options: [
        { value: "Anasteologi", label: "Anasteologi" },
        { value: "Obstetri", label: "Obstetri" },
        { value: "Penyakit Dalam", label: "Penyakit Dalam" },
      ],
      placeholder: "...",
      colSize: 12,
    },
    {
      headerName: "Dokter",
      field: "dokter",
      isEditable: true, // Kolom ini dapat diedit
    },
    {
      headerName: "Rumah Sakit",
      field: "rumahSakit",
      isEditable: true, // Kolom ini dapat diedit
    },
    {
      headerName: "JP",
      field: "jp",
      isEditable: true, // Kolom ini dapat diedit
    },
    {
      headerName: "BAHP",
      field: "bahp",
      isEditable: true, // Kolom ini dapat diedit
    },
    {
      headerName: "Lain-Lain",
      field: "lainLain",
      isEditable: true, // Kolom ini dapat diedit
    },
    {
      headerName: "Total",
      field: "total",
      isEditable: false, // Kolom ini dihitung otomatis, tidak dapat diedit
    },
  ];

  const [allTableData, setAllTableData] = useState({
    groupTarif: tarifPoliKlinik,
  });

  const handleTableChange = (tableId, updatedData) => {
    setAllTableData((prev) => ({
      ...prev,
      [tableId]: updatedData,
    }));
  };

  const handleTarifById = (id) => {
    router.push(
      `/MasterData/master-poli-klinik/data-tindakan-poli-klinik/tarif-tindakan-poliklinik?id=${id}`
    );
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">
              List Daftar Tindakan Poli Klinik
            </span>
          </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={tarifPoliKlinik}
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
                  <h4 className="card-title font-widest">
                    Tabel Daftar Tindakan Poli Klinik
                  </h4>
                </div>
                {/* <ButtonNav
                  path="/MasterData/master-administrasi/administrasi-rawat-inap/add-rawat-inap"
                  label="Add Tindakan Poli Klinik"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                /> */}
              </div>
              <div className="iq-card-body">
                <TableEditSave
                  id="groupTarif"
                  columns={columnTindakanPoliKlinik}
                  defaultData={filteredPatients}
                  onChange={handleTableChange}
                  itemsPerPage={5}
                  actionButtons={[
                    {
                      label: "Tarif",
                      variant: "info",
                      onClick: (row) => handleTarifById(row.id),
                    },
                    {
                      label: "Remove",
                      variant: "danger",
                      onClick: (row) => handleRemovePatient(row.id),
                    },
                  ]}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};
export default TableListDaftarPoliKlinik;
