import React, { useEffect, useRef } from "react";
import { Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import Building3DModel from "../../components/Building3DModel";
import { modelRefreshRequest, setupIframeRef } from "./actions";

const alertMessage = (color, message) => {
  return (
    <Alert className='m-0 rounded-0 text-center' color={color}>
      {message}
    </Alert>
  );
};

const Building3DModelContainer = () => {
  const dispatch = useDispatch();
  const iframeRef = useRef(null);
  const { isLoading, error } = useSelector((state) => state.building3DModel);
  let alertComponent;

  if (isLoading) alertComponent = alertMessage("info", "Loading...");
  else if (error) alertComponent = alertMessage("danger", error.message);

  const refreshModel = () => dispatch(modelRefreshRequest());

  useEffect(() => {
    dispatch(setupIframeRef(iframeRef));

    iframeRef.current.onload = () => {
      refreshModel();
    };

    const intervalId = window.setInterval(refreshModel, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <React.Fragment>
      {alertComponent}
      <Building3DModel refToSet={iframeRef} />
    </React.Fragment>
  );
};

export default Building3DModelContainer;
