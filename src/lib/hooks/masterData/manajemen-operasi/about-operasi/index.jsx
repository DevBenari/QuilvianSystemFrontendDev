import axios from "axios";
import { useEffect, useState } from "react";

export const useAboutOperasi = () => {
  const [aboutOperasi, setAboutOperasi] = useState([]); // Corrected casing for consistency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAboutOperasi = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://run.mocky.io/v3/9bec176b-c9a8-4d9e-aad3-d70d985966da`
        );
        setAboutOperasi(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat aboutOperasi."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getAboutOperasi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { aboutOperasi, loading, error };
};

export const addAboutOperasi = async (data) => {
  try {
    const response = await axios.post(
      "https://run.mocky.io/v3/9bec176b-c9a8-4d9e-aad3-d70d985966da",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding About Operasi:", error);
    throw new Error("Failed to add About Operasi. Please try again.");
  }
};

export const editAboutOperasi = async (data, id) => {
  try {
    const response = await axios.put(
      `https://run.mocky.io/v3/9bec176b-c9a8-4d9e-aad3-d70d985966da/${id}`,
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};
