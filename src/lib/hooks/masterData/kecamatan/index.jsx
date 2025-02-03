import { useState, useEffect } from "react";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

export const useKecamatans = () => {
  const [kecamatans, setKecamatans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getKecamatans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://160.20.104.177:4141/api/SubDistrict`,
          {
            headers: getHeaders(),
          }
        );
        setKecamatans(response.data);
      } catch (err) {
        console.error("Failed to fetch kecamatans:", err);
        setError("Gagal memuat daftar kecamatan.");
      } finally {
        setLoading(false);
      }
    };

    getKecamatans();
  }, []);

  return { kecamatans, loading, error };
};
