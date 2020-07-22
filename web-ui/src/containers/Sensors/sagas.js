import { put, takeLatest, call } from "redux-saga/effects";
import { LOAD_SENSORS, LOAD_SENSOR_EVENTS } from "./constants";
import { sensorsLoaded, sensorsEventsLoaded } from "./actions";
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
    const { id } = action;
    const response = yield call(getSensorsEvents, id);
    const { data, errors } = yield response.json();
    if (data) {
      yield put(sensorsEventsLoaded(data));
    } else {
      throw errors;
    }
  } catch (errors) {
    //TODO
  }
}

function* sensorsRootSaga() {
  yield takeLatest(LOAD_SENSORS, loadSensorSaga);
  yield takeLatest(LOAD_SENSOR_EVENTS, loadSensorEventSaga);
}

export default [sensorsRootSaga];

function getSensors() {
  return fetch(`http://localhost:5000/sensor`);
}

function getSensorsEvents(id) {
  const body = {
    from: moment().subtract(1, "days"),
    to: moment().add(1,"days"),
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
