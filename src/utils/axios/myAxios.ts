import axios from "axios";
import { onSuccess } from "./module/onSuccess";
import { onError } from "./module/onError";

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  withCredentials: true,
});

myAxios.interceptors.request.use((config) => {
  return config;
});
myAxios.interceptors.response.use(onSuccess, onError);

export default myAxios;
