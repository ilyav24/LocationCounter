import { put, takeLatest, call } from "redux-saga/effects";
import { AUTHENTICATION_REQUEST, AUTHORIZATION_REQUEST } from "./constants";
import {
    authenticationSuccess,
    authenticationFailed,
    authorizationFailed,
    authorizationSuccess,
} from "./actions";

function* sendCredentialsSaga(action) {
    try {
        const response = yield call(sendCredentials, action.credentials);
        const responseObj = yield response.json();

        if (response.ok) {
            yield put(authenticationSuccess(responseObj));
        } else {
            const error = { message: responseObj.error };
            yield put(authenticationFailed(error));
        }
    } catch (error) {
        const errorObj = {
            message: error.message,
        };

        yield put(authenticationFailed(errorObj));
    }
}
function* verifyTokenSaga(action) {
    try {
        const response = yield call(tokenVerificationRequest, action.token);

        if (response.ok) {
            yield put(authorizationSuccess());
        } else {
            yield put(authorizationFailed());
        }
    } catch (error) {
        //TODO
        yield put(authorizationFailed());
    }
}

function* authenticationRootSaga() {
    yield takeLatest(AUTHENTICATION_REQUEST, sendCredentialsSaga);
    yield takeLatest(AUTHORIZATION_REQUEST, verifyTokenSaga);
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
function tokenVerificationRequest(token) {
    // const url = "http://localhost:5000/api/login";
    const url = "";
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    return fetch(url, requestOptions);
}
