import {
  LOADED_BUILDING_LOCATIONS,
  LOAD_BUILDING_LOCATIONS,
  LOCATION_SELECTED,
  FIELD_CHANGE,
  NEW_LOCATION,
  LOCATION_SAVE_ERROR,
  LOCATION_CLEAR,
} from "./constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  isLoading: true,
  locations: [],
  selectedBuilding: null,
  selectedLocation: null,
  error: null,
});

export default function locationsReducer(state = initialState, action) {
  const { payload } = action;
  const { location } = action;
  switch (action.type) {
    case LOADED_BUILDING_LOCATIONS:
      return state.merge({ locations: payload });
    case LOAD_BUILDING_LOCATIONS:
      const { id } = action;
      return state.merge({ selectedBuilding: id });
    case LOCATION_SELECTED:
      return state.merge({ selectedLocation: location });
    case FIELD_CHANGE:
      return state.mergeDeep({ selectedLocation: location, error: null });
    case NEW_LOCATION:
      const { buildingId } = action;
      const emptyLocation = {
        id: "",
        name: "",
        building_id: buildingId,
        floor: "",
        room_num: "",
        entry: "",
      };
      return state.merge({ selectedLocation: emptyLocation });
    case LOCATION_CLEAR:
      return state.merge({ selectedLocation: null });
    case LOCATION_SAVE_ERROR:
      const { error } = action;
      return state.merge({ error: error });
    default:
      return state;
  }
}