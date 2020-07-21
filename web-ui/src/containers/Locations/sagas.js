import { put, takeLatest } from "redux-saga/effects";
import { LOAD_BUILDING_LOCATIONS } from "./constants";
import { buildLocationsLoaded } from "./actions";

function* loadBuildingsSaga(action) {
  try {
    const { id } = action;
    const { data } = yield fetch(
      `http://localhost:5000/building/${id}/location`
    ).then((response) => response.json());
    yield put(buildLocationsLoaded(data));
  } catch (error) {
    //TODO: add action "ERROR LOADINGS"
  }
}

function* locationsRootSaga() {
  yield takeLatest(LOAD_BUILDING_LOCATIONS, loadBuildingsSaga);
}

export default [locationsRootSaga];
