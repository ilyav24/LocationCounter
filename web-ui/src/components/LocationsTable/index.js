import React, { useState } from "react";
import { Col } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";

export const LocationsTable = (props) => {
  const { locations, onClick, onClear, selectedLocation } = props;
  const id = !_.isEmpty(selectedLocation) ? selectedLocation.id : "";
  const [selected, setSelectedKey] = useState(id);

  const onSelectedRow = (location) => {
    setSelectedKey(location.id);
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => onSelectedRow(row),
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

  return !_.isEmpty(locations) ? (
    <Col>
      <BootstrapTable
        keyField="id"
        data={locations}
        columns={columns}
        selectRow={selectRow}
        defaultSorted={defaultSorted}
      />
    </Col>
  ) : (
    "No Locations to show"
  );
};
