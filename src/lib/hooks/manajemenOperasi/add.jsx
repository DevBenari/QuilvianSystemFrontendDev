import axios from "axios";

export const addOperasi = async (OperasiData) => {
  try {
    const response = await axios.post(
      "https://671641c033bc2bfe40bd1f2a.mockapi.io/manajemenOperasi/",
      OperasiData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error menambahkan operasi:", error);
    throw new Error("Gagal dalam menambahkan operasi. Please try again.");
  }
};
