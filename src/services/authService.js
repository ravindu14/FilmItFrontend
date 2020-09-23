// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

export class AuthService {
  api: ApiServiceInterface;

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  isUniqueScript(query: Object) {
    return this.api.get("/script/uniqueness", query);
  }

  saveScript(payload: Object) {
    return this.api.post("/script/save", payload);
  }
}
