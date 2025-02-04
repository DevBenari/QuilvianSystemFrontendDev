"use client";
import React, { useState } from "react";

import ButtonNav from "@/components/ui/button-navigation";

import { Button, Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { group_tarif } from "@/utils/masterData";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import TableEditSave from "@/components/features/edit-table/edit-table/table-edit-save-cancel";

const TableListDaftarRawatInap = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(group_tarif);

  const handleRemovePatient = (id) => {
    const updatedPatients = filteredPatients.filter(
      (patient) => patient.id !== id
    );
    setFilteredPatients(updatedPatients);
  };

  const ColumnTarif = [
    {
      headerName: "Group Perusahaan",
      field: "group_perusahaan",
      isEditable: false,
    },
    { headerName: "Persentase", field: "persentase", isEditable: true },
    { headerName: "Nilai Minimum", field: "nilai_minimum", isEditable: true },
    { headerName: "Nilai Maksimum", field: "nilai_maksimum", isEditable: true },
  ];

  const [allTableData, setAllTableData] = useState({
    groupTarif: group_tarif,
  });

  const handleTableChange = (tableId, updatedData) => {
    setAllTableData((prev) => ({
      ...prev,
      [tableId]: updatedData,
    }));
  };

  // console.log(filteredDokter);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">
              List Daftar Rawat Inap
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
            data={group_tarif}
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
                    Tabel Daftar Rawat Inap
                  </h4>
                </div>
                {/* <ButtonNav
                  path="/MasterData/master-administrasi/administrasi-rawat-inap/add-rawat-inap"
                  label="Add Rawat Inap"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                /> */}
              </div>
              <div className="iq-card-body">
                <TableEditSave
                  id="groupTarif"
                  columns={ColumnTarif}
                  defaultData={filteredPatients}
                  onChange={handleTableChange}
                  itemsPerPage={5}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};
export default TableListDaftarRawatInap;
