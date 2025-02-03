"use client";

import CustomSearchText from "@/components/features/custom-search/CustomSearchText/custom-search-text";
import EditableTable from "@/components/features/custom-table/edit-table/edit-table";
import DynamicFormTable from "@/components/features/dynamic-form/dynamicFormTable/dynamicFormTable";

import { getbyidTindakanOperasi } from "@/lib/hooks/masterData/manajemen-operasi/tindakan-operasi/getById";

import {
  DataAnestesi,
  DataAsistenAnestesi,
  DataAsistenDokter,
  DataDokter,
  dataPemakaianAlat,
  dataResultasi,
  dataruangOperasi,
} from "@/utils/dataOperasi";
import { kategoriOperasi } from "@/utils/masterData";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const EditHargaTindakanOperasi = () => {
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

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [tindakanOperasi, setTindakanOperasi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getbyidTindakanOperasi(id)
        .then((response) => {
          setTindakanOperasi(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch tindakanOperasi:", error);
          setLoading(false);
        });
    }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!tindakanOperasi) {
    return <p>Tindakan Operasi not found</p>;
  }

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "kategoriOperasi",
          label: "Kategori Operasi",
          name: "kategoriOperasi",
          value: tindakanOperasi?.kategoriOperasi,
          rules: { required: "Kategori Operasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "tipeOperasi",
          label: "Jenis Operasi",
          name: "tipeOperasi",
          value: tindakanOperasi?.tipeOperasi,
          rules: { required: "Jenis Operasi is required" },
          colSize: 6,
        },
      ],
    },
  ];

  return (
    <FormProvider {...methods}>
      <DynamicFormTable
        title="Tarif Tindakan Operasi"
        formConfig={formFields}
      />
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
        <div className="iq-card p-3">
          <div className="container text-center">
            <Button className="btn btn-primary mx-5" onClick={handleSubmit}>
              Submit Data
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EditHargaTindakanOperasi;
