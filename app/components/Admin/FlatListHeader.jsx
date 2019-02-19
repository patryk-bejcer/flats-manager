import React, { Component } from "react";
import "./FlatListHeader.scss";

export default class FlatListHeader extends Component {
  constructor(props) {
    super(props);

    this.headerFields = [
      { id: "number", name: "Numer mieszkania" },
      { id: "price", name: "Cena brutto" },
      { id: "status", name: "Status mieszkania" },
      { id: "stockwerk", name: "Kondygnacja" },
      { id: "area", name: "Powierzchnia użytkowa" },
      { id: "garden", name: "Ogródek/Strych" },
      { id: "garden_area", name: "Pow. (ogródek / strych)" },
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
          <a onClick={() => this.props.filterColumn(field.id)}>
            <span>{field.name}</span>
            <span className="sorting-indicator" />
          </a>
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
