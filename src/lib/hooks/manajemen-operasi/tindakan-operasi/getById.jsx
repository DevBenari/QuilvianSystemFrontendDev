import axios from "axios";

export const getbyidTindakanOperasi = async (id) => {
  try {
    const response = await axios.get(
      `https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};
