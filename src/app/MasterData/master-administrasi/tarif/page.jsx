"use client";

import CustomSearchText from "@/components/features/custom-search/CustomSearchText/custom-search-text";
import EditableTable from "@/components/features/custom-table/edit-table/edit-table";

import { tarifTindakan } from "@/utils/masterData";

import { dataRuang } from "@/utils/SearchSelect";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const ExamplePage = () => {
  const [filteredDokter, SetfilteredDokter] = useState(tarifTindakan);

  const methods = useForm();

  const ColumnDokter = [
    { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
    { headerName: "Dokter", field: "dokter", isEditable: true },
    { headerName: "RS", field: "rs", isEditable: true },
    { headerName: "JP", field: "JP", isEditable: true },
    { headerName: "BPJS", field: "bpjs", isEditable: true },
    { headerName: "Other", field: "other", isEditable: true },
    { headerName: "Total", field: "total", isEditable: false },
    { headerName: "KSO", field: "kso", isEditable: false },
  ];

  const [allTableData, setAllTableData] = useState({
    dokter_operator: tarifTindakan,
  });

  const handleTableChange = (tableId, updatedData) => {
    setAllTableData((prev) => ({
      ...prev,
      [tableId]: updatedData,
    }));
  };

  // console.log(filteredDokter);

  const handleSubmit = () => {
    console.log("Submitted Data:", allTableData);
    // Lakukan sesuatu dengan semua data tabel
  };

  // useEffect(() => {
  //   console.log("Updated filteredDokter:", filteredDokter);
  // }, [filteredDokter]);

  return (
    <FormProvider {...methods}>
      <div className="container mt-5">
        <Col lg="12" className=" iq-card p-4">
          <div className="d-flex justify-content-between iq-card-header">
            <h2 className="mb-3">Cari Kelas </h2>
            <button
              className="btn btn-dark my-3 mx-3"
              onClick={() => window.location.reload()}
            >
              <i className="ri-refresh-line"></i>
            </button>
          </div>
          <Col lg="12" className="mt-2">
            <CustomSearchText
              data={tarifTindakan}
              setFilteredPatients={SetfilteredDokter}
              onFilteredPatients={filteredDokter}
              placeholderText="cari Kelas"
              labelText="Kelas"
            />
          </Col>
        </Col>
        <EditableTable
          id="dokter_operator"
          title="Tarif Tindakan"
          columns={ColumnDokter}
          defaultData={filteredDokter}
          onChange={handleTableChange}
          itemsPerPage={5}
        />

        {/* Tombol Submit untuk Semua Tabel */}
        <Button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Submit Data
        </Button>
      </div>
    </FormProvider>
  );
};

export default ExamplePage;
