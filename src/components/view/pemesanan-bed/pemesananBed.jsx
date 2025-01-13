"use client";
import DataTable from "@/components/features/viewDataTables/dataTable";
import { usePromos } from "@/lib/hooks/promo";
import { deletePromo } from "@/lib/hooks/promo/delete";
import { editPromo } from "@/lib/hooks/promo/edit";
import { getById } from "@/lib/hooks/promo/getById";
import { dataBed } from "@/utils/PasienPerjanjian";
import { useRouter } from "next/navigation";
import React, { Fragment, useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";

const PemesananBed = memo(() => {
  // const router = useRouter();
  // const { promos, loading, error } = usePromos(); // Fetch promo data
  // const [promosState, setPromosState] = useState([]); // State to hold promos data
  // const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // // Sync promosState with promos after fetching
  // useEffect(() => {
  //   if (promos) {
  //     setPromosState(promos);
  //   }
  // }, [promos]);

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
  // const handleSearchByName = (searchValue) => {
  //   if (!searchValue.trim()) {
  //     setPromosState(promos); // Reset to initial promos if search term is empty
  //     return;
  //   }

  //   const filteredPromos = promos.filter((promo) =>
  //     promo.namaPromo.toLowerCase().includes(searchValue.trim().toLowerCase())
  //   );

  //   if (filteredPromos.length > 0) {
  //     setPromosState(filteredPromos); // Update promosState with the filtered promos
  //   } else {
  //     // alert("No promo found with the given name.");
  //     setPromosState([]); // Clear promosState if no result found
  //   }
  // };
  // const formFields = [
  //   {
  //     name: "promoByNama",
  //     label: "Search",
  //     type: "text",
  //     placeholder: "Search Booking by Name...",
  //     onChange: (e) => handleSearchByName(e.target.value),
  //   },
  // ];
  // const headers = ["NO", "Class", "Room", "Bed", "Status"];

  // // Map promos to match the DataTable structure
  // const members = promosState.map((promo, index) => ({
  //   no: index + 1,
  //   id: promo.promoId,
  //   name: promo.kodePromo || "-",
  //   type_member: promo.namaPromo || "-",
  //   3: promo.namaPromo || "-",
  //   promo: promo.keterangan || "-", // Assuming promos have a description field
  // }));

  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataBed);
  const [searchCriteria, setSearchCriteria] = useState({
    tanggalMulai: "",
    tanggalSelesai: "",
    nama: "",
    noRM: "",
    alamat: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataPasienMCU.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true;

        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          const itemDate = new Date(item.tanggalOperasi).getTime();
          const startDate = new Date(updatedCriteria.tanggalMulai).getTime();
          const endDate = new Date(updatedCriteria.tanggalSelesai).getTime();
          if (criteriaKey === "tanggalMulai" && startDate) {
            return itemDate >= startDate;
          }
          if (criteriaKey === "tanggalSelesai" && endDate) {
            return itemDate <= endDate;
          }
        }

        if (criteriaKey === "kelasSelect.select") {
          return item.kelas
            ?.toString()
            .toLowerCase()
            .includes(criteriaValue.toLowerCase());
        }

        return item[criteriaKey]
          ?.toString()
          .toLowerCase()
          .includes(criteriaValue.toLowerCase());
      });
    });

    setFilteredData(filtered);
  };

  const formFields = [
    {
      name: "tanggalMulai",
      label: "Tanggal Mulai",
      type: "date",
      onChange: (e) => handleSearch("tanggalMulai", e.target.value),
    },
    {
      name: "tanggalSelesai",
      label: "Tanggal Selesai",
      type: "date",
      onChange: (e) => handleSearch("tanggalSelesai", e.target.value),
    },
  ];

  const headers = ["NO", "Class", "Room", "Bed Detail", "Status"];

  const members = dataBed.flatMap((item, index) =>
    item.beds.map((bed, bedIndex) => ({
      id: `${index + 1}-${bedIndex + 1}`, // ID unik
      no: index + 1 + bedIndex, // Nomor baris
      class: item.class,
      room: item.room,
      detail: bed.detail,
      status: bed.status,
    }))
  );

  return (
    <Fragment>
      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={10}
        formFields={formFields}
        // onSave={handleSearch}
        title="List Booking Bed"
        actions={{
          booking: (row) => handleEdit(row.id),
        }}
        customActions={[
          {
            label: "Booking",
            onClick: (row) => console.log("Custom Action 1", row),
            className: "iq-bg-success",
          },
        ]}
      />
    </Fragment>
  );
});

PemesananBed.displayName = "PemesananBed";

export default PemesananBed;
