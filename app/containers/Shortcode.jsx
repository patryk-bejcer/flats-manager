/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Review from "../components/Review";

export default class Shortcode extends Component {
  state = {
    reviews: null,
    load: true
  };

  componentDidMount() {
    // eslint-disable-next-line no-undef
    fetch(this.props.wpObject.api_url)
      .then(response => response.json())
      // eslint-disable-next-line no-undef
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.setState({
          reviews: response,
          load: false
        });
      });
  }

  render() {
    const { reviews } = this.state;
    const { title } = this.props.wpObject;
    let reviewsList;

    reviews
      ? (reviewsList = reviews.value.map(review => (
          <Review
            key={review.ID}
            url={this.props.wpObject.site_url}
            data={review}
          />
        )))
      : (reviewsList = null);

    return (
      <div>
        {reviewsList ? (
          <>
            <h3>{title}</h3>
            <hr />
            <div className="reviews-list">{reviewsList}</div>
          </>
        ) : (
          <img
            style={{ display: "block", margin: "auto" }}
            src="http://brothersart.pl/wp-content/themes/piper/assets/images/loading.GIF"
          />
        )}
      </div>
    );
  }
}

Shortcode.propTypes = {
  wpObject: PropTypes.object
};
