import { InjectionKey, inject } from "vue";
import axios, { Axios } from "axios";

import { locale } from "../i18n";

export const apiSymbol: InjectionKey<Axios> = Symbol();
export const API_ROOT = import.meta.env.VITE_API_ROOT;

export function initApi() {
  const api = axios.create({
    baseURL: `https://${API_ROOT}`,
    headers: {
      "Accept-Language": locale.value,
    },
  });

  api.interceptors.request.use(async (config: any) => {
    if (config.params == undefined) config.params = {};

    if (config.method === "get") {
      config.params["t"] = new Date().getTime();
    }

    config.headers["Accept-Language"] = locale.value;

    return config;
  });

  api.interceptors.response.use(
    (response: any) => {
      if (response.data?.success === false) {
        return Promise.reject(response.data.error);
      }
      return Promise.resolve(response);
    },
    (error: any) => {
      if (error.request && error.request.status === 500) {
        console.error("Server error");
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );

  return api;
}

export function useApi() {
  const api = inject(apiSymbol);
  if (!api) {
    throw new Error("Api not properly injected in app");
  }
  return api;
}
