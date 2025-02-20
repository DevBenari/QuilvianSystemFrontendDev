import Cookies from "js-cookie";

export const getHeaders = () => {
  const token = Cookies.get("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`, // Add the token dynamically
  };
};
