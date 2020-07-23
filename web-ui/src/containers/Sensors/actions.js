import {
  LOAD_SENSORS,
  SENSORS_LOADED,
  LOAD_SENSOR_EVENTS,
  SENSOR_EVENTS_LOADED,
  SENSOR_LOCATION_LOADED,
  SENSOR_BUILDING_LOADED,
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
