"use client";
import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard";
import DataTable from "@/components/features/viewDataTables/dataTable";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBayi } from "@/lib/hooks/pasienBayi";
import { deleteBayi } from "@/lib/hooks/pasienBayi/delete";

const DashboardPendaftaranBayi = memo(() => {
  const router = useRouter();
  const { bayi, loading, error } = useBayi(); // Fetch promo data
  const [bayiState, setBayiState] = useState([]); // State to hold bayi data
  // const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredPatients, setFilteredPatients] = useState(bayi);
  // Sync bayiState with bayi after fetching
  useEffect(() => {
    if (bayi) {
      setBayiState(bayi);
    }
  }, [bayi]);

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

  // const handleSearch = async (data) => {
  //   try {
  //     console.log(data);
  //     const response = await editPromo(data, data.id);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to update promo.");
  //   }
  // };

  const headers = ["NO", "Nama Pasien Melahirkan", "Dokter", "Kelas", "Ruang"];

  // Map bayi to match the DataTable structure
  const members = bayiState.map((bayi, index) => ({
    no: index + 1,
    id: bayi.id, // Tambahkan id di sini
    namaPasienMelahirkan: bayi.namaPasienMelahirkan,
    dokter: bayi.dokter,
    kelas: bayi.kelas,
    ruang: bayi.ruang,
  }));

  return (
    <Fragment>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <DataTable
          headers={headers}
          data={members}
          dataPencarian={bayiState}
          setFilteredPatients={setFilteredPatients}
          filteredPatients={filteredPatients}
          onAdd={handleAdd}
          id="id"
          // onSave={handleSearch}
          rowsPerPage={10}
          actions={{
            edit: (row) => handleEdit(row.id),
            delete: (row) => handleDelete(row.id),
          }}
          editLabel="Registrasi"
        />
      )}
    </Fragment>
  );
});

DashboardPendaftaranBayi.displayName = "DashboardPendaftaranBayi";
export default DashboardPendaftaranBayi;
