import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import SensorsTable from "../../components/SensorsTable";
import SensorEventList from "../../components/SensorEventList";
import { cancelLoadSensors, loadSensors, loadSensorsEvents } from "./actions";
import LocationDetailsCard from "../../components/LocationDetailsCard";
import BuildingDetailsCard from "../../components/BuildingDetailsCard";
import { isNull } from "lodash";
import ChooseLocation from "../LocationAttachContainer";
import { SaveToast } from "../../components/Toast";

const Sensors = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSensors());
    return () =>
      dispatch(cancelLoadSensors())
  }, []);

  const {
    sensors,
    events,
    selected,
    location,
    building,
    hash
  } = useSelector((state) => state.sensorsList.toJS());
  const onSelect = (sensor) => dispatch(loadSensorsEvents(sensor));
  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <b>
                {" "}
                <i className="cui-location-pin"></i> Sensors
              </b>
            </CardHeader>
            <CardBody>
              <SensorsTable
                sensors={sensors}
                onSelect={onSelect}
                selected={selected}
              />
            </CardBody>
          </Card>
        </Col>
        <SensorEventList events={events} />
        <Col>
          <SaveToast id={hash} />
          {!isNull(location) ? (
            <>
              <LocationDetailsCard location={location} />
              <BuildingDetailsCard building={building} />
            </>
          ) : (
              ""
            )}
          {!isNull(selected) ? <ChooseLocation sensor={selected} /> : ""}
        </Col>
      </Row>
    </div>
  );
};

export default Sensors;
