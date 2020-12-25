import React, { useState, useEffect } from "react";
import axios from "axios";

export default function VKPreview({ image, title, linkTo }) {
  const [isPlaceholderImage, setIsPlaceholderImage] = useState(false);
  useEffect(() => {
    setIsPlaceholderImage(false);
  }, [image])
  return (
    <a href={linkTo} className="vk-preview">
      <div className="vk-preview-image-container">
        <img
          className="vk-preview-image"
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
          alt="vk-preview"
        />
        {isPlaceholderImage ? (
          <div className="vk-preview-image-placeholder-text">Placeholder</div>
        ) : (
          ""
        )}
      </div>
      <div className="vk-preview-text-container">
        <div className="vk-preview-title">{title}</div>
        <div className="vk-preview-description">{"mr-sl.com"}</div>
      </div>
    </a>
  );
}
