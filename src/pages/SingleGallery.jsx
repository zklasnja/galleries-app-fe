import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleGalleryImage from "../components/SingleGalleryImage";
import Galleries from "../services/Galleries";

export default function SingleGallery() {
  const { id } = useParams();
  const [gallery, setGallery] = useState([""]);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const handleSingleGallery = async (id) => {
    const response = await Galleries.get(id);
    setGallery(response);
    setFirst_name(response.user.first_name);
    setLast_name(response.user.last_name);
    console.log(response);
  };

  useEffect(() => {
    handleSingleGallery(id);
  }, [id]);
  return (
    <div>
      <div className="card-body">
        <h3 className="fw-light">{gallery.name}</h3>
        <p className="lead text-muted">{gallery.description}</p>
        <p className="card-text">
          {first_name} {last_name}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{gallery.created_at}</small>
        </div>
      </div>

      {gallery?.images?.map((image) => (
        <div key={image.id} className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div className="col">
                <div className="card shadow-sm">
                  <SingleGalleryImage key={image.id} image={image} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
