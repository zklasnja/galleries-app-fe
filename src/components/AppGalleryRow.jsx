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
    <div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                  src={images.length ? images[0].urls : ""}
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                />
                <div className="card-body">
                  <h3 className="fw-light">{name}</h3>
                  <p className="lead text-muted">{description}</p>
                  <p className="card-text">
                    {user.first_name} {user.last_name}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        <Link to={`/gallery/${id}`}>View</Link>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </button>
                    </div>
                    <small className="text-muted">{created_at}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
