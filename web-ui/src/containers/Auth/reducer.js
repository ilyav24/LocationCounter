import { fromJS } from "immutable";
import {
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGOUT_FAILED,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILED,
  AUTHENTICATION_LOGOUT,
} from "./constants";

const initialState = fromJS({
  token: null,
  iat: null,
  exp: null,
  userInfo: {},
  error: null,
  isLoading: false,
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_LOGIN_SUCCESS:
      localStorage.setItem("lc_token", action.payload.token);
      return state.merge({
        error: null,
        iat: action.payload.iat,
        exp: action.payload.exp,
        token: action.payload.token,
        userInfo: action.payload.userInfo,
      });
    case AUTHENTICATION_LOGOUT_FAILED:
      return state.merge({ error: action.error });
    case AUTHORIZATION_REQUEST:
      return state.merge({
        isLoading: true,
      });
    case AUTHORIZATION_SUCCESS:
      return state.merge({
        token: action.payload.token,
        isLoading: false,
        userInfo: action.payload.userInfo,
        iat: action.payload.iat,
        exp: action.payload.exp,
      });
    case AUTHORIZATION_FAILED:
      return removeToken(state);
    case AUTHENTICATION_LOGOUT:
      return removeToken(state);
    default:
      return state;
  }
}

function removeToken(state) {
  localStorage.removeItem("lc_token");
  return state.merge({
    token: null,
    iat: null,
    exp: null,
    userInfo: {},
    isLoading: false,
  });
}
