import { LOAD_BUILDINGS, BUILDINGS_LOADED, BUILDING_UPDATE, BUILDING_UPDATED } from "./constants";

export const loadBuildings = () => ({ type: LOAD_BUILDINGS });
export const buildingsLoaded = payload => ({ type: BUILDINGS_LOADED, payload });
export const buildingUpdate = payload => ({ type: BUILDING_UPDATE, payload });
export const buildingUpdated = () => ({ type: BUILDING_UPDATED })
