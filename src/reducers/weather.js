// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";
import {
  ASYNC_WEATHER_INIT,
  INITIALIZE_WEATHER_INIT,
  HANDLE_NOTIFICATION,
  GET_WEATHER_SUCCESS,
} from "actionTypes/weather";

export type WeatherStateType = {
  notification: NotificationType,
  status: AsyncStatusType,
  weather: null | string,
};

const initialState: WeatherStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  weather: null,
};

function asyncWeatherInit(state: WeatherStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function asyncInitializeWeather(state: WeatherStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.INIT,
    notification: null,
  };
}

function handleNotifications(
  state: WeatherStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
    attributeStatus: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

function getWeatherSuccess(state: SuccessRateStateType, payload) {
  return {
    ...state,
    weather:
      payload && payload.length > 0 ? payload[0].pedicted_result : "Raining",
    status: ASYNC_STATUS.SUCCESS,
  };
}

export default (
  state: SuccessRateStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ASYNC_WEATHER_INIT:
      return asyncWeatherInit(state);
    case INITIALIZE_WEATHER_INIT:
      return asyncInitializeWeather(state);
    case HANDLE_NOTIFICATION:
      return handleNotifications(state, payload);
    case GET_WEATHER_SUCCESS:
      return getWeatherSuccess(state, payload);
    default:
      return state;
  }
};
