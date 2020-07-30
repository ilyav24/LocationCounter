import { put, takeLatest, select, call } from "redux-saga/effects";
import {
  LOAD_BUILDING_LOCATIONS,
  UPDATE_LOCATION,
  NEW_LOCATION_SAVE,
} from "./constants";
import {
  buildLocationsLoaded,
  loadBuildingLocations,
  errorSaveLocation,
  locationClear,
} from "./actions";

function* loadBuildingsSaga() {
  try {
    const id = yield select(
      (state) => state.locationList.toJS().selectedBuilding
    );

    const { data } = yield fetch(
      `http://localhost:5000/building/${id}/location`
    ).then((response) => response.json());
    yield put(buildLocationsLoaded(data));
  } catch (error) {
    yield put(errorSaveLocation("Failed to load locations"));
  }
}

function* saveNewLocationSaga() {
  try {
    const location = yield select(
      (state) => state.locationList.toJS().selectedLocation
    );

    const buildingId = yield select(
      (state) => state.locationList.toJS().selectedBuilding
    );

    const response = yield call(newLocation, location);
    const { data, errors } = yield response.json();
    if (data) {
      yield put(loadBuildingLocations(buildingId));
      yield put(locationClear());
    } else {
      throw errors;
    }
  } catch (errors) {
    yield put(errorSaveLocation("Failed to save new location"));
  }
}

function* updateLocationSave() {
  try {
    const location = yield select(
      (state) => state.locationList.toJS().selectedLocation
    );

    const response = yield call(postLocation, location);
    const { data, errors } = yield response.json();
    if (data) {
      yield put(loadBuildingLocations(location.building_id));
    } else {
      throw errors;
    }
  } catch (errors) {
    yield put(errorSaveLocation("Failed to update the location"));
  }
}


function* locationsRootSaga() {
  yield takeLatest(LOAD_BUILDING_LOCATIONS, loadBuildingsSaga);
  yield takeLatest(NEW_LOCATION_SAVE, saveNewLocationSaga);
  yield takeLatest(UPDATE_LOCATION, updateLocationSave);
}


export default [locationsRootSaga];

function postLocation(body) {
  const { id } = body;
  delete body.id;
  console.log(body);
  let requestOptions = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:5000/location/${id}`, requestOptions);
}

function newLocation(body) {
  delete body.id;
  let requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:5000/location/`, requestOptions);
}
