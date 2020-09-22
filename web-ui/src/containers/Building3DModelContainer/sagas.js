import { takeLatest, select, put, call } from "redux-saga/effects";
import { REFRESH_MODEL_REQUEST } from "./constants";
import { modelRefreshFailed, modelRefreshSuccess } from "./actions";
import _ from "lodash";

function* buildRoomCountTableSaga(allLocations) {
  const roomCountTable = {};

  try {
    const ISODate = new Date().toISOString();
    for (let location of allLocations) {
      const response = yield call(
        fetchLocationPeopleCount,
        location.id,
        ISODate
      );

      if (response.ok) {
        const data = yield response.json();
        const roomId = `${location.room_num}-${location.building_id}`;
        roomCountTable[roomId] = data.data[0].num;
      }
    }
  } catch (error) {
    throw error;
  }

  return roomCountTable;
}

function* refreshModelSaga() {
  try {
    const response = yield call(fetchAllLocations);

    if (response.ok) {
      const { data } = yield response.json();
      const roomCountTable = yield call(buildRoomCountTableSaga, data);

      if (_.isEmpty(roomCountTable)) {
        const error = {
          message: "Missing data...",
        };

        yield put(modelRefreshFailed(error));
      } else {
        // send message to iframe through postMessage API to update
        const { iframeRef } = yield select((state) => state.building3DModel);

        iframeRef.current.contentWindow.postMessage(
          roomCountTable,
          window.location.origin
        );

        yield put(modelRefreshSuccess());
      }
    }
  } catch (e) {
    const error = {
      message: "Network error...",
    };

    yield put(modelRefreshFailed(error));
  }
}

function* building3DModelRootSaga() {
  yield takeLatest(REFRESH_MODEL_REQUEST, refreshModelSaga);
}

export default [building3DModelRootSaga];

function fetchLocationPeopleCount(locationId, toDate) {
  const url = `${process.env.REACT_APP_BASE_API_URL}/stats/location/${locationId}`;
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: toDate,
    }),
  };

  return fetch(url, requestOptions);
}

function fetchAllLocations() {
  const url = `${process.env.REACT_APP_BASE_API_URL}/location`;
  return fetch(url);
}
