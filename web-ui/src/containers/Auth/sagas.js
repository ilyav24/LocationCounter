import { put, takeLatest, call, select } from "redux-saga/effects";
import {
    AUTHENTICATION_REQUEST,
    AUTHORIZATION_REQUEST,
    LOGOUT_REQUEST,
} from "./constants";
import {
    authenticationSuccess,
    authenticationFailed,
    authorizationFailed,
    authorizationSuccess,
    logoutSuccess,
    logoutFailed,
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

function* logoutSaga() {
    const token = yield select((state) => state.auth.token);
    console.log(token);
    try {
        const response = yield call(logoutRequest, token);

        if (response.ok) {
            yield put(logoutSuccess());
        } else {
            const errorObj = yield response.json;
            yield put(logoutFailed(errorObj));
        }
    } catch (error) {
        yield put(logoutFailed({ message: error.message }));
    }
}

function* authRootSaga() {
    yield takeLatest(AUTHENTICATION_REQUEST, sendCredentialsSaga);
    yield takeLatest(AUTHORIZATION_REQUEST, verifyTokenSaga);
    yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

export default [authRootSaga];

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

function logoutRequest(token) {
    // const url = "http://localhost:5000/api/logout";
    const url = "https://reqres.in/api/logi";
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return fetch(url, requestOptions);
}
