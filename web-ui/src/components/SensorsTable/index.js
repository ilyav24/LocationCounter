import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { StatusBadge } from "../SensorStatus";
import { isNull } from "lodash";

const SensorsTable = ({ sensors, onSelect, selected }) => {
  const id = selected?.sensor_id;
  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => onSelect(row),
    selected: [id],
  };

  const columns = [
    {
      dataField: "sensor_id",
      text: "#",
      sort: true,
    },
    {
      dataField: "sensor_status",
      text: "Status",
      formatter: (cell) => <StatusBadge status={cell} />,
    },
  ];

  const defaultSorted = [
    {
      dataField: "sensor_id",
      order: "asc",
    },
  ];

  return (
    <BootstrapTable
      hover
      bordered={false}
      keyField="sensor_id"
      data={sensors}
      columns={columns}
      defaultSorted={defaultSorted}
      selectRow={selectRow}
    />
  );
};

export default SensorsTable;
