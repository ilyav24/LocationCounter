import {
  LOAD_BUILDING_LOCATIONS,
  LOADED_BUILDING_LOCATIONS,
} from "./constants";

export const loadBuildingLocations = (id) => ({
  type: LOAD_BUILDING_LOCATIONS,
  id,
});
export const buildLocationsLoaded = (payload) => ({
  type: LOADED_BUILDING_LOCATIONS,
  payload,
});
