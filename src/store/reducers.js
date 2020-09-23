// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import success, { type SuccessRateStateType } from "reducers/successRate";
import weather, { type WeatherStateType } from "reducers/weather";

export type ApplicationState = {
  success: SuccessRateStateType,
  weather: WeatherStateType,
};

export default (history: History) =>
  combineReducers({
    success,
    weather,
    router: connectRouter(history),
  });
