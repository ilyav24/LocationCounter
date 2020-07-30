import {
  USERS_LOADED,
  USER_SELECTED,
  USER_FIELD_CHANGED,
  CLEAR_SELECTED,
  NEW_USER,
  SAVE_ERROR,
} from "./constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  users: [],
  selected: null,
  error: null,
});

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADED:
      const { users } = action;
      return state.merge({ users });
    case USER_SELECTED:
      const { user } = action;
      return state.merge({ selected: user });
    case USER_FIELD_CHANGED:
      const { changes } = action;
      return state.mergeDeep({ selected: changes, error: null });
    case CLEAR_SELECTED:
      return state.merge({ selected: null });
    case NEW_USER:
      return state.merge({
        selected: {
          id: null,
          user_name: "",
          email: "",
          user_type: 1,
        },
      });
    case SAVE_ERROR:
      const { error } = action;
      return state.merge({ error });
    default:
      return state;
  }
}
