import { put, takeLatest } from "redux-saga/effects";
import { LOAD_BUILDINGS } from "./constants";
import { buildingsLoaded } from "./actions";

function* loadBuildingsSaga() {
  try {
    const { data } = yield fetch(
      `${process.env.REACT_APP_BASE_API_URL}/building`
    ).then((response) => response.json());
    yield put(buildingsLoaded(data));
  } catch (error) {
    //TODO: add action "ERROR LOADINGS"
  }
}

function* buildingsRootSaga() {
  yield takeLatest(LOAD_BUILDINGS, loadBuildingsSaga);
}

export default [buildingsRootSaga];
