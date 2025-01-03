import { useState, useEffect } from "react";

import React from "react";
import { useAnggota } from ".";

const DataAnggota = () => {
  const [AnggotaState, setAnggotaState] = useState([]);
  const { anggota, loading, error } = useAnggota();

  useEffect(() => {
    if (anggota) {
      console.log("Anggota Data:", anggota);
      anggota.forEach((item) => {
        console.log("Tanggal Start:", item.tanggalStart);
      });
      setAnggotaState(anggota);
    }
  }, [anggota]);

  const getMembers = () =>
    AnggotaState.map((anggota, index) => ({
      no: index + 1,
      nama: anggota.nama,
      nomorRm: anggota.nomorRm,
      tanggalStart: anggota.tanggalStart,
      jenis: anggota.jenis,
      status: anggota.status,
    }));

  return { getMembers, anggota, loading, error };
};

export default DataAnggota;
