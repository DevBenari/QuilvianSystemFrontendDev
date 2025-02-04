"use client";
import React, { useState } from "react";

import ButtonNav from "@/components/ui/button-navigation";

import { Button, Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { tarifPoliKlinik } from "@/utils/masterData";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import TableEditSave from "@/components/features/edit-table/edit-table/table-edit-save-cancel";
import { components } from "react-select";
import SelectField from "@/components/ui/select-field";
import { useRouter, useSearchParams } from "next/navigation";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

const TableListDaftarPoliKlinik = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(tarifPoliKlinik);
  const router = useRouter();

  const columnTindakanPoliKlinik = [
    {
      key: "id",
      label: "id",
    },
    {
      label: "Kode",
      key: "kode",
    },
    {
      label: "Nama Tindakan",
      key: "namaTindakan",
    },
    {
      label: "Nama Poliklinik",
      key: "namaPoliKlinik",
    },
    {
      label: "Dokter",
      key: "dokter",
    },
    {
      label: "Rumah Sakit",
      key: "rumahSakit",
    },
    {
      label: "JP",
      key: "jp",
    },
    {
      label: "BAHP",
      key: "bahp",
    },
    {
      label: "Lain-Lain",
      key: "lainLain",
    },
    {
      label: "Total",
      key: "total",
    },
  ];

  // const handleTableChange = (tableId, updatedData) => {
  //   setAllTableData((prev) => ({
  //     ...prev,
  //     [tableId]: updatedData,
  //   }));
  // };

  // const handleTarifById = (id) => {
  //   router.push(
  //     `/MasterData/master-poliklinik/data-tindakan-poli-klinik/tarif-tindakan-poliklinik?id=${id}`
  //   );
  // };

  // const handleEditFormById = (id) => {
  //   router.push(
  //     `/MasterData/master-poliklinik/data-tindakan-poli-klinik/edit-tindakan-poliklinik?id=${id}`
  //   );
  // };

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
                <ButtonNav
                  path="/MasterData/master-poliklinik/data-tindakan-poli-klinik/add-tindakan-poliklinik"
                  label="Add Tindakan Poli Klinik"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  id="groupTarif"
                  columns={columnTindakanPoliKlinik}
                  data={filteredPatients}
                  slugConfig={{ textField: "namaTindakan", idField: "id" }}
                  itemsPerPage={5}
                  basePath="/MasterData/master-poliklinik/data-tindakan-poli-klinik/edit-tindakan-poliklinik"
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
