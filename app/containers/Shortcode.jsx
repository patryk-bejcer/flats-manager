/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Review from "../components/Review";
import loaderImg from "../img/loader.gif";
import "./Shortcode.scss";
import AddReview from "../components/AddReview";

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
      <div className="shortcode">
        {reviewsList ? (
          <>
            <h3>{title}</h3>
            <hr />
            <div className="reviews-list">{reviewsList}</div>
            <AddReview />
          </>
        ) : (
          <img style={{ display: "block", margin: "auto" }} src={loaderImg} />
        )}
      </div>
    );
  }
}

Shortcode.propTypes = {
  wpObject: PropTypes.object
};
