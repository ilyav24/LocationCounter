import { put, takeLatest, call } from "redux-saga/effects";
import { AUTHENTICATION_REQUEST } from "./constants";
import { authenticationSuccess, authenticationFailed } from "./actions";

function* sendCredentialsSaga(action) {
  try {
    const response = yield call(sendCredentials, action.credentials);
    const responseObj = yield response.json();

    if (response.ok) {
      yield put(authenticationSuccess(responseObj));
    } else {
      yield put(authenticationFailed(responseObj));
    }
  } catch (error) {
    const errorObj = {
      message: error.message,
    };

    yield put(authenticationFailed(errorObj));
  }
}

function* authenticationRootSaga() {
  yield takeLatest(AUTHENTICATION_REQUEST, sendCredentialsSaga);
}

export default [authenticationRootSaga];

function sendCredentials(credentials) {
  // const url = "http://localhost:5000/api/login";
  const url = "https://reqres.in/api/login";
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  return fetch(url, requestOptions);
}
