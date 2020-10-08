import {
  LOAD_USERS,
  USERS_LOADED,
  UPDATE_USER,
  USER_SELECTED,
  USER_FIELD_CHANGED,
  USER_SAVE,
  CLEAR_SELECTED,
  NEW_USER,
  SAVE_ERROR,
  USER_UPDATED
} from "./constants";

export const loadUsers = () => ({
  type: LOAD_USERS,
});

export const usersLoaded = (users) => ({
  type: USERS_LOADED,
  users,
});

export const userUpdate = () => ({
  type: UPDATE_USER,
});

export const userSelected = (user) => ({
  type: USER_SELECTED,
  user,
});

export const userFieldChanged = (changes) => ({
  type: USER_FIELD_CHANGED,
  changes,
});

export const saveUser = () => ({
  type: USER_SAVE,
});

export const newUser = () => ({
  type: NEW_USER,
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

export const loadError = (error) => ({
  type: SAVE_ERROR,
  error,
});

export const userUpdated = () => ({
  type: USER_UPDATED,
});