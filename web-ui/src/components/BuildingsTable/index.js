import React, { useState } from "react";
import { Col } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";

export const BuildingsTable = (props) => {
  const { buildings, onClick, onClear, selected } = props;
  const id = selected ? selected : null;
  const [selectedId, setSelectedKey] = useState([id]);

  const onSelectedRow = (row) => {
    setSelectedKey(row.id);
    onClick(row);
  };

  let selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => onSelectedRow(row),
    selected: [selectedId],
  };
  
  if (id == null) {
    selectRow.selected = [];
  }
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
      dataField: "number_of_floors",
      text: "Number of floors",
      sort: true,
    },
    {
      dataField: "capacity",
      text: "Capacity",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  return buildings ? (
    <Col>
      <BootstrapTable
        keyField="id"
        data={buildings}
        columns={columns}
        selectRow={selectRow}
        defaultSorted={defaultSorted}
      />
    </Col>
  ) : (
    "No Building to show"
  );
};
