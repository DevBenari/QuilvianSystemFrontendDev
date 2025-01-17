import axios from "axios";

export const getAnggotaId = async (id) => {
  try {
    const response = await axios.get(
      `https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bayi:", error);
    throw new Error("gagal dalam menampilkan data");
  }
};
