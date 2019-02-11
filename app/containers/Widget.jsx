/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Widget extends Component {
  state = {
    pages: null
  };

  componentDidMount() {
    fetch(this.props.wpObject.api_url)
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.setState({
          pages: response
        });
      });
  }

  render() {
    let pagesList = null;
    if (this.state.pages) {
      pagesList = this.state.pages.value.map(page => (
        <li key={page.ID}>{page.post_title}</li>
      ));
    } else {
      pagesList = null;
    }

    return (
      <div>
        <h4>{this.props.wpObject.title}</h4>
        <ul>{pagesList}</ul>
      </div>
    );
  }
}

Widget.propTypes = {
  wpObject: PropTypes.object
};
