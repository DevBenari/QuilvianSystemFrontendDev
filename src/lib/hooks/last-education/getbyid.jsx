import axios from "axios";
import React, { useState, useEffect } from "react";
import { getHeaders } from "@/lib/headers/headers";

const LastEducationId = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const educationByid = async () => {
      try {
        const response = await axios.get(
          `http://160.20.104.177:4141/api/LastEducation/last-education/${id}`,
          { headers: getHeaders() }
        );
        setData(response.data);
      } catch (err) {
        setError(
          err.message ||
            "Terjadi kesalahan saat mengambil data pendidikan terakhir."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) educationByid();
  }, [id]);
  return { data, isLoading, error };
};

export default LastEducationId;
