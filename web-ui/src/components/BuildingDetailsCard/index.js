import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { isNull } from "lodash";

const BuildingDetailsCard = ({ building }) => {
  return (
    <div className="animated fadeIn fadeOut">
      <Card>
        <CardHeader>
          <i className="fa icon-home"></i> <b>Sensor Building</b>
        </CardHeader>
        <CardBody>
        {!isNull(building) ? (<div>
          <h5>{building.name}</h5>
          <h6>Number of floors:</h6>
          <p>{building.number_of_floors}</p>
          <h6>Capacity:</h6>
          <p>{building.capacity}</p></div>) : (
              "No building to show"
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default BuildingDetailsCard;
