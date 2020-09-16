import {
  AUTHENTICATION_LOGIN_REQUEST,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGOUT_FAILED,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILED,
  AUTHENTICATION_LOGOUT,
} from "./constants";

export const authenticationLoginRequest = (credentials) => {
  return {
    type: AUTHENTICATION_LOGIN_REQUEST,
    credentials,
  };
};

export const authenticationLoginSuccess = (payload) => {
  return {
    type: AUTHENTICATION_LOGIN_SUCCESS,
    payload,
  };
};

export const authenticationLoginFailed = (error) => {
  return {
    type: AUTHENTICATION_LOGOUT_FAILED,
    error,
  };
};

export const authorizationRequest = (token) => {
  return {
    type: AUTHORIZATION_REQUEST,
    token,
  };
};

export const authorizationSuccess = (payload) => {
  return {
    type: AUTHORIZATION_SUCCESS,
    payload,
  };
};

export const authorizationFailed = () => {
  return {
    type: AUTHORIZATION_FAILED,
  };
};

export const authenticationLogout = () => {
  return {
    type: AUTHENTICATION_LOGOUT,
  };
};
