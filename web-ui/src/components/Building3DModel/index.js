import React from "react";

const Building3DModel = ({ refToSet, error, isLoading }) => {
  let messageComponent;
  if (isLoading) {
    messageComponent = <span>Loading...</span>;
  } else if (error) {
    messageComponent = <span>{error.message}</span>;
  }

  return (
    <React.Fragment>
      {messageComponent}
      <iframe
        ref={refToSet}
        src='http://localhost:3000/QgisBuildingModel'
        width='100%'
        height='500px'
        frameBorder='0'
      />
    </React.Fragment>
  );
};

export default Building3DModel;
