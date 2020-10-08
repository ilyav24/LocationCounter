import {
  LOAD_BUILDING_LOCATIONS,
  LOADED_BUILDING_LOCATIONS,
  LOCATION_SELECTED,
  FIELD_CHANGE,
  UPDATE_LOCATION,
  NEW_LOCATION,
  NEW_LOCATION_SAVE,
  LOCATION_SAVE_ERROR,
  LOCATION_CLEAR,
  LOCATION_SAVED
} from "./constants";

export const loadBuildingLocations = (id) => ({
  type: LOAD_BUILDING_LOCATIONS,
  id,
});
export const buildLocationsLoaded = (payload) => ({
  type: LOADED_BUILDING_LOCATIONS,
  payload,
});

export const locationSelected = (location) => ({
  type: LOCATION_SELECTED,
  location,
});

export const fieldChanged = (location) => ({
  type: FIELD_CHANGE,
  location,
});

export const updateLocation = () => ({
  type: UPDATE_LOCATION,
});

export const newLocation = (buildingId) => ({
  type: NEW_LOCATION,
  buildingId,
});

export const newLocationSaved = () => ({
  type: NEW_LOCATION_SAVE,
});

export const errorSaveLocation = (error) => ({
  type: LOCATION_SAVE_ERROR,
  error,
});

export const locationClear = () => ({
  type: LOCATION_CLEAR,
});

export const locationSaved = () => ({
  type: LOCATION_SAVED,
});

