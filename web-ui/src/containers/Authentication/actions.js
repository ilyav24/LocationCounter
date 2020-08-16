import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
} from "./constants";

export const authenticationRequest = (credentials) => {
  return {
    type: AUTHENTICATION_REQUEST,
    credentials,
  };
};

export const authenticationSuccess = (payload) => {
  return {
    type: AUTHENTICATION_SUCCESS,
    payload,
  };
};

export const authenticationFailed = (error) => {
  return {
    type: AUTHENTICATION_FAILED,
    error,
  };
};
