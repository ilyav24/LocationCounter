import React from "react";
import { Col, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";

export const LocationsTable = ({
  locations,
  onClick,
  selectedLocation,
  onCreate,
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
          <p>No Locations to show.. but you can create one!"</p>
        </div>
      )}
      <Button color="primary" onClick={onCreate}>
        Add new Location
      </Button>
    </div>
  );
};
