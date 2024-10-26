import axios, { Axios } from "axios";
import APIExceptionCatchAll from "/@src/utils/decorators";
import { useApi } from "../composable/useApi";
import { City, LocationItem } from "../types/geo";
import { locale } from "../i18n";
import { Weather, WeatherForecast } from "../types/weather";

const API_KEY = import.meta.env.API_KEY;

@APIExceptionCatchAll
export class WeatherService {
  private static _instance: WeatherService;
  _api: Axios;
  _apiRoute: string;

  constructor(api: Axios = useApi()) {
    this._api = api;
    this._apiRoute = "";
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public static set Instance(instance) {
    this._instance = instance;
  }

  public async getWeather(
    lat: string | number,
    lon: string | number
  ): Promise<Weather> {
    const { data } = await this._api.get("weather", {
      params: { lat, lon, APPID: "a86c06a87e2c2a38e2a4585b2a93e61c" },
    });

    return data;
  }

  public async getForecast(
    lat: string | number,
    lon: string | number,
    days: number
  ): Promise<WeatherForecast> {
    const { data } = await this._api.get("forecast", {
      params: {
        lat,
        lon,
        APPID: "a86c06a87e2c2a38e2a4585b2a93e61c",
        cnt: days * 8,
      },
    });

    return data;
  }
}
