// @flow
import {
  ASYNC_SUCCESS_INIT,
  INITIALIZE_SUCCESS_INIT,
  HANDLE_NOTIFICATION,
  GET_SUCCESS_RATE_SUCCESS,
} from "actionTypes/successRate";
import Alert from "components/Alert";

function asyncSuccessInit() {
  return {
    type: ASYNC_SUCCESS_INIT,
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

export function initializeSuccessRate() {
  return (dispatch) => {
    dispatch({ INITIALIZE_SUCCESS_INIT });
  };
}

export function getMovieSuccessRate(payload: Object) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncSuccessInit());

    let successRateService = serviceManager.get("SuccessRateService");

    successRateService
      .getMovieSuccessRate(payload)
      .then(({ data }) => {
        dispatch({ type: GET_SUCCESS_RATE_SUCCESS, payload: data.results });
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}
