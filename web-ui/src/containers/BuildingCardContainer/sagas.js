import { takeLatest, select, put, call } from "redux-saga/effects";
import { BUILDING_SAVE, BUILDING_NEW_SAVE } from "./constants";
import { buildingUpdate, buildingUpdated, loadBuildings, } from "../Buildings/actions";
import { onSaveError, buildingClear } from "./actions";
function* saveBuildingSaga() {
  const body = yield select((state) => state.buildingCard.toJS());
  const response = yield call(postBuilding, body);
  const { data, errors } = yield response.json();
  if (data) {
    yield put(buildingUpdate(data));
    yield put(loadBuildings());
    yield put(buildingUpdated())
  } else {
    yield put(onSaveError(errors));
  }
}

function* createBuildingSaga() {
  const body = yield select((state) => state.buildingCard.toJS());
  const response = yield call(createBuilding, body);
  const { data, errors } = yield response.json();
  if (data) {
    yield put(buildingClear());
    yield put(loadBuildings());
    yield put(buildingUpdated())
  } else {
    yield put(onSaveError(errors));
  }
}

function* saveBuildingsRootSaga() {
  yield takeLatest(BUILDING_SAVE, saveBuildingSaga);
}

function* createBuildingsRootSaga() {
  yield takeLatest(BUILDING_NEW_SAVE, createBuildingSaga);
}

export default [saveBuildingsRootSaga, createBuildingsRootSaga];

//TOOD to diffrent file
function postBuilding(body) {
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
  return fetch(`${process.env.REACT_APP_BASE_API_URL}/building/` + id, requestOptions);
}

function createBuilding(body) {
  delete body.id;
  let requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${process.env.REACT_APP_BASE_API_URL}/building/`, requestOptions);
}
