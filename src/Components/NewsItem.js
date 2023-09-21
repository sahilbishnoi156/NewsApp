import React, { useState } from "react";
import Loading from "./Loading";

function NewsItem(props) {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  const { title, description, imgUrl, url } = props;

  return (
    <div
      className="card"
      style={{
        minWidth: "20rem",
      }}
    >
      {imageLoading && (
        <div className="spinner">
          <Loading />
        </div>
      )}
      <img
        src={imgUrl}
        className="card-img-top"
        alt="..."
        onLoad={handleImageLoaded}
        onError={handleImageError}
        style={{ display: imageLoading ? "none" : "block" }}
      />
      <div
        className="card-body"
        style={{
          position: "relative",
          height: "50%",
        }}
      >
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a
          target="_blank"
          rel="noreferrer"
          href={url}
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default NewsItem;
