export interface LocationItem {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface City extends LocationItem {
  id: number;
  wikiDataId: string;
  type: string;
  name: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
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
