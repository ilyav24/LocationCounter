import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import SensorsTable from "../../components/SensorsTable";
import SensorEventList from "../../components/SensorEventList";
import { loadSensors, loadSensorsEvents } from "./actions";

const Sensors = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSensors());
  }, []);

  const { sensors, events, selected } = useSelector((state) =>
    state.sensorsList.toJS()
  );
  const onSelect = (id) => dispatch(loadSensorsEvents(id));
  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="cui-location-pin"></i> Sensors
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
      </Row>
    </div>
  );
};

export default Sensors;
