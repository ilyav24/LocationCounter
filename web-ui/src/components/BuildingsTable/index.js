import React from "react";
import { Col } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { LiveCounter } from "../../containers/LiveCounter";

export const BuildingsTable = (props) => {
  const { buildings, onClick, selected } = props;
  const id = selected ? selected : null;

  const onSelectedRow = (row) => {
    onClick(row);
  };

  let selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => onSelectedRow(row),
    selected: [id],
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
      dataField: "id",
      text: "Live Count",
      sort: true,
      formatter: (cell) => <LiveCounter type="building" id={cell} />
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
        hover
        bordered={false}
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
