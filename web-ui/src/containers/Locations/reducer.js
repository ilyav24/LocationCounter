import {
  LOADED_BUILDING_LOCATIONS,
  LOAD_BUILDING_LOCATIONS,
} from "./constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  isLoading: true,
  locations: [],
  selectedBuilding: null,
  selectedLocation: null,
});

export default function locationsReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case LOADED_BUILDING_LOCATIONS:
      return state.merge({ locations: payload });
    case LOAD_BUILDING_LOCATIONS:
      const { id } = action;
      return state.merge({ selectedBuilding: id });
    default:
      return state;
  }
}
