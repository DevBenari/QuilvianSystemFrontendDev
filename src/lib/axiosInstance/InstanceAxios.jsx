import axios from "axios";

export const InstanceAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_QUILVIAN}`
})


