import axios from "axios";
import { useEffect, useState } from "react";

export const useAnggota = () => {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnggota = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan`
        );
        setAnggota(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat daftar Anggota."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getAnggota();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { anggota, loading, error };
};

export const addAnggota = async (anggotaData) => {
  try {
    const response = await axios.post(
      "https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan/",
      anggotaData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding promo:", error);
    throw new Error("Failed to add promo. Please try again.");
  }
};

export const getAnggotaId = async (id) => {
  try {
    const response = await axios.get(
      `https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bayi:", error);
    throw new Error("gagal dalam menampilkan data");
  }
};

export const deleteAnggota = async (id) => {
  try {
    const response = await axios.delete(
      `https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding promo:", error);
    throw new Error("Failed to add promo. Please try again.");
  }
};

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
