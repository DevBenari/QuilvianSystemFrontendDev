"use client";

import CustomSearchText from "@/components/features/custom-search/CustomSearchText/custom-search-text";
import EditableTable from "@/components/features/edit-table/edit-table/edit-table";
import TableEditSave from "@/components/features/edit-table/edit-table/table-edit-save-cancel";
import DynamicFormTable from "@/components/features/dynamic-form/dynamicFormTable/dynamicFormTable";

import { tarifPoliKlinik, tarifTindakan } from "@/utils/masterData";

import { dataRuang } from "@/utils/SearchSelect";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const TarifPoliklinikById = () => {
  const methods = useForm();
  const [filteredDokter, SetfilteredDokter] = useState(tarifTindakan);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedTarif, setSelectedTarif] = useState(null);

  useEffect(() => {
    // Ambil ID dari URL dan konversi menjadi angka
    const id = parseInt(searchParams.get("id"), 10);
    if (!isNaN(id)) {
      const data = tarifPoliKlinik.find((item) => item.id === id);
      setSelectedTarif(data || null); // Jika tidak ditemukan, set null
    }
  }, [searchParams]);

  const formfields = [
    {
      fields: [
        {
          type: "text",
          id: "namaPoliKlinik",
          label: "Nama PoliKlinik",
          name: "namaPoliKlinik",
          value: selectedTarif?.namaPoliKlinik || "", // Tampilkan string kosong jika null
          rules: { required: "Nama PoliKlinik is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaTindakan",
          label: "Nama Tindakan",
          name: "namaTindakan",
          value: selectedTarif?.namaTindakan || "", // Tampilkan string kosong jika null
          rules: { required: "Nama Tindakan is required" },
          colSize: 6,
        },
      ],
    },
  ];

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

  return (
    <FormProvider {...methods}>
      <div className="iq-card p-3">
        <DynamicFormTable
          title="Tarif Tindakan Poliklinik"
          formConfig={formfields}
        />
        <CustomSearchText
          data={tarifTindakan}
          setFilteredPatients={SetfilteredDokter}
          onFilteredPatients={filteredDokter}
          placeholderText="cari Kelas"
          labelText="Kelas"
        />
      </div>
      <TableEditSave
        id="dokter_operator"
        title="Tarif Tindakan"
        columns={ColumnDokter}
        defaultData={filteredDokter}
        onChange={handleTableChange}
        itemsPerPage={5}
        placeholder="isi angka"
      />

      {/* Tombol Submit untuk Semua Tabel */}
      {/* <Button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Submit Data
        </Button> */}
    </FormProvider>
  );
};

export default TarifPoliklinikById;
