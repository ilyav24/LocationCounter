import React from "react";
import { Col, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
import { LiveCounter } from "../../containers/LiveCounter";

export const LocationsTable = ({
  locations,
  onClick,
  selectedLocation,
  action,
}) => {
  const id = !_.isEmpty(selectedLocation) ? selectedLocation.id : "";

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => onClick(row),
    selected: [id],
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
      sort: true,
    },
    {
      dataField: "id",
      text: "Live Count",
      sort: true,
      formatter: (cell) => <LiveCounter type="location" id={cell} />,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "floor",
      text: "Floor",
      sort: true,
    },
    {
      dataField: "room_num",
      text: "Room Number",
      sort: true,
    },
    {
      dataField: "entry",
      text: "Entry",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  return (
    <div>
      {!_.isEmpty(locations) ? (
        <Col>
          <BootstrapTable
            hover
            bordered={false}
            keyField="id"
            data={locations}
            columns={columns}
            selectRow={selectRow}
            defaultSorted={defaultSorted}
          />
        </Col>
      ) : (
        <div>
          <p>No Locations to show</p>
        </div>
      )}
      {action}
    </div>
  );
};
