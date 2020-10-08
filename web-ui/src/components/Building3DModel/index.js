import React from "react";

const Building3DModel = ({ refToSet }) => {
  return (
    <iframe
      title='BuildingModelFrame'
      ref={refToSet}
      src={`${window.location.origin}/locationCounter/QgisBuildingModel`}
      width='100%'
      height='500px'
      frameBorder='0'
    />
  );
};

export default Building3DModel;
