import React, { Component } from "react";
import "./AddReview.scss";

export default class AddReview extends Component {
  render() {
    return (
      <div className="add-review">
        <h3>Add new review form</h3>
        <form action="">
          <input type="text" name="name" placeholder="Your name" /> <br />
          <textarea name="" id="" cols="30" rows="3" />
        </form>
      </div>
    );
  }
}
