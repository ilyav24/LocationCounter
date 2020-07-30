import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import SensorEntry from "../SensorEntry";
import { isEmpty } from "lodash";

const SensorEventList = ({ events }) => {
  const columns = [
    {
      dataField: "sensor_id",
      text: "",
      sort: true,
      formatter: (cell, row) => <SensorEntry event={row} />,
      headerAttrs: {
        hidden: true,
      },
    },
  ];

  const options = {
    hideSizePerPage: true,
    paginationSize: 3,
    sizePerPage: 7,
  };

  return (
    <Col>
      <Card>
        <CardHeader>
          <i className="cui-location-pin"></i>
          <b>Events</b>
        </CardHeader>
        <CardBody>
          {!isEmpty(events) ? (
            <BootstrapTable
              bordered={false}
              keyField="Events"
              data={events}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          ) : (
            "This sensor has no recorded events"
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default SensorEventList;
