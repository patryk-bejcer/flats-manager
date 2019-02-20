/* eslint-disable react/prop-types */
import React from "react";

const SuccessMessage = props => {
  const { alert, type } = props;
  return (
    <div>
      {alert ? (
        <div className="notice notice-success is-dismissible">
          Zapisano pomyślnie
        </div>
      ) : null}
    </div>
  );
};

export default SuccessMessage;
