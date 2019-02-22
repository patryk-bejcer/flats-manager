/* eslint-disable react/prop-types */
import React, { Component } from "react";
import "./FlatListHeader.scss";

export default class FlatListHeader extends Component {
  constructor(props) {
    super(props);

    this.headerFields = [
      { id: "name", name: "Nazwa" },
      { id: "number", name: "Numer mieszkania" },
      { id: "price", name: "Cena brutto" },
      { id: "status", name: "Status mieszkania" },
      { id: "stockwerk", name: "Kondygnacja" },
      { id: "area", name: "Powierzchnia" },
      { id: "garden", name: "Ogródek/Strych" },
      { id: "garden_area", name: "Ogródek/Strych" },
      { id: "action", name: "Akcja" }
    ];
  }

  render() {
    const headerFields = this.headerFields.map(field => {
      return (
        <th
          key={field.id}
          scope="col"
          id="title"
          className="manage-column column-title column-primary sortable desc"
        >
          {field.id !== "action" ? (
            <a
              onClick={() => this.props.sortColumn(field.id)}
              title={`Kliknij aby sortować po "${field.name}"`}
            >
              <span>
                {field.name} <i className="fa fa-sort" aria-hidden="true" />
              </span>
              {/* <span className="sorting-indicator" /> */}
            </a>
          ) : null}
        </th>
      );
    });

    return (
      <>
        <thead className="columns-header">
          <tr>{headerFields}</tr>
        </thead>
      </>
    );
  }
}
