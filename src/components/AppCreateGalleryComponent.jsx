import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Galleries from "../services/Galleries";
import Images from "../services/Images";

export default function CreateGalleryComponent() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addUrl, setAddUrl] = useState("");

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    try {
      const response = await Galleries.add({ name, description });

      await Images.add({ url: addUrl, gallery_id: response.data.id });
      history.push("/my-galleries");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="body-signin">
      <div className="form-signin w-100 m-auto">
        <form onSubmit={handleCreateGallery}>
          <h1 className="h3 mb-3 fw-normal">Create new Gallery</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              onChange={({ target }) => setName(target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <textarea
              type="textarea"
              rows="4"
              className="form-control"
              onChange={({ target }) => setDescription(target.value)}
            ></textarea>
            <label>Description</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              onChange={({ target }) => setAddUrl(target.value)}
            />
            <label>Image text</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </form>
      </div>
    </div>
  );
}