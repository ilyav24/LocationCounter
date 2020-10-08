import {
  LOAD_SENSORS,
  SENSORS_LOADED,
  LOAD_SENSOR_EVENTS,
  LOAD_SENSOR_LOCATION,
  SENSOR_EVENTS_LOADED,
  SENSOR_LOCATION_LOADED,
  SENSOR_BUILDING_LOADED,
  CANCEL_SENSOR_UPDATE, SENSOR_LOCATION_UPDATED
} from "./constants";

export const loadSensors = () => ({
  type: LOAD_SENSORS,
});

export const sensorsLoaded = (sensors) => ({
  type: SENSORS_LOADED,
  sensors,
});

export const loadSensorsEvents = (sensor) => ({
  type: LOAD_SENSOR_EVENTS,
  sensor,
});

export const loadSensorLocation = (location_id) => ({
  type: LOAD_SENSOR_LOCATION,
  location_id,
});

export const sensorsEventsLoaded = (events) => ({
  type: SENSOR_EVENTS_LOADED,
  events,
});

export const sensorLocationLoaded = (location) => ({
  type: SENSOR_LOCATION_LOADED,
  location,
});

export const sensorBuildingLoaded = (building) => ({
  type: SENSOR_BUILDING_LOADED,
  building,
});

export const cancelLoadSensors = () => ({
  type: CANCEL_SENSOR_UPDATE,
});

export const sensorLocationUpdated = () => ({
  type: SENSOR_LOCATION_UPDATED,
});
