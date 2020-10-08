import React from "react";
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
import { Graph } from "../../containers/GraphContainer";


export const BuildingsCard = ({ building, onChange, onSave }) => {
  const { error } = building;
  return !_.isEmpty(building) ? (
    <>
      <Row>
        <Col>
          <div className="animated fadeIn fadeOut">
            <Card>
              <CardHeader>
                <i className="fa icon-home"></i> <b>{building.name}</b>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        value={building.name}
                        type="text"
                        id="name"
                        onChange={({ target: { value } }) => {
                          onChange({ name: value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Number of floors</Label>
                      <Input
                        value={building.number_of_floors}
                        type="text"
                        id="ccnumber"
                        onChange={({ target: { value } }) => {
                          onChange({ number_of_floors: value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Capacity</Label>
                      <Input
                        value={building.capacity}
                        type="text"
                        id="ccnumber"
                        onChange={({ target: { value } }) => {
                          onChange({ capacity: value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <ErrorMessage error={error} />
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
          <Graph type="building" id={building.id ? building.id : null} />
        </Col>
      </Row>
    </>
  ) : (
      ""
    );
};
