// @flow
import {
  ASYNC_WEATHER_INIT,
  INITIALIZE_WEATHER_INIT,
  HANDLE_NOTIFICATION,
  GET_WEATHER_SUCCESS,
} from "actionTypes/weather";
import Alert from "components/Alert";

function asyncWeatherInit() {
  return {
    type: ASYNC_WEATHER_INIT,
  };
}

function notificationHandler(isSuccess, message) {
  return {
    type: HANDLE_NOTIFICATION,
    payload: {
      isSuccess,
      notification: {
        type: isSuccess ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR,
        message,
      },
    },
  };
}

export function initializeWeatherRate() {
  return (dispatch) => {
    dispatch({ INITIALIZE_WEATHER_INIT });
  };
}

export function getWeatherRate(payload: Object) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncWeatherInit());

    let weatherService = serviceManager.get("WeatherService");

    weatherService
      .getWeather(payload)
      .then(({ data }) => {
        dispatch({ type: GET_WEATHER_SUCCESS, payload: data.results });
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}
