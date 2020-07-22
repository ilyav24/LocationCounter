import {
  LOAD_SENSORS,
  SENSORS_LOADED,
  LOAD_SENSOR_EVENTS,
  SENSOR_EVENTS_LOADED,
} from "./constants";

export const loadSensors = () => ({
  type: LOAD_SENSORS,
});

export const sensorsLoaded = (sensors) => ({
  type: SENSORS_LOADED,
  sensors,
});

export const loadSensorsEvents = (id) => ({
  type: LOAD_SENSOR_EVENTS,
  id,
});

export const sensorsEventsLoaded = (events) => ({
  type: SENSOR_EVENTS_LOADED,
  events,
});
