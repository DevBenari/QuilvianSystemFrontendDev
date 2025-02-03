import axios from "axios";

export const addAboutOperasi = async (data) => {
  try {
    const response = await axios.post(
      "https://run.mocky.io/v3/9bec176b-c9a8-4d9e-aad3-d70d985966da",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding About Operasi:", error);
    throw new Error("Failed to add About Operasi. Please try again.");
  }
};
