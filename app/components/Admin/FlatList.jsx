/* eslint-disable react/prop-types */
import React, { Component } from "react";
import FlatListHeader from "./FlatListHeader";
import "../../scss/FlatList.scss";
import FlatListElement from "./FlatListElement";

export default class FlatList extends Component {
  render() {
    const { changeInput, changePostStatus, save, remove } = this.props;
    let flats = this.props.flats.filter(
      flat => flat.post_title !== "MIESZKANIA"
    );
    flats = flats.map(flat => (
      <tr className="single-flat-list-element" key={flat.ID}>
        <FlatListElement
          flat={flat}
          save={save}
          changeInput={changeInput}
          changePostStatus={changePostStatus}
          remove={remove}
        />
      </tr>
    ));
    return (
      <>
        <table className="wp-list-table widefat striped flats-list-table">
          <FlatListHeader sortColumn={this.props.sortColumn} />
          <tbody id="the-list">{flats}</tbody>
        </table>
      </>
    );
  }
}
