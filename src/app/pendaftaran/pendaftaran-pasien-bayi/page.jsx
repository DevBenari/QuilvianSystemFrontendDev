"use client";

import DataTable from "@/components/view/pendaftarn-pasien-bayi/table/dataTable";
// import { useBayi } from "@/lib/pendaftaran-pasien-bayi/isurance";
import { deleteBayi } from "@/lib/pendaftaran-pasien-bayi/isurance/delete";
import { getByIdBayi } from "@/lib/pendaftaran-pasien-bayi/isurance/getbyid";
import { useRouter } from "next/navigation";

import { Fragment, useEffect } from "react";
import { useState } from "react";
export const PendaftaranPasienBayi = () => {
  // const router = useRouter();

  // const { isurance, loading, error } = useBayi();
  // const [IsuranceState, setIsuranceState] = useState([]);

  // useEffect(() => {
  //   if (isurance) {
  //     setIsuranceState(isurance);
  //   }
  // }, [isurance]);

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle the add button click event, navigate to the add
   * pendaftaran pasien bayi page.
   */
  /******  aab659c3-b26d-4ee3-9ec5-203f455a67ed  *******/
  // const handleAdd = () => {
  //   router.push("/pendaftaran/addPendaftranPasienBayi");
  // };

  // const handleEdit = (id) => {
  //   router.push(`/pendaftaran`); // Include the id in the query parameter
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await deleteBayi(id);
  //     alert(" deleted successfully!");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed ");
  //   }
  // };

  // const handleSearch = async (searchValue) => {
  //   try {
  //     if (!searchValue.trim()) {
  //       setIsuranceState(isurance); // Reset to initial Isurance if search term is empty
  //       return;
  //     }
  //     const result = await getByIdBayi(searchValue.trim());
  //     if (result) {
  //       setIsuranceState([result]); // Update Isurance with the search result
  //     } else {
  //       alert("No promo found with the given ID.");
  //       setIsuranceState([]); // Clear Isurance if no result found
  //     }
  //   } catch (error) {
  //     console.error("Error fetching promo:", error);
  //     alert("Failed to fetch promo.");
  //   }
  // };

  const headers = [
    "NO RM",
    "KELAS",
    "Ruang",
    "NAMA PASIEN MELAHIRKAN",
    "DOKTER",
  ];

  // jika ingin dipakai api ini diaktifkan

  // const members = IsuranceState.map((isurance, index) => ({
  //   no: index + 1,
  //   id: isurance.insuranceId,
  //   kelas: isurance.jenisKerjasama || "-",
  //   ruang: isurance.namaCabang || "-",
  //   nama: isurance.namaPerusahaan || "-",
  //   dokter: isurance.akunBankAtasNama || "-",
  // }));

  return (
    <Fragment>
      <DataTable
        headers={headers}
        // // data={members}
        // onAdd={handleAdd}
        id="id"
        // onSearch={handleSearch}
        actions={{
          edit: (row) => handleEdit(row.id),
        }}
      />
    </Fragment>
  );
};

export default PendaftaranPasienBayi;
