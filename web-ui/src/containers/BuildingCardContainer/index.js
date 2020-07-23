import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BuildingsCard } from "../../components/BuildingCard";
import { buildingChange, onSaveAction, onCreateSave } from "./actions";

export const BuildingCard = () => {
  const dispatch = useDispatch();
  const { buildingCard } = useSelector((state) => state);
  const onChange = (value) => dispatch(buildingChange(value));
  const onSave = () => {
    dispatch(onSaveAction());
  };
  const onCreate = () => dispatch(onCreateSave());
  const building = buildingCard.toJS();
  const { id } = building;
  const action = id === "" ? onCreate : onSave;
  return (
    <BuildingsCard building={building} onChange={onChange} onSave={action} />
  );
};
//TODO: use effect instead of functions
