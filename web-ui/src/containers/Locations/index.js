import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Button, Collapse } from "reactstrap";
import _ from "lodash";

import { BuildingsTable } from "../../components/BuildingsTable";
import { loadBuildings } from "../Buildings/actions";
import { LocationsTable } from "../../components/LocationsTable";
import {
  loadBuildingLocations,
  locationSelected,
  fieldChanged,
  updateLocation,
  newLocation,
  newLocationSaved,
} from "./actions";
import { LocationCard } from "../../components/LocationCard";
import { ErrorMessage } from "../../components/ErrorMessage";

const Locations = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const {
    locations,
    selectedBuilding,
    selectedLocation,
    error,
  } = useSelector((state) => state.locationList.toJS());
  const { buildings } = useSelector((state) => state.buildingsList.toJS());

  useEffect(() => {
    dispatch(loadBuildings());
  }, []);

  const onClickBuilding = ({ id }) => {
    dispatch(loadBuildingLocations(id));
    setOpen(false);
  };

  const onClickLocation = (location) => dispatch(locationSelected(location));
  const onChange = (location) => dispatch(fieldChanged(location));
  const onUpdate = () => dispatch(updateLocation());
  const onCreate = () => dispatch(newLocation(selectedBuilding));
  const onCreateNew = () => dispatch(newLocationSaved());
  const onSave = selectedLocation?.id === "" ? onCreateNew : onUpdate;

  const { name } = selectedBuilding
    ? buildings[_.findIndex(buildings, ["id", selectedBuilding])]
    : "";

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="fa icon-home"></i>{" "}
          {name ? (
            <span>
              Selected Building: <b>{name}</b>
            </span>
          ) : (
            <span>Choose Location</span>
          )}
          <div className="card-header-actions">
            <Button size="sm" color="primary" onClick={() => setOpen(!open)}>
              Choose Building
            </Button>
          </div>
        </CardHeader>
        <Collapse isOpen={open}>
          <CardBody>
            <BuildingsTable
              buildings={buildings}
              onClick={onClickBuilding}
              selected={selectedBuilding}
            />
          </CardBody>
        </Collapse>
      </Card>
      {selectedBuilding ? (
        <Card>
          <CardHeader>
            <i className="fa icon-layers"></i> Locations
          </CardHeader>
          <CardBody>
            <LocationsTable
              locations={locations}
              onClick={onClickLocation}
              selectedLocation={selectedLocation}
              onCreate={onCreate}
            />
          </CardBody>
        </Card>
      ) : (
        ""
      )}
      <ErrorMessage error={error} />
      <LocationCard
        location={selectedLocation}
        onChange={onChange}
        onSave={onSave}
      />
    </div>
  );
};

export default Locations;
