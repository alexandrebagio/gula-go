import axios, { AxiosInstance } from "axios";
import requestInterceptor from "./interceptors/request";
import { errorInterceptor, responseInterceptor } from "./interceptors/response";

const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use(responseInterceptor, errorInterceptor);

export default http;
