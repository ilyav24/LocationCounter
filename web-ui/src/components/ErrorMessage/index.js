import React from "react";
import { Alert } from "reactstrap";

export const ErrorMessage = ({ error }) => {
  const msg = JSON.stringify(error);
  return error ? <Alert color="danger">{msg}</Alert> : "";
};
