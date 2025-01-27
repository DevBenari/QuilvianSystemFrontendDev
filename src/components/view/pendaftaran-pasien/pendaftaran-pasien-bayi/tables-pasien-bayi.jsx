"use client";

import React, { Fragment, memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBayi } from "@/lib/hooks/pasienBayi";
import { deleteBayi } from "@/lib/hooks/pasienBayi/delete";
import { Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/custom-table/viewDataTables/dataTable";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
const DashboardPendaftaranBayi = memo(() => {
  const router = useRouter();
  const { bayi, loading, error } = useBayi(); // Fetch promo data
  const [filteredPatientsBayi, setfilteredPatientsBayi] = useState(bayi); // State to hold bayi data
  // const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Sync filteredPatientsBayi with bayi after fetching
  useEffect(() => {
    if (bayi) {
      setfilteredPatientsBayi(bayi);
    }
  }, [bayi]);

  console.log("data bayi", bayi);

  const handleAdd = () => {
    router.push("/pendaftaran/pendaftaran-pasien-baru");
  };
  const handleEdit = (id) => {
    router.push(
      `/pendaftaran/pendaftaran-pasien-bayi/edit-pasien-bayi?id=${id}`
    ); // Include the id in the query parameter
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteBayi(id);
      alert("Promo deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update promo.");
    }
  };

  const headers = ["NO", "Nama Pasien Melahirkan", "Dokter", "Kelas", "Ruang"];

  // Map bayi to match the DataTable structure
  const members = filteredPatientsBayi.map((item, index) => ({
    no: index + 1,
    id: item.id, // Tambahkan id di sini
    namaPasienMelahirkan: item.namaPasienMelahirkan,
    dokter: item.dokter,
    kelas: item.kelas,
    ruang: item.ruang,
  }));

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Fragment>
        <Col lg="12" className=" iq-card p-4">
          <div className="d-flex justify-content-between iq-card-header">
            <h2 className="mb-3">Searching Pasien Bayi </h2>
            <button
              className="btn btn-dark my-3 mx-3"
              onClick={() => window.location.reload()}
            >
              <i className="ri-refresh-line"></i>
            </button>
          </div>
          <Col lg="12" className="mt-2">
            <CustomSearchFilter
              data={bayi}
              setFilteredPatients={setfilteredPatientsBayi}
              onFilteredPatients={filteredPatientsBayi}
            />
          </Col>
        </Col>

        {loading && <div>Loading...</div>}
        {error && <div className="text-danger">{error}</div>}
        {!loading && !error && (
          <DataTable
            headers={headers}
            data={members}
            onAdd={handleAdd}
            id="id"
            // onSave={handleSearch}
            rowsPerPage={8}
            actions={{
              edit: (row) => handleEdit(row.id),
              delete: (row) => handleDelete(row.id),
            }}
            editLabel="Registrasi"
          />
        )}
      </Fragment>
    </FormProvider>
  );
});

DashboardPendaftaranBayi.displayName = "DashboardPendaftaranBayi";
export default DashboardPendaftaranBayi;
