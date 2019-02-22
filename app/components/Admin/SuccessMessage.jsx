/* eslint-disable react/prop-types */
import React from "react";

const SuccessMessage = props => {
  const { alert, type } = props;
  return (
    <div>
      {alert ? (
        <div className="notice notice-success is-dismissible">
          {type === "update" ? "Zapisano pomyślnie" : null}
          {type === "create" ? "Dodano nowe mieszkanie" : null}
          {type === "remove" ? "Usunięto pomyślnie" : null}
        </div>
      ) : null}
    </div>
  );
};

export default SuccessMessage;
