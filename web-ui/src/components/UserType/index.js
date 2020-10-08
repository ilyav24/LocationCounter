import React from "react";
import USER_TYPES from "./userTypes";
import { Label, FormGroup, Input } from "reactstrap";

export const UserTypeSelector = ({ value, onChange }) => {
  return (
    <FormGroup>
      <Label>User Type</Label>
      <Input type="select" value={value} onChange={onChange}>
        {USER_TYPES.map((type, index) => {
          return <option value={index}>{type.name}</option>;
        })}
      </Input>
    </FormGroup>
  );
};
