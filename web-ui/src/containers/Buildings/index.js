import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Row, Button } from "reactstrap";
import { BuildingsTable } from "../../components/BuildingsTable";
import { useDispatch, useSelector } from "react-redux";
import { loadBuildings } from "./actions";
import {
  buildingChange,
  buildingClear,
  onCreateAction,
} from "../BuildingCardContainer/actions";
import { BuildingCard } from "../BuildingCardContainer";
import { SaveToast } from "../../components/Toast";

const Buildings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBuildings());
  }, []);

  //TODO: use effect instead of functions

  const onBuildingSelect = (building) => dispatch(buildingChange(building));
  const onClear = () => dispatch(buildingClear());
  const onCreate = () => dispatch(onCreateAction());
  const { buildingsList } = useSelector((state) => state);
  const { buildings, selected, hash } = buildingsList.toJS();
  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="fa icon-home"></i> Buildings
          </CardHeader>
        <CardBody>
          <BuildingsTable
            buildings={buildings}
            onClick={onBuildingSelect}
            onClear={onClear}
            selected={selected}
          />
          <Button color="primary" onClick={onCreate}>
            Create Building
            </Button>
        </CardBody>
      </Card>
      <SaveToast id={hash} />
      <BuildingCard />
    </div>
  );
};

export default Buildings;
