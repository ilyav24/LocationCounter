import { fromJS } from "immutable";
import {
  SENSORS_LOADED,
  SENSOR_EVENTS_LOADED,
  LOAD_SENSOR_EVENTS,
  SENSOR_LOCATION_LOADED,
  SENSOR_BUILDING_LOADED,
} from "./constants";

const initialState = fromJS({
  sensors: [],
  events: [],
  selected: null,
  location: null,
  building: null,
});

export default function sensorsReducer(state = initialState, action) {
  switch (action.type) {
    case SENSORS_LOADED:
      const { sensors } = action;
      return state.merge({ sensors });
    case LOAD_SENSOR_EVENTS:
      const { sensor } = action;
      return state.merge({ selected: sensor });
    case SENSOR_EVENTS_LOADED:
      const { events } = action;
      return state.merge({ events });
    case SENSOR_LOCATION_LOADED:
      const { location } = action;
      return state.merge({ location });
    case SENSOR_BUILDING_LOADED:
      const { building } = action;
      return state.merge({ building });
    default:
      return state;
  }
}
