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
    <main className="container-fluid">
      <div className="py-3 bg-light">
        <div className="d-flex justify-content-center">
          <div className="card mx-auto">
            <img
              className="rounded float-left"
              height="225"
              alt=""
              src={images.length ? images[0].urls : ""}
            />
            <div className="card-body">
              <h3 className="fw-light">
                <Link to={`/gallery/${id}`}>{name}</Link>
              </h3>
              <p className="lead text-muted">{description}</p>
              <p className="card-text">
                <Link to={`/authors/${user.id}`}>
                  {user.first_name} {user.last_name}
                </Link>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{created_at}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
