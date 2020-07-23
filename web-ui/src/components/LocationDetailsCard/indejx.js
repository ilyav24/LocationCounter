import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { isNull } from "lodash";

const LocationDetailsCard = ({ location }) => {
  return (
    <div className="animated fadeIn fadeOut">
      <Card>
        <CardHeader>
          <i className="fa icon-layers"></i> <b>Location</b>
        </CardHeader>
        <CardBody>
          {!isNull(location) ? (
            <div>
              <h5>{location.name}</h5>
              <h6>Floor:</h6>
              <p>{location.floor}</p>
              <h6>Room Number:</h6>
              <p>{location.room_num}</p>
              <h6>Entry:</h6>
              <p>{location.entry}</p>
            </div>
          ) : (
            "No location to show"
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LocationDetailsCard;
