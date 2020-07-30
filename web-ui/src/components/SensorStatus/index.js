import React from "react";
import { Badge } from "reactstrap";

export const StatusBadge = ({ status }) => {
  let text = "ERROR";
  let color = "warning";

  switch (status) {
    case 1:
      text = "ONLINE";
      color = "success";
      break;
    case 2:
      text = "OFFLINE";
      color = "danger";
      break;
    case 3:
      text = "UNKNOWN";
      color = "secondary";
      break;
  }
  return (<Badge color={color}>{text}</Badge>);
};

{
  /* <Badge className="mr-1" color="secondary">Secondary</Badge>
<Badge className="mr-1" color="success">Success</Badge>
<Badge className="mr-1" color="danger">Danger</Badge> */
}
