import axios from "axios";

export const getbyidRuanganOperasi = async (id) => {
  try {
    const response = await axios.get(
      `https://rumahsakit.free.beeceptor.com/ruanganOperasi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};
