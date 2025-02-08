import axios from "axios";
import { useEffect, useState } from "react";

export const useTindakanOperasi = () => {
  const [tindakanOperasi, setTindakanOperasi] = useState([]); // Corrected casing for consistency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTindakanOperasi = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi`
        );
        setTindakanOperasi(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat tindakanOperasi."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getTindakanOperasi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { tindakanOperasi, loading, error };
};

export const addTindakanOperasi = async (data) => {
  try {
    const response = await axios.post(
      "https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};

export const getbyidTindakanOperasi = async (id) => {
  try {
    const response = await axios.get(
      `https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};

export const editByIdTindakanOperasi = async (data, id) => {
  try {
    const response = await axios.put(
      `https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi/${id}`,
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};
