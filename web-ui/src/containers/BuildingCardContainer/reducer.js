import {
  FIELD_CHANGE,
  BUILDING_CLEAR,
  BUILDING_ERROR,
  BUILDING_CREATE,
} from "./constants";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default function buildingsCardReducer(state = initialState, action) {
  switch (action.type) {
    case FIELD_CHANGE:
      const { building } = action;
      return state.merge(building, { error: null });
    case BUILDING_CLEAR:
      return state.clear();
    case BUILDING_ERROR:
      const { errors } = action;
      return state.merge({ error: errors });
    case BUILDING_CREATE:
      state.clear();
      return state.merge({
        id: "",
        name: "",
        number_of_floors: "",
        capacity: "",
      });
    default:
      return state;
  }
}
