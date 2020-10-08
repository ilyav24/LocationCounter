import React, { useState, useEffect } from "react";
import { Modal, ModalBody, Button, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadBuildingLocations, locationSelected } from "../Locations/actions";
import { BuildingsTable } from "../../components/BuildingsTable";
import { loadBuildings } from "../Buildings/actions";
import { LocationsTable } from "../../components/LocationsTable";
import { AttachLocation } from "./actions";

const ChooseLocation = ({ sensor }) => {
  const { sensor_id, location_id } = sensor;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const {
    locations,
    selectedBuilding,
    selectedLocation,
    error,
  } = useSelector((state) => state.locationList.toJS());
  const { buildings } = useSelector((state) => state.buildingsList.toJS());
  const onClickLocation = (location) => dispatch(locationSelected(location));
  const onClickBuilding = ({ id }) => dispatch(loadBuildingLocations(id));
  const onClickAttach = () => {
    dispatch(AttachLocation());
    setShow(!show);
  };
  const toggle = () => setShow(!show);
  useEffect(() => {
    dispatch(loadBuildings());
  }, []);

  const action = (
    <Button
      onClick={onClickAttach}
      color="primary"
      disabled={!selectedLocation}
    >
      Attach to location
    </Button>
  );
  return (
    <>
      <Button size="lg" block onClick={toggle} color="primary">
        Attach to location
      </Button>
      <Modal isOpen={show} size="xl">
        <ModalHeader toggle={toggle}>
          Choose Location for Sensor {sensor_id}
        </ModalHeader>
        <ModalBody>
          <h5>Choose Building:</h5>
          <BuildingsTable
            buildings={buildings}
            onClick={onClickBuilding}
            selected={selectedBuilding}
          />
          <h5>Choose Locations:</h5>
          <LocationsTable
            locations={locations}
            onClick={onClickLocation}
            selectedLocation={selectedLocation}
            action={action}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ChooseLocation;
