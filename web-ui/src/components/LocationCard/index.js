import React, { useState } from "react";
import _ from "lodash";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CardFooter,
  Button,
} from "reactstrap";
import { ErrorMessage } from "../ErrorMessage";
import { Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
};

export const LocationCard = ({ location, onChange, onSave }) => {
  // const { error } = location;

  let items = () =>
    Array.from({ length: 6 }, () => Math.floor(Math.random() * 40));

  const line = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: items(),
      },
    ],
  };
  return !_.isEmpty(location) ? (
    <>
      <Row>
        <Col>
          <div className="animated fadeIn fadeOut">
            <Card>
              <CardHeader>
                <i className="fa icon-home"></i> <b>{location.name}</b>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        value={location.name}
                        type="text"
                        id="name"
                        onChange={({ target: { value } }) => {
                          onChange({ name: value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Floor</Label>
                      <Input
                        value={location.floor}
                        type="text"
                        id="floor"
                        onChange={({ target: { value } }) => {
                          onChange({ floor: value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Room Number</Label>
                      <Input
                        value={location.room_num}
                        type="text"
                        id="ccnumber"
                        onChange={({ target: { value } }) => {
                          onChange({ room_num: value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Entry</Label>
                      <Input
                        value={location.entry}
                        type="text"
                        id="ccnumber"
                        onChange={({ target: { value } }) => {
                          onChange({ entry: value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* <ErrorMessage error={error} /> */}
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={onSave}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Col>
        <Col>
          <div className="animated fadeIn fadeOut">
            <Card>
              <CardHeader>
                Line Chart
                <div className="card-header-actions">
                  <a
                    href="http://www.chartjs.org"
                    className="card-header-action"
                  >
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Line data={line} options={options} />
                </div>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  ) : (
    ""
  );
};
