import axios, { Axios } from "axios";
import APIExceptionCatchAll from "/@src/utils/decorators";
import { useGeoApi } from "../composable/useApi";
import { City, LocationItem } from "../types/geo";
import { locale } from "../i18n";

@APIExceptionCatchAll
export class GeoService {
  private static _instance: GeoService;
  _api: Axios;
  _apiRoute: string;

  constructor(api: Axios = useGeoApi()) {
    this._api = api;
    this._apiRoute = "";
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public static set Instance(instance) {
    this._instance = instance;
  }

  public async getCities(prefix: string | null): Promise<City[]> {
    const { data } = await this._api.get("cities", {
      params: {
        namePrefix: prefix,
        languageCode: locale.value,
        limit: 10,
      },
    });

    return data.data;
  }

  public async getCurrentLocation(): Promise<LocationItem> {
    const { data } = await axios.get("https://get.geojs.io/v1/ip/geo.json");
    const { city, country, latitude, longitude, timezone } = data;

    const currLoc: LocationItem = {
      city,
      country,
      latitude,
      longitude,
      timezone,
    };

    console.log(currLoc);

    return currLoc;
  }
}
