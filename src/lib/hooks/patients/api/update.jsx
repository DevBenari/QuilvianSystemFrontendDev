import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";

export const updatePatient = async (id, formData) => {
  try {
    const response = await axios.put(
      `http://160.20.104.177:4141/api/NewPatient/${id}`,
      formData,
      {
        headers: getHeaders(),
      }
    );
    console.log("Request data:", formData);
    console.log(formData);
    console.log("Response:", response.formData);
    return response.formData;
  } catch (error) {
    throw error("tidak dapat memperbarui data pasien", error);
  }
};
