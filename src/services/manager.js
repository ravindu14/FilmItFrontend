import {
  registerGlobalServices,
  serviceManager,
} from "shared/services/manager";
import { SuccessRateService } from "./successRateService";
import { WeatherService } from "./weatherService";

export const registerServices = (options) => {
  registerGlobalServices(options);

  serviceManager.register("SuccessRateService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new SuccessRateService(api);
  });

  serviceManager.register("WeatherService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new WeatherService(api);
  });
};

export { serviceManager };
