// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";
import {
  ASYNC_SUCCESS_INIT,
  INITIALIZE_SUCCESS_INIT,
  HANDLE_NOTIFICATION,
  GET_SUCCESS_RATE_SUCCESS,
} from "actionTypes/successRate";

export type SuccessRateStateType = {
  notification: NotificationType,
  status: AsyncStatusType,
  successRate: null | string,
};

const initialState: SuccessRateStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  successRate: null,
};

function asyncSuccessRateInit(state: SuccessRateStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function asyncInitializeSuccessRateInit(state: SuccessRateStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.INIT,
    notification: null,
  };
}

function handleNotifications(
  state: SuccessRateStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
    attributeStatus: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

function getSuccessRateSuccess(state: SuccessRateStateType, payload) {
  return {
    ...state,
    successRate:
      payload && payload.length > 0
        ? parseFloat(payload[0].pedicted_result * 100).toFixed(2)
        : 56,
    status: ASYNC_STATUS.SUCCESS,
  };
}

export default (
  state: SuccessRateStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ASYNC_SUCCESS_INIT:
      return asyncSuccessRateInit(state);
    case INITIALIZE_SUCCESS_INIT:
      return asyncInitializeSuccessRateInit(state);
    case HANDLE_NOTIFICATION:
      return handleNotifications(state, payload);
    case GET_SUCCESS_RATE_SUCCESS:
      return getSuccessRateSuccess(state, payload);
    default:
      return state;
  }
};
