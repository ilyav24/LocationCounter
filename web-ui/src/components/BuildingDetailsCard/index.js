import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { isNull } from "lodash";

const BuildingDetailsCard = ({ building }) => {
  return !isNull(building) ? (
    <div className="animated fadeIn fadeOut">
      <Card>
        <CardHeader>
          <i className="fa icon-home"></i> <b>{building.name}</b>
        </CardHeader>
        <CardBody>
          <h6>Number of floors:</h6>
          <p>{building.number_of_floors}</p>
          <h6>Capacity:</h6>
          <p>{building.capacity}</p>
        </CardBody>
      </Card>
    </div>
  ) : (
    ""
  );
};

export default BuildingDetailsCard;
