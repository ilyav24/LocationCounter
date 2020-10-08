import React from "react";
import { isNull } from "lodash";
import { Badge } from "reactstrap";

export const LocationNotification = ({ location }) => {
  return isNull(location) ? (
    <Badge color="warning">NO LOCATION</Badge>
  ) : (
    ""
  );
};

