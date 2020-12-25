import React from "react";
import axios from "axios";

export default function TGPreview({
  linkTo,
  image,
  isPlaceholderImage,
  description,
  title,
  setIsPlaceholderImage,
}) {
  return (
    <a href={linkTo} className="tg-preview">
      <div className="tg-preview-text-container">
        <div className="tg-preview-title">{title}</div>
        <div className="tg-preview-description">{description}</div>
      </div>
      <div className="tg-preview-image-container">
        <img
          className="tg-preview-image"
          src={image}
          onError={(e) => {
            if (e) {
              axios
                .get("https://source.unsplash.com/random")
                .then((response) => {
                  console.log(response);
                  e.target.src = response.request.responseURL;
                  setIsPlaceholderImage(true);
                })
                .catch((err) => {});
            }
          }}
          alt="tg-preview"
        />
        {isPlaceholderImage ? (
          <div className="tg-preview-image-placeholder-text">Placeholder</div>
        ) : (
          ""
        )}
      </div>
    </a>
  );
}
