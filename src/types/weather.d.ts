export interface MainWeather {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

export interface WeatherState {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherState[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherChartItem {
  dt: number;
  main: MainWeather;
  weather: WeatherState[];
  clouds: {
    all: number;
  };
  wind: Wind;
  rain: {
    [key: `${number}h`]: number;
  };
  snow: {
    [key: `${number}h`]: number;
  };
  pop: number;
  visibility: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ReducedWeatherChartItem {
  day: string;
  weather: WeatherState[];
  min: number;
  max: number;
}

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherChartItem[];
  city: {
    sunrise: number;
    sunset: number;
    timezone: number;
  };
}
