import React from "react";

export default function SingleGalleryImage({ image }) {
  return (
    <img
      width="100%"
      height="225"
      src={image.urls}
      role="img"
      alt=""
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      onClick={() => window.open(image.urls)}
    />
  );
}
