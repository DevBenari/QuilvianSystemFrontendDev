import axios from "axios";

export const RuanganOperasiEdit = async (Data, id) => {
  try {
    const response = await axios.put(
      `https://rumahsakit.free.beeceptor.com/ruanganOperasi/${id}`,
      Data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Gagal Mengedit RuanganOperasi", error);
    throw new Error("Gagal Mengedit RuanganOperasi , Coba Lagi");
  }
};
