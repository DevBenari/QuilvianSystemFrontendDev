"use client";
import DataTable from "@/components/features/viewDataTables/dataTable";
import { usePromos } from "@/lib/hooks/promo";
import { deletePromo } from "@/lib/hooks/promo/delete";
import { editPromo } from "@/lib/hooks/promo/edit";
import { getById } from "@/lib/hooks/promo/getById";
import { useRouter } from "next/navigation";
import React, { Fragment, useState, useEffect } from "react";

const DashboardPromo = () => {
  const router = useRouter();
  const { promos, loading, error } = usePromos(); // Fetch promo data
  const [promosState, setPromosState] = useState([]); // State to hold promos data
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Sync promosState with promos after fetching
  useEffect(() => {
    if (promos) {
      setPromosState(promos);
    }
  }, [promos]);

  const handleSearch = async (data) => {
    try {
      console.log(data);
      const response = await editPromo(data, data.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update promo.");
    }
  };
  const handleSearchByName = (searchValue) => {
    if (!searchValue.trim()) {
      setPromosState(promos); // Reset to initial promos if search term is empty
      return;
    }

    const filteredPromos = promos.filter((promo) =>
      promo.namaPromo.toLowerCase().includes(searchValue.trim().toLowerCase())
    );

    if (filteredPromos.length > 0) {
      setPromosState(filteredPromos); // Update promosState with the filtered promos
    } else {
      // alert("No promo found with the given name.");
      setPromosState([]); // Clear promosState if no result found
    }
  };
  const formFields = [
    {
      name: "promoByNama",
      label: "Search",
      type: "text",
      placeholder: "Search Booking by Name...",
      onChange: (e) => handleSearchByName(e.target.value),
    },
  ];
  const headers = ["NO", "Class", "Room", "Bed", "Status"];

  // Map promos to match the DataTable structure
  const members = promosState.map((promo, index) => ({
    no: index + 1,
    id: promo.promoId,
    name: promo.kodePromo || "-",
    type_member: promo.namaPromo || "-",
    3: promo.namaPromo || "-",
    promo: promo.keterangan || "-", // Assuming promos have a description field
  }));

  return (
    <Fragment>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <DataTable
          headers={headers}
          data={members}
          id="id"
          rowsPerPage={3}
          formFields={formFields}
          onSave={handleSearch}
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
      )}
    </Fragment>
  );
};

export default DashboardPromo;
