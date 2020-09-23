// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";
import axios from "axios";

export class SuccessRateService {
  api: ApiServiceInterface;

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getMovieSuccessRate(payload: Object) {
    return axios.post("http://localhost:5000/success-rate", payload);
  }
}
