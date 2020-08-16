import { AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILED } from "./constants";

const initialState = {
  token: null,
  userInfo: {},
  error: null,
  // tokenExpiration: null,
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userInfo: action.payload.userInfo,
      };
    case AUTHENTICATION_FAILED:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
