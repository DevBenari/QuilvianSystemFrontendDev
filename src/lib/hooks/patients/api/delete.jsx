import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";

export const deletePatient = async (id) => {
  try {
    await axios.delete(`http://160.20.104.177:4141/api/NewPatient/${id}`, {
      headers: getHeaders(),
    });
  } catch (error) {
    throw new Error("Gagal menghapus pasien.");
  }
};
