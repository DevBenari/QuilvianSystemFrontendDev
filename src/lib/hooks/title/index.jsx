import axios from "axios";
import { useEffect, useState } from "react";

export const useTitle = () => {
  const [title, setTitle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTitle = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://192.168.15.213:589/api/Title`);
        console.log("Data fetched:", response.data); // Tambahkan log ini
        setTitle(response.data);
      } catch (err) {
        console.error("Failed to fetch title:", err);
        setError("Gagal memuat daftar title.");
      } finally {
        setLoading(false);
      }
    };
    getTitle();
  }, []);

  return { title, loading, error };
};

export const addTitle = async (data) => {
  try {
    const response = await axios.post(
      `http://192.168.15.213:589/api/Title`,
      data
    );
    console.log("Data added:", response.data); // Tambahkan log ini
    return response.data;
  } catch (err) {
    console.error("Failed to add title:", err);
    throw err;
  }
};

export const titleById = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.15.213:589/api/Title/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding title:", error);
    throw new Error("Failed to add title. Please try again.");
  }
};

export const editTitle = async (data, id) => {
  if (!id) {
    throw new Error("ID is required for updating title.");
  }

  try {
    const response = await axios.put(
      `http://192.168.15.213:589/api/Title/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating title:", error);
    throw new Error("Failed to update title. Please try again.");
  }
};
