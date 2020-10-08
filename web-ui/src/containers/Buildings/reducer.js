import { LOAD_BUILDINGS, BUILDINGS_LOADED, BUILDING_UPDATED } from "./constants";
import {
  FIELD_CHANGE,
  BUILDING_CREATE,
} from "../BuildingCardContainer/constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  isLoading: true,
  buildings: [],
  selected: null,
  hash: null
});

export default function buildingsReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case LOAD_BUILDINGS:
      return state.merge({ isLoading: true });
    case BUILDINGS_LOADED:
      return state.merge({ isLoading: false, buildings: payload });
    case FIELD_CHANGE:
      const {
        building: { id },
      } = action;
      return state.merge({ selected: id });
    case BUILDING_CREATE:
      return state.merge({ selected: null });
    case BUILDING_UPDATED:
      return state.merge({ hash: Math.random() });
    // this is for the removing the pop up when moving between screens
    case "@@router/LOCATION_CHANGE":
        return state.merge({ hash: null });
    default:
      return state;
  }
}
