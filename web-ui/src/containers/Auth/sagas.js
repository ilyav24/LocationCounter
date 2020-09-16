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
    const responseObj = yield response.json();

    if (response.ok) {
      const { token } = responseObj[0];
      const decodedToken = jwt_decode(token);

      const payload = {
        token,
        userInfo: {
          username: action.credentials.email,
        },
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };
      yield put(authenticationLoginSuccess(payload));
    } else {
      const error = { message: responseObj.error };
      yield put(authenticationLoginFailed(error));
    }
  } catch (error) {
    const errorObj = {
      message: error.message,
    };
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
    //TODO
    yield put(authorizationFailed());
  }
}

function* authRootSaga() {
  yield takeLatest(AUTHENTICATION_LOGIN_REQUEST, sendCredentialsSaga);
  yield takeLatest(AUTHORIZATION_REQUEST, verifyTokenSaga);
}

export default [authRootSaga];

function sendCredentials(credentials) {
  const url = "http://localhost:5000/login";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_name: credentials.email,
      pass: credentials.password,
    }),
  };

  return fetch(url, requestOptions);
}

function tokenVerificationRequest(token) {
  const url = "http://localhost:5000/login/authorization";
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, requestOptions);
}
