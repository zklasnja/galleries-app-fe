import React from "react";
import { Link } from "react-router-dom";

export default function AppGalleryRow({
  id,
  name,
  description,
  images,
  user,
  created_at,
}) {
  return (
    <div className="card shadow-sm m-1" style={{ width: 20 + "rem" }}>
      <img
        className="bd-placeholder-img card-img-top"
        alt=""
        src={images.length ? images[0].urls : ""}
      />
      <div className="card-body">
        <h3 className="fw-light">
          <Link to={`/gallery/${id}`}>{name}</Link>
        </h3>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <Link to={`/authors/${user.id}`}>
            {user.first_name} {user.last_name}
          </Link>
        </p>
        <small className="">{created_at}</small>
      </div>
    </div>
  );
}
