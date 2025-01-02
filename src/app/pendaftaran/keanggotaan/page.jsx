"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTableAnggota from "@/components/view/anggota/dataTable";

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
      console.log("Anggota Data:", anggota);
      anggota.forEach((item) => {
        console.log("Tanggal Start:", item.tanggalStart);
      });
      setAnggotaState(anggota);
    }
  }, [anggota]);
  const resetAnggotaState = () => setAnggotaState(anggota);

  // const handleSearchByNameOrCode = (value) => {
  //   if (!value.trim()) {
  //     resetAnggotaState();
  //     return;
  //   }

  //   const searchValue = value.trim().toLowerCase();

  //   const filteredAnggota = anggota.filter((anggota) => {
  //     const nama = String(anggota.nama || "").toLowerCase();
  //     const kode = String(anggota.kodeMember || "");
  //     return nama.startsWith(searchValue) || kode.startsWith(searchValue);
  //   });

  //   setAnggotaState(filteredAnggota.length > 0 ? filteredAnggota : []);
  // };

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
    console.log(filteredAnggota);
  };

  const handleAdd = () => router.push("/pendaftaran/keanggotaan/addAnggota");
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

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "nama",
          label: "nama",
          name: "nama",
          placeholder: "Cari berdasarkan Nama atau Kode",
          onChange: (e) => handleSearch("nama", e.target.value),
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
            { label: "VIP Member dengan UP", value: "VIP Member dengan UP" },
            { label: "VIP Member B", value: "VIP Member B" },
            { label: "VIP BKM Tanpa UP", value: "VIP BKM Tanpa UP" },
            { label: "Telemedicine", value: "Telemedicine" },
          ],
          onChange: (e) => handleSearch("jenis", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "status",
          label: "Status",
          name: "status",
          options: [
            { label: "aktif", value: "aktif" },
            { label: "Non-aktif", value: "non-aktif" },
          ],
          onChange: (e) => handleSearch("status", e.target.value),
          colSize: 6,
        },

        // {
        //   type: "date",
        //   id: "tanggalStart",
        //   label: "Tanggal Start",
        //   name: "tanggalStart",
        //   colSize: 6,
        //   onChange: (e) => handleSearch("tanggalStart", e.target.value),
        // },
      ],
    },
  ];

  const headers = ["NO", "NAMA", "NO RM", "TANGGAL START", "JENIS", "STATUS"];

  const members = AnggotaState.map((anggota, index) => ({
    no: index + 1, // NO
    nama: anggota.nama, // NAMA
    nomorRm: anggota.nomorRm, // NO RMAL START
    tanggalStart: anggota.tanggalStart, // TANGGS
    jenis: anggota.jenis,
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
