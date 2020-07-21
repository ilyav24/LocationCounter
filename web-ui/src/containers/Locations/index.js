import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Button, Collapse } from "reactstrap";
import _ from "lodash";

import { BuildingsTable } from "../../components/BuildingsTable";
import { loadBuildings } from "../Buildings/actions";
import { LocationsTable } from "../../components/LocationsTable";
import { loadBuildingLocations } from "./actions";
import { LocationCard } from "../../components/LocationCard";

const Locations = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { locationList } = useSelector((state) => state);
  const { locations, selectedBuilding } = locationList.toJS();
  const { buildingsList } = useSelector((state) => state);
  const { buildings } = buildingsList.toJS();

  useEffect(() => {
    dispatch(loadBuildings());
  }, []);

  const onClick = ({ id }) => {
    dispatch(loadBuildingLocations(id));
    setOpen(false);
  };
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
              onClick={onClick}
              selected={selectedBuilding}
            />
          </CardBody>
        </Collapse>
      </Card>
      <Card>
        <CardHeader>
          <i className="fa icon-layers"></i> Locations
        </CardHeader>
        <CardBody>
          <LocationsTable locations={locations} />
        </CardBody>
      </Card>
      <LocationCard location={locations[0]} />
    </div>
  );
};

export default Locations;
