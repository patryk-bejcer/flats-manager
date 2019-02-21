/* eslint-disable react/prop-types */
import React from "react";

const SuccessMessage = props => {
  const { alert, type } = props;
  return (
    <div>
      {alert ? (
        <div className="notice notice-success is-dismissible">
          {type === "update" ? "Zapisano pomyślnie" : "Usunięto pomyślnie"}
        </div>
      ) : null}
    </div>
  );
};

export default SuccessMessage;
