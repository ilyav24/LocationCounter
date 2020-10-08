import React from "react";
import { Col } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import USER_TYPES from "../../components/UserType/userTypes";

const UsersTable = ({ users, onSelect, selected }) => {
  const selectedId = selected ? [selected.id] : [];

  const onSelectedRow = (row) => {
    onSelect(row);
  };

  let selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => onSelectedRow(row),
    selected: selectedId,
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
      sort: true,
    },
    {
      dataField: "user_name",
      text: "User Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "user_type",
      text: "User Type",
      sort: true,
      formatter: (cell) => USER_TYPES[cell].name,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  return users ? (
    <Col>
      <BootstrapTable
        hover
        bordered={false}
        keyField="id"
        data={users}
        columns={columns}
        selectRow={selectRow}
        defaultSorted={defaultSorted}
      />
    </Col>
  ) : (
    "No Users to show"
  );
};

export default UsersTable;
