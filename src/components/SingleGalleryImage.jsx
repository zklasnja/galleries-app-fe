import React from "react";

export default function SingleGalleryImage({ image }) {
  return (
    <div>
      <img
        className="align-self-center p-3"
        width="100%"
        height="225"
        src={image.urls}
        role="img"
        alt=""
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        onClick={() => window.open(image.urls)}
      />
    </div>
  );
}
