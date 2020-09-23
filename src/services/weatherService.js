// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";
import axios from "axios";

export class WeatherService {
  api: ApiServiceInterface;

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getWeather(payload: Object) {
    return axios.post("http://localhost:5000/weather-prediction", payload);
  }
}
