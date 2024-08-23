import React from "react";

const Alert = ({ error, cls }) => {
  return (
    <div
      className="alert alert-danger align-items-center p-1 justify-content-center w-100"
      style={cls}
      role="alert"
    >
      <div className="px-3">{error}</div>
    </div>
  );
};

export default Alert;
