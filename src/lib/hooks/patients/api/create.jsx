import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";

export const createPatient = async (formData) => {
  try {
    const response = await axios.post(
      "http://160.20.104.177:4141/api/NewPatient",
      formData,
      {
        headers: getHeaders(),
      }
    );
    console.log("Response:", response.formData); // Log untuk memastikan data berhasil dikirim
    return response.formData;
  } catch (error) {
    console.error("Error details:", error.response || error.message); // Log detail error
    throw new Error(
      error.response?.formData?.message || "Gagal menambahkan pasien."
    );
  }
};
