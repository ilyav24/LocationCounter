import { put, takeLatest, call, select } from "redux-saga/effects";
import { LOAD_USERS, UPDATE_USER, USER_SAVE } from "./constants";
import { usersLoaded, loadUsers, clearSelected, loadError } from "./actions";

function* loadUsersSaga() {
  try {
    const { data } = yield fetch(
      `${process.env.REACT_APP_BASE_API_URL}/users`
    ).then((response) => response.json());
    yield put(usersLoaded(data));
  } catch (error) {
    yield put(loadError(error));
  }
}

function* updateUserSaga() {
  try {
    const user = yield select((state) => state.usersList.toJS().selected);
    const response = yield call(updateUser, user);
    const { data, errors } = yield response.json();
    if (data) {
      yield put(loadUsers());
    } else {
      throw errors;
    }
  } catch (errors) {
    yield put(loadError(errors));
  }
}

function* createNewUserSaga() {
  try {
    const user = yield select((state) => state.usersList.toJS().selected);
    const response = yield call(postUser, user);
    const { data, errors } = yield response.json();
    if (data) {
      yield put(clearSelected());
      yield put(loadUsers());
    } else {
      throw errors;
    }
  } catch (errors) {
    yield put(loadError(errors));
  }
}

function* userRootSaga() {
  yield takeLatest(LOAD_USERS, loadUsersSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(USER_SAVE, createNewUserSaga);
}

export default [userRootSaga];

function updateUser(body) {
  const { id } = body;
  delete body.id;
  let requestOptions = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(
    `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
    requestOptions
  );
}

function postUser(body) {
  let requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${process.env.REACT_APP_BASE_API_URL}/users`, requestOptions);
}
