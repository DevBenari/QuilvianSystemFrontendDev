import { useState, useEffect } from "react";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://160.20.104.177:4141/api/City`,
          {
            headers: getHeaders(),
          }
        );
        setCities(response.data);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
        setError("Gagal memuat daftar kecamatan.");
      } finally {
        setLoading(false);
      }
    };

    getCities();
  }, []);

  return { cities, loading, error };
};
