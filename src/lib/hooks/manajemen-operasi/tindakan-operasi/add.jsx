import axios from "axios";

export const addTindakanOperasi = async (data) => {
  try {
    const response = await axios.post(
      "https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};
