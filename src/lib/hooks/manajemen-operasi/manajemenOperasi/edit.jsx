import axios from "axios";

export const OperasiEdit = async (OperasiData, id) => {
  try {
    const response = await axios.put(
      `https://671641c033bc2bfe40bd1f2a.mockapi.io/manajemenOperasi/${id}`,
      OperasiData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Gagal Mengedit Operasi", error);
    throw new Error("Gagal Mengedit Operasi , Coba Lagi");
  }
};
