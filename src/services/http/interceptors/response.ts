import { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";

const responseInterceptor = (response: AxiosResponse) => response;

const errorInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    if (typeof window !== "undefined" && Router.pathname !== "/login") {
      // Redirecionamento no client SSR
      Router.push("/login");
    }
  }

  return Promise.reject(error);
};

export { errorInterceptor, responseInterceptor };
