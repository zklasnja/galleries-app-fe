import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Galleries from "../services/Galleries";

export default function CreateGalleryComponent() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputList, setInputList] = useState([""]);

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    try {
      const response = await Galleries.add({
        name,
        description,
        urls: inputList,
      });

      if (response.data !== undefined) {
        history.push("/my-galleries");
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleInputChange = (e, index) => {
    const list = [...inputList];
    list[index] = e.target.value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, ...inputList]);
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

          {inputList.map((x, index) => {
            return (
              <div key={index} className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleInputChange(e, index)}
                />
                <label>Image url</label>
                <div className="m-1">
                  {inputList.length !== 1 && (
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleRemoveClick(index)}
                    >
                      Remove
                    </button>
                  )}
                  {inputList.length - 1 === index && (
                    <button
                      className="w-100 btn btn-secondary m-1"
                      onClick={handleAddClick}
                    >
                      Add another url
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <button className="w-100 btn btn-lg btn-primary m-1" type="submit">
            Create
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </form>
      </div>
    </div>
  );
}
