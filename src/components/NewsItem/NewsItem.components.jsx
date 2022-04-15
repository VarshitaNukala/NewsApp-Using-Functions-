import React from "react";

const NewsItem = (props) => {
  let { title, description, imageURL, newsURL, date, author } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img src={imageURL} className="card-img-top" alt="..." />
        <div className="card-body">
          <h6 className="card-title">{title}...</h6>

          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsURL} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
