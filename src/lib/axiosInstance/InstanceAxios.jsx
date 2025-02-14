import axios from "axios";

export const InstanceAxios = axios.create({
  baseURL: "http://192.168.15.213:589/api",
});
