import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Building3DModel from "../../components/Building3DModel";
import { modelRefreshRequest, setupIframeRef } from "./actions";

const Building3DModelContainer = () => {
  const dispatch = useDispatch();
  const iframeRef = useRef(null);
  const { isLoading, error } = useSelector((state) => state.building3DModel);

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

  const refreshModel = () => {
    dispatch(modelRefreshRequest());
  };

  return (
    <Building3DModel refToSet={iframeRef} isLoading={isLoading} error={error} />
  );
};

export default Building3DModelContainer;
