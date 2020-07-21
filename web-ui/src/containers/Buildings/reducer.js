import { LOAD_BUILDINGS, BUILDINGS_LOADED } from "./constants";
import {
  FIELD_CHANGE,
  BUILDING_CREATE,
} from "../BuildingCardContainer/constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  isLoading: true,
  buildings: [],
  selected: null,
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
    default:
      return state;
  }
}
