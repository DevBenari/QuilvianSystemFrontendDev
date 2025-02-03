import { useState, useEffect } from "react";

import React from "react";
import { useAnggota } from ".";

const DataAnggota = () => {
  const [AnggotaState, setAnggotaState] = useState([]);
  const { anggota, loading, error } = useAnggota();

  useEffect(() => {
    if (anggota) {
      setAnggotaState(anggota); // Sinkronisasi data awal
    }
  }, [anggota]);

  const getMembers = () =>
    AnggotaState.map((anggota, index) => ({
      no: index + 1,
      nama: anggota.nama,
      3: anggota.nama,
      nomorRm: anggota.nomorRm,
      tanggalStart: anggota.tanggalStart,
      jenis: anggota.jenis,
      status: anggota.status,
    }));

  return { getMembers, anggota, loading, error };
};

export default DataAnggota;
