import { put, takeLatest, call, select } from "redux-saga/effects";
import { LOAD_SENSORS, LOAD_SENSOR_EVENTS } from "./constants";
import {
  sensorsLoaded,
  sensorsEventsLoaded,
  sensorLocationLoaded,
  sensorBuildingLoaded,
} from "./actions";
import moment from "moment";

function* loadSensorSaga() {
  try {
    const response = yield call(getSensors);
    const { data, errors } = yield response.json();
    if (data) {
      yield put(sensorsLoaded(data));
    } else {
      throw errors;
    }
  } catch (errors) {
    //TODO
  }
}

function* loadSensorEventSaga(action) {
  try {
    const { sensor } = action;
    const { sensor_id, location_id } = sensor;
    const response = yield call(getSensorsEvents, sensor_id);
    const { data, errors } = yield response.json();
    if (data) {
      yield put(sensorsEventsLoaded(data));
      if (location_id) {
        yield call(loadSensorLocationSaga, location_id);
      }
    } else {
      throw errors;
    }
  } catch (errors) {
    //TODO
  }
}

function* loadSensorLocationSaga(location_id) {
  const response = yield call(getLocation, location_id);
  const { data } = yield response.json();
  const { building_id } = data[0];
  yield put(sensorLocationLoaded(data[0]));
  yield call(loadSensorBuilding, building_id);
}

function* loadSensorBuilding(building_id) {
  const response = yield call(getBuilding, building_id);
  const { data } = yield response.json();
  yield put(sensorBuildingLoaded(data[0]));
}

function* sensorsRootSaga() {
  yield takeLatest(LOAD_SENSORS, loadSensorSaga);
  yield takeLatest(LOAD_SENSOR_EVENTS, loadSensorEventSaga);
}

export default [sensorsRootSaga];

function getSensors() {
  return fetch(`http://localhost:5000/sensor`);
}

function getLocation(id) {
  return fetch(`http://localhost:5000/location/${id}`);
}

function getBuilding(id) {
  return fetch(`http://localhost:5000/building/${id}`);
}

function getSensorsEvents(id) {
  const body = {
    from: moment().subtract(1, "days"),
    to: moment().add(1, "days"),
  };

  let requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:5000/sensor/event/${id}`, requestOptions);
}
