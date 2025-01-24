import axios from "axios";

export const addRuanganOperasi = async (data) => {
  try {
    const response = await axios.post(
      "https://rumahsakit.free.beeceptor.com/ruanganOperasi",
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error menambahkan ruangan operasi:", error);
    throw new Error(
      "Gagal dalam menambahkan ruangan operasi. Please try again."
    );
  }
};
