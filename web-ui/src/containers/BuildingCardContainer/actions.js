import {
  FIELD_CHANGE,
  BUILDING_CLEAR,
  BUILDING_SAVE,
  BUILDING_ERROR,
  BUILDING_CREATE,
  BUILDING_NEW_SAVE,
} from "./constants";

export const buildingChange = (building) => ({
  type: FIELD_CHANGE,
  building,
});

export const buildingClear = () => ({
  type: BUILDING_CLEAR,
});

export const onSaveAction = () => ({
  type: BUILDING_SAVE,
});

export const onCreateAction = () => ({
  type: BUILDING_CREATE,
});

export const onCreateSave = () => ({
  type: BUILDING_NEW_SAVE,
});

//TODO: renmae
export const onSaveError = (errors) => ({
  type: BUILDING_ERROR,
  errors,
});


