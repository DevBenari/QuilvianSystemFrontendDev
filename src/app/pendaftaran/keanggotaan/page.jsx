"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTableAnggota from "@/components/features/viewDataTables/dataTable";

import { useAnggota } from "@/lib/hooks/keanggotaan";
import { deleteAnggota } from "@/lib/hooks/keanggotaan/delete";
import { getAnggotaId } from "@/lib/hooks/keanggotaan/getbyid";
import { useRouter } from "next/navigation";

import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
export const PendaftaranKeanggotaan = () => {
  const router = useRouter();

  const { anggota, loading, error } = useAnggota();
  const [AnggotaState, setAnggotaState] = useState([]);

  useEffect(() => {
    if (anggota) {
      setAnggotaState(anggota);
    }
  }, [anggota]);

  const handleAdd = () => {
    router.push("/pendaftaran/");
  };

  const handleEdit = (id) => {
    router.push(`/pendaftaran`); // Include the id in the query parameter
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAnggota(id);
      alert(" deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed ");
    }
  };

  const handleSearchByName = (searchValue) => {
    if (!searchValue.trim()) {
      setAnggotaState(anggota); // Reset to initial Anggota if search term is empty
      return;
    }

    const filteredAnggota = anggota.filter((anggota) =>
      anggota.namaMember
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    );

    if (filteredAnggota.length > 0) {
      setAnggotaState(filteredAnggota); // Update AnggotaState with the filtered Anggota
    } else {
      // alert("No promo found with the given name.");
      setAnggotaState([]); // Clear AnggotaState if no result found
    }
  };

  const handleSearchByNoRekamMedis = (searchValue) => {
    if (!searchValue.trim()) {
      setAnggotaState(anggota); // Reset to initial state
      return;
    }

    const filteredAnggota = anggota.filter((anggota) =>
      anggota.nomorRm?.toLowerCase().includes(searchValue.trim().toLowerCase())
    );

    setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  };

  const handleSearchByJenis = (jenis) => {
    if (!jenis) {
      setAnggotaState(anggota); // Reset to initial state
      return;
    }

    const filteredAnggota = anggota.filter(
      (anggota) => anggota.jenis === jenis
    );

    setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  };

  const handleSearchByAgent = (agent) => {
    if (!agent) {
      setAnggotaState(anggota); // Reset to initial state
      return;
    }

    const filteredAnggota = anggota.filter(
      (anggota) => anggota.agent === agent
    );

    setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  };

  const handleSearchByStatus = (status) => {
    if (!status) {
      setAnggotaState(anggota); // Reset to initial state
      return;
    }

    const filteredAnggota = anggota.filter(
      (anggota) => anggota.status === status // Anggota status berdasarkan api yang di index
    );

    setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  };

  const handleSearchByTanggal = (tanggalStart) => {
    if (!tanggalStart) {
      setAnggotaState(anggota); // Reset to initial state
      return;
    }

    const filteredAnggota = anggota.filter(
      (anggota) => new Date(anggota.tanggalStart) === new Date(tanggalStart) // Anggota date berdasarkan api yang di index
    );

    setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  };

  const headers = [
    "NO",
    "KODE MEMBER",
    "NAMA MEMBER",
    "NO RM",
    "TANGGAL START",
    "TANGGAL EXPIRED",
    "JENIS",
    "SALDO AWAL",
    "SISA DEPOSIT BY BULAN",
    "SISA DEPOSIT ",
    "AGENT",
    "STATUS",
  ];

  // jika ingin dipakai api ini diaktifkan

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "namaMember",
          label: "Nama/kode",
          name: "namaMember",
          placeholder: "Nama/kode",
          onChange: (e) => handleSearchByName(e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorRm",
          label: "No Rekam Medis",
          name: "nomorRm",
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
          id: "agent",
          label: "Agent",
          name: "agent",
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
          id: "tanggalStart",
          label: "TanggalStart ",
          name: "tanggal",
          colSize: 6,
          onChange: (e) => handleSearchByTanggal(e.target.value),
        },
      ],
    },
  ];

  const members = AnggotaState.map((anggota, index) => ({
    no: index + 1,
    id: anggota.anggotaId,
    kodeMember: anggota.kodeMember,
    namaMember: anggota.kodeMember,
    nomorRm: anggota.nomorRm,
    tanggalStart: anggota.tanggalStart,
    tanggalExpired: anggota.tanggalExpired,
    jenis: anggota.jenis,
    saldoAwal: anggota.saldoAwal,
    sisaDepositByBulan: anggota.sisaDepositByBulan,
    sisaDeposit: anggota.sisaDeposit,
    agent: anggota.agent,
    status: anggota.status,
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
