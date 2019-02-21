import React, { Component } from "react";
import PropTypes from "prop-types";
import FlatManager from "../components/Admin/FlatManager";
import "./Admin.scss";

export default class Admin extends Component {
  render() {
    return (
      <>
        <FlatManager wpObject={this.props.wpObject} />
      </>
    );
  }
}

Admin.propTypes = {
  wpObject: PropTypes.object
};
