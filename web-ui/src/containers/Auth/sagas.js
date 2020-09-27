import { put, takeLatest, call } from "redux-saga/effects";
import {
  AUTHENTICATION_LOGIN_REQUEST,
  AUTHORIZATION_REQUEST,
} from "./constants";
import {
  authenticationLoginSuccess,
  authenticationLoginFailed,
  authorizationSuccess,
  authorizationFailed,
} from "./actions";
import jwt_decode from "jwt-decode";

function* sendCredentialsSaga(action) {
  try {
    const response = yield call(sendCredentials, action.credentials);

    if (response.ok) {
      const responseObj = yield response.json();

      const { token } = responseObj[0];
      const decodedToken = jwt_decode(token);

      const payload = {
        token,
        userInfo: {
          username: action.credentials.username,
        },
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };

      yield put(authenticationLoginSuccess(payload));
    } else {
      const error = { message: "Username or password is incorrect" };
      yield put(authenticationLoginFailed(error));
    }
  } catch (error) {
    const errorObj = { message: "Network error" };

    yield put(authenticationLoginFailed(errorObj));
  }
}

function* verifyTokenSaga(action) {
  try {
    const response = yield call(tokenVerificationRequest, action.token);

    if (response.ok) {
      const { name, iat, exp } = (yield response.json()).userAuth;

      const payload = {
        token: action.token,
        userInfo: { username: name },
        iat,
        exp,
      };

      yield put(authorizationSuccess(payload));
    } else {
      yield put(authorizationFailed());
    }
  } catch (error) {
    // Network error will delete token
    yield put(authorizationFailed());
  }
}

function* authRootSaga() {
  yield takeLatest(AUTHENTICATION_LOGIN_REQUEST, sendCredentialsSaga);
  yield takeLatest(AUTHORIZATION_REQUEST, verifyTokenSaga);
}

export default [authRootSaga];

function sendCredentials(credentials) {
  const url = `${process.env.REACT_APP_BASE_API_URL}/login`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_name: credentials.username,
      pass: credentials.password,
    }),
  };

  return fetch(url, requestOptions);
}

function tokenVerificationRequest(token) {
  const url = `${process.env.REACT_APP_BASE_API_URL}/login/authorization`;
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, requestOptions);
}
