"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import {
  fetchAgamaPaged,
  fetchAgamaWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";
import ButtonNav from "@/components/ui/button-navigation";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { FaUserInjured } from "react-icons/fa";

const TableDataAgama = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: agamaData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.agama);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchAgamaPaged({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(agamaData);
  }, [agamaData]);

  return (
    <>
      <FormProvider {...methods}>
        <CustomTableComponent
          //  start header
          headerTitle="Pencarian Data Agama"
          headerSubtitle="Pembuatann dan Manajemen Data Agama"
          icon={FaUserInjured} // Menggunakan icon yang bisa diubah
          //  end header
          //  custom search filter
          fetchFunction={fetchAgamaWithFilters}
          setFilteredData={setFilteredData}
          showSearch={true}
          //  end  custom search filter
          //   Table
          tableTitle="Data Pasien IGD"
          data={filteredData}
          columns={[
            { key: "no", label: "No" },
            { key: "createByName", label: "Dibuat Oleh" },
            { key: "createDateTime", label: "Tanggal Dibuat" },
            { key: "kodeAgama", label: "Kode Agama" },
            { key: "namaAgama", label: "Nama Agama" },
          ]}
          slugConfig={{ textField: "namaAgama", idField: "agamaId" }}
          basePath="/MasterData/master-informasi/agama/edit-agama"
          paginationProps={{
            currentPage: page,
            totalPages: totalPages,
            itemsPerPage: perPage,
            onPageChange: setPage,
          }}
          addButton={
            <ButtonNav
              path="/MasterData/master-informasi/agama/add-agama"
              label="Tambah Agama"
              icon="ri-add-fill"
              size="sm"
              variant=""
              className="btn btn-sm iq-bg-success"
            />
            // End Table
          }
        />
      </FormProvider>
    </>
  );
};

export default TableDataAgama;
