import Cookies from "js-cookie";

export const getHeaders = (includeContentType = true) => {
  const token = Cookies.get("token");
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`, // Add the token dynamically
  };

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};
