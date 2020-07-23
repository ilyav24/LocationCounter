import React from "react"
import {Alert} from 'reactstrap'

export const ErrorMessage = ({error}) => {
    return (error ? <Alert color="danger">
    {error}
  </Alert> : "")
}