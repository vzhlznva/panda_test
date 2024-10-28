import { Weather } from "./weather";

export interface LocationItem {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country_code: string;
}

export interface LocationBlock {
  location: LocationItem | null;
  weather: Weather | null;
  fav?: boolean;
}

export interface City extends LocationItem {
  id: number;
  wikiDataId: string;
  type: string;
  name: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  population: number;
  countryCode: string;
}

export interface CurrentLocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}
