"use client";

import CustomSearchText from "@/components/features/CustomSearchText/custom-search-text";
import EditableTable from "@/components/features/edit-table/edit-table";
import {
  DataAnestesi,
  DataAsistenAnestesi,
  DataAsistenDokter,
  DataDokter,
  dataPemakaianAlat,
  dataResultasi,
  dataruangOperasi,
} from "@/utils/dataOperasi";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const EditHargaById = () => {
  const methods = useForm();

  // Data dan konfigurasi tabel
  const tables = [
    {
      id: "dokter_operator",
      title: "Dokter Operator",
      columns: [
        { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
        { headerName: "Dokter", field: "dokter", isEditable: true },
        { headerName: "RS", field: "rs", isEditable: true },
        { headerName: "JP", field: "JP", isEditable: true },
        { headerName: "BPJS", field: "bpjs", isEditable: true },
        { headerName: "Other", field: "other", isEditable: true },
        { headerName: "Total", field: "total", isEditable: false },
      ],
      data: DataDokter,
    },
    {
      id: "assisten_dokter_operator",
      title: "Assisten Dokter Operator",
      columns: [
        { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
        { headerName: "Dokter", field: "dokter", isEditable: true },
        { headerName: "RS", field: "rs", isEditable: true },
        { headerName: "Total", field: "total", isEditable: false },
      ],
      data: DataAsistenDokter,
    },
    {
      id: "anestesi_operator",
      title: "Anestesi Operator",
      columns: [
        { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
        { headerName: "Dokter", field: "dokter", isEditable: true },
        { headerName: "RS", field: "rs", isEditable: true },
        { headerName: "Total", field: "total", isEditable: false },
      ],
      data: DataAnestesi,
    },
    {
      id: "assisten_anestesi_operator",
      title: "Assisten Anestesi Operator",
      columns: [
        { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
        { headerName: "Dokter", field: "dokter", isEditable: true },
        { headerName: "RS", field: "rs", isEditable: true },
        { headerName: "Total", field: "total", isEditable: false },
      ],
      data: DataAsistenAnestesi,
    },
    {
      id: "pemakaian_alat",
      title: "Pemakaian Alat",
      columns: [
        { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
        { headerName: "Dokter", field: "dokter", isEditable: true },
        { headerName: "RS", field: "rs", isEditable: true },
        { headerName: "Total", field: "total", isEditable: false },
      ],
      data: dataPemakaianAlat,
    },
    {
      id: "ruang_operasi",
      title: "Ruang Operasi",
      columns: [
        { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
        { headerName: "Kamar", field: "kamar", isEditable: true },
        { headerName: "Total", field: "total", isEditable: false },
      ],
      data: dataruangOperasi,
    },
  ];

  const [allTableData, setAllTableData] = useState(
    tables.reduce((acc, table) => {
      acc[table.id] = table.data;
      return acc;
    }, {})
  );

  const handleTableChange = (tableId, updatedData) => {
    setAllTableData((prev) => ({
      ...prev,
      [tableId]: updatedData,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", allTableData);
  };

  return (
    <FormProvider {...methods}>
      <div className="container mt-5">
        {tables.map((table) => (
          <Col lg="12" className="iq-card header p-3" key={table.id}>
            <div className="d-flex justify-content-between iq-card-header">
              <h2 className="mx-3">{table.title}</h2>
            </div>
            <CustomSearchText
              data={table.data}
              labelText="Cari Kelas"
              placeholderText="Cari Kelas"
              setFilteredPatients={(filteredData) =>
                setAllTableData((prev) => ({
                  ...prev,
                  [table.id]: filteredData,
                }))
              }
              onFilteredPatients={allTableData[table.id]}
            />
            <EditableTable
              id={table.id}
              columns={table.columns}
              defaultData={allTableData[table.id]}
              onChange={handleTableChange}
              itemsPerPage={5}
            />
          </Col>
        ))}
        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Submit Semua Data
        </button>
      </div>
    </FormProvider>
  );
};

export default EditHargaById;
