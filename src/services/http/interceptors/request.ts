import { InternalAxiosRequestConfig } from "axios";
import { parse } from "cookie";
import http from "..";

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  if ((config.method as string).toLowerCase() !== "get") {
    await http.get("/csrf-cookie").then();
    const cookies = parse(document.cookie);
    config.headers["X-XSRF-TOKEN"] = cookies["XSRF-TOKEN"] ?? "";
  }

  return config;
};

export default requestInterceptor;
