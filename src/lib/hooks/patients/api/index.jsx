import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";

export const fetchPatients = async () => {
  try {
    const response = await axios.get(
      "http://160.20.104.177:4141/api/NewPatient",
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    throw new Error("Gagal memuat daftar pasien.");
  }
};
