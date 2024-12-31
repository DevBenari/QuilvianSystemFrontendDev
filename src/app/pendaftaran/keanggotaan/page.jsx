"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTableAnggota from "@/components/features/viewDataTables/dataTable";

import { useIsurance } from "@/lib/pendaftaran-pasien-bayi/isurance";
import { deleteIsurance } from "@/lib/pendaftaran-pasien-bayi/isurance/delete";
import { getIsuranceId } from "@/lib/pendaftaran-pasien-bayi/isurance/getbyid";
import { useRouter } from "next/navigation";

import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
export const PendaftaranKeanggotaan = () => {
  const router = useRouter();

  const { isurance, loading, error } = useIsurance();
  const [IsuranceState, setIsuranceState] = useState([]);

  useEffect(() => {
    if (isurance) {
      setIsuranceState(isurance);
    }
  }, [isurance]);

  const handleAdd = () => {
    router.push("/pendaftaran/");
  };

  const handleEdit = (id) => {
    router.push(`/pendaftaran`); // Include the id in the query parameter
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteIsurance(id);
      alert(" deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed ");
    }
  };

  const handleSearchByName = (searchValue) => {
    if (!searchValue.trim()) {
      setIsuranceState(isurance); // Reset to initial isurance if search term is empty
      return;
    }

    const filteredisurance = isurance.filter((isurance) =>
      isurance.namaPerusahaan
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    );

    if (filteredisurance.length > 0) {
      setIsuranceState(filteredisurance); // Update isuranceState with the filtered isurance
    } else {
      // alert("No promo found with the given name.");
      setIsuranceState([]); // Clear isuranceState if no result found
    }
  };

  const handleSearchByNoRekamMedis = (searchValue) => {
    if (!searchValue.trim()) {
      setIsuranceState(isurance); // Reset to initial state
      return;
    }

    const filteredisurance = isurance.filter((isurance) =>
      isurance.noRekamMedis
        ?.toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    );

    setIsuranceState(filteredisurance.length > 0 ? filteredisurance : []);
  };

  const handleSearchByJenis = (jenis) => {
    if (!jenis) {
      setIsuranceState(isurance); // Reset to initial state
      return;
    }

    const filteredisurance = isurance.filter(
      (isurance) => isurance.jenisKerjasama === jenis
    );

    setIsuranceState(filteredisurance.length > 0 ? filteredisurance : []);
  };

  const handleSearchByAgent = (agent) => {
    if (!agent) {
      setIsuranceState(isurance); // Reset to initial state
      return;
    }

    const filteredisurance = isurance.filter(
      (isurance) => isurance.agent === agent
    );

    setIsuranceState(filteredisurance.length > 0 ? filteredisurance : []);
  };

  const handleSearchByStatus = (status) => {
    if (!status) {
      setIsuranceState(isurance); // Reset to initial state
      return;
    }

    const filteredisurance = isurance.filter(
      (isurance) => isurance.status === status // isurance status berdasarkan api yang di index
    );

    setIsuranceState(filteredisurance.length > 0 ? filteredisurance : []);
  };

  const handleSearchByTanggal = (tanggal) => {
    if (!tanggal) {
      setIsuranceState(isurance); // Reset to initial state
      return;
    }

    const filteredisurance = isurance.filter(
      (isurance) => new Date(isurance.tanggal) === new Date(tanggal) // isurance date berdasarkan api yang di index
    );

    setIsuranceState(filteredisurance.length > 0 ? filteredisurance : []);
  };

  const headers = [
    "NO",
    "KODE MEMBER",
    "NAMA MEMBER",
    "NO RM",
    "TANGGAL START",
    "TANGGAL EXPIRED",
    "JENIS",
    "KODE MEMBER UTAMA",
    "NAMA MEMBER UTAMA",
    "HUBUNNGAN",
    "SALDO AWAL",
    "SISA DEPOSIT BY BULAN",
    "SISA DEPOSIT ",
    "KODE AGEN",
    "STATUS",
  ];

  // jika ingin dipakai api ini diaktifkan

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "nama",
          label: "Nama/kode",
          name: "nama",
          placeholder: "Nama/kode",
          onChange: (e) => handleSearchByName(e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "noRekamMedis",
          label: "No Rekam Medis",
          name: "noRekamMedis",
          placeholder: "No Rekam Medis",
          onChange: (e) => handleSearchByNoRekamMedis(e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "jenis",
          label: "Jenis",
          name: "jenis",
          options: [
            { label: "VIP Member dengan UP", value: "VIP_Member_dengan_UP" },
            { label: "VIP Member B", value: "VIP_Member_B" },
            { label: "VIP BKM Tanpa UP", value: "VIP_BKM_Tanpa_UP" },
            { label: "Telemedicine", value: "telemedicine" },
          ],
          onChange: (e) => handleSearchByJenis(e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "Agent",
          label: "Agent",
          name: "Agent",
          options: [{ label: "non-agent", value: "non-agent" }],
          onChange: (e) => handleSearchByAgent(e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "status",
          label: "Status",
          name: "status",
          options: [
            { label: "Aktif", value: "aktif" },
            { label: "Non-aktif", value: "non-aktif" },
          ],
          onChange: (e) => handleSearchByStatus(e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggal",
          label: "Tanggal ",
          name: "tanggal",
          colSize: 6,
          onChange: (e) => handleSearchByTanggal(e.target.value),
        },
      ],
    },
  ];

  const members = IsuranceState.map((isurance, index) => ({
    no: index + 1,
    id: isurance.insuranceId,
    kelas: isurance.jenisKerjasama || "-",
    ruang: isurance.namaCabang || "-",
    nama: isurance.namaPerusahaan || "-",
    dokter: isurance.akunBankAtasNama || "-",
    pasien: isurance.akunBankAtasNama || "-",
    aaaa: isurance.akunBankAtasNama || "-",
    bbbb: isurance.akunBankAtasNama || "-",
    cccc: isurance.akunBankAtasNama || "-",
    dddd: isurance.akunBankAtasNama || "-",
    zzzz: isurance.akunBankAtasNama || "-",
    eeee: isurance.akunBankAtasNama || "-",
    uuuu: isurance.akunBankAtasNama || "-",
    pppp: isurance.akunBankAtasNama || "-",
  }));

  return (
    <Fragment>
      <DynamicForm title="Pendaftaran Keanggotaan" formConfig={formFields} />
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <DataTableAnggota
          headers={headers}
          data={members}
          onAdd={handleAdd}
          id="id"
          actions={{
            edit: (row) => handleEdit(row.id),
            delete: (row) => handleDelete(row.id),
          }}
        />
      )}
    </Fragment>
  );
};

export default PendaftaranKeanggotaan;
