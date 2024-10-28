import { InjectionKey, inject } from "vue";
import axios, { Axios } from "axios";

import { locale } from "../i18n";

export const apiSymbol: InjectionKey<Axios> = Symbol();
export const apiGeoSymbol: InjectionKey<Axios> = Symbol();

export const API_ROOT = import.meta.env.VITE_API_ROOT;
export const GEO_ROOT = import.meta.env.VITE_GEO_ROOT;

export function initApi() {
  const api = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,
    headers: {
      "Accept-Language": locale.value,
    },
    params: {
      appid: "a86c06a87e2c2a38e2a4585b2a93e61c",
      units: "metric",
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

export function initGeoApi() {
  const geoApi = axios.create({
    baseURL: `https://wft-geo-db.p.rapidapi.com/v1/geo/`,
    headers: {
      "x-rapidapi-key": "8b58007bc2msh850fe94f3deb69ep1fb800jsnae50500d7bda",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  });

  geoApi.interceptors.request.use(async (config: any) => {
    if (config.params == undefined) config.params = {};

    if (config.method === "get") {
      config.params["t"] = new Date().getTime();
    }

    config.headers["Accept-Language"] = locale.value;

    return config;
  });

  geoApi.interceptors.response.use(
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

  return geoApi;
}

export function useApi() {
  const api = inject(apiSymbol);
  if (!api) {
    throw new Error("WeatherApi not properly injected in app");
  }
  return api;
}

export function useGeoApi() {
  const geoApi = inject(apiGeoSymbol);
  if (!geoApi) {
    throw new Error("GeoApi not properly injected in app");
  }
  return geoApi;
}
