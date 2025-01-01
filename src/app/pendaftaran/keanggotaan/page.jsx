"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTableAnggota from "@/components/features/viewDataTables/dataTable";

import { useAnggota } from "@/lib/hooks/keanggotaan";
import { deleteAnggota } from "@/lib/hooks/keanggotaan/delete";
import { useRouter } from "next/navigation";

import { Fragment, useEffect, useState } from "react";

export const PendaftaranKeanggotaan = () => {
  const router = useRouter();
  const { anggota, loading, error } = useAnggota();
  const [AnggotaState, setAnggotaState] = useState([]);

  useEffect(() => {
    if (anggota) {
      setAnggotaState(anggota);
    }
  }, [anggota]);

  const resetAnggotaState = () => setAnggotaState(anggota);

  const handleSearchByNameOrCode = (value) => {
    if (!value.trim()) {
      resetAnggotaState();
      return;
    }

    const searchValue = value.trim().toLowerCase();

    const filteredAnggota = anggota.filter((anggota) => {
      const nama = String(anggota.namaMember || "").toLowerCase();
      const kode = String(anggota.kodeMember || "");
      return nama.includes(searchValue) || kode.includes(searchValue);
    });

    setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  };

  const handleSearch = (key, value) => {
    if (!value.trim()) {
      resetAnggotaState();
      return;
    }

    const filteredAnggota = anggota.filter((anggota) => {
      if (key === "tanggalStart") {
        const anggotaDate = new Date(anggota[key]).toISOString().split("T")[0];
        const searchDate = new Date(value).toISOString().split("T")[0];
        return anggotaDate === searchDate;
      }

      const fieldValue = String(anggota[key] || "").toLowerCase();
      const searchValue = value.trim().toLowerCase();
      return fieldValue.includes(searchValue);
    });

    setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  };

  const handleAdd = () => router.push("/pendaftaran/");
  const handleEdit = (id) => router.push(`/pendaftaran/${id}`);
  const handleDelete = async (id) => {
    try {
      await deleteAnggota(id);
      alert("Anggota deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete anggota.");
    }
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
    "SISA DEPOSIT",
    "AGENT",
    "STATUS",
  ];

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "namaKode",
          label: "Nama/Kode",
          name: "namaKode",
          placeholder: "Cari berdasarkan Nama atau Kode",
          onChange: (e) => handleSearchByNameOrCode(e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorRm",
          label: "No Rekam Medis",
          name: "nomorRm",
          placeholder: "No Rekam Medis",
          onChange: (e) => handleSearch("nomorRm", e.target.value),
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
          onChange: (e) => handleSearch("jenis", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "agent",
          label: "Agent",
          name: "agent",
          options: [{ label: "non-agent", value: "non-agent" }],
          onChange: (e) => handleSearch("agent", e.target.value),
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
          onChange: (e) => handleSearch("status", e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalStart",
          label: "Tanggal Start",
          name: "tanggalStart",
          colSize: 6,
          onChange: (e) => handleSearch("tanggalStart", e.target.value),
        },
      ],
    },
  ];

  const members = AnggotaState.map((anggota, index) => ({
    no: index + 1,
    id: anggota.anggotaId,
    kodeMember: anggota.kodeMember,
    namaMember: anggota.namaMember,
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
