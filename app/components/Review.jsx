import React from "react";
import _ from "lodash";

function Review(props) {
  const { url, data: review } = props;
  const reviewURL = `${url}/reviews/${review.post_name}`;
  return (
    <>
      <div>
        <h4>
          <a href={reviewURL}>{review.post_title}</a>
        </h4>
        <h6>{review.post_date}</h6>
        <p>{_.truncate(review.post_content, { length: 230 })}</p>
        <a href={reviewURL}>Read more ...</a>
      </div>
      <hr />
    </>
  );
}

export default Review;
