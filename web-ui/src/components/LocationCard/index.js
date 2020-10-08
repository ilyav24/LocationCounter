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
import { Graph } from "../../containers/GraphContainer";





export const LocationCard = ({ location, onChange, onSave }) => {

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
          <Graph type="location" id={location.id ? location.id : null} />
        </Col>
      </Row>
    </>
  ) : (
      ""
    );
};
