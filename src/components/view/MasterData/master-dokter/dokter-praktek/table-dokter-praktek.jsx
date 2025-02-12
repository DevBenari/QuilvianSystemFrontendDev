"use client";

import {
  deleteDokterPraktek,
  fetchDokterPraktek,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPraktek";
// React Components
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DokterPraktekList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dokterPraktek);

  useEffect(() => {
    dispatch(fetchDokterPraktek());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteDokterPraktek(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Daftar Dokter Praktek</h2>
      <ul>
        {data.map((dokter) => (
          <li key={dokter.dokterPraktekId}>
            {dokter.dokter} - {dokter.layanan}
            <button onClick={() => handleDelete(dokter.dokterPraktekId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DokterPraktekList;
