import { fromJS } from "immutable";
import {
  SENSORS_LOADED,
  SENSOR_EVENTS_LOADED,
  LOAD_SENSOR_EVENTS,
} from "./constants";

const initialState = fromJS({
  sensors: [],
  events: [],
  selected: null,
});

export default function sensorsReducer(state = initialState, action) {
  switch (action.type) {
    case SENSORS_LOADED:
      const { sensors } = action;
      return state.merge({ sensors });
    case LOAD_SENSOR_EVENTS:
      const { id } = action;
      return state.merge({ selected: id });
    case SENSOR_EVENTS_LOADED:
      const { events } = action;
      return state.merge({ events });
    default:
      return state;
  }
}
