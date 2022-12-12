import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/slice";
import useAuth from "../hooks/useAuth";
import Galleries from "../services/Galleries";

export default function EditGalleryComponent() {
  const { id } = useParams();
  const history = useHistory();
  const usersData = useSelector(selectUser);
  const { getUser } = useAuth();

  const [gallery, setGallery] = useState({
    id: "",
    name: "",
    description: "",
    user_id: "",
  });
  const [inputList, setInputList] = useState([""]);

  const onEditGallery = (e) => {
    e.preventDefault();

    const handleEditGallery = async () => {
      await Galleries.edit(id, {
        name: gallery.name,
        description: gallery.description,
        urls: inputList,
      });
    };
    if (handleEditGallery) {
      handleEditGallery();
      history.push(`/gallery/${id}`);
    }
  };

  const handleSingleGallery = async (id) => {
    const response = await Galleries.get(id);
    setGallery(response);
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

  const getUsersData = async () => {
    await getUser();
  };

  useEffect(() => {
    if (id) {
      handleSingleGallery(id);
      getUsersData();
    }
  }, [id]);
  console.log(usersData);
  return usersData?.id === gallery?.user_id ? (
    <div className="body-signin">
      <div className="form-signin w-100 m-auto">
        <form onSubmit={onEditGallery}>
          <h1 className="h3 mb-3 fw-normal">Create new Gallery</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              value={gallery?.name}
              onChange={({ target }) =>
                setGallery({ ...gallery, name: target.value })
              }
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <textarea
              type="textarea"
              rows="4"
              className="form-control"
              value={gallery?.description}
              onChange={({ target }) =>
                setGallery({ ...gallery, description: target.value })
              }
            ></textarea>
            <label>Description</label>
          </div>

          {inputList.map((x, index) => (
            <div key={index} className="form-floating">
              <input
                type="text"
                className="form-control"
                value={x.urls}
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
          ))}

          <button className="w-100 btn btn-lg btn-primary m-1" type="submit">
            Create
          </button>
          <Link
            className="w-100 btn btn-sm btn-warning m-1"
            type="button"
            to={`/gallery/${id}`}
          >
            Cancel
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2022</p>
        </form>
      </div>
    </div>
  ) : (
    <h1>You are not authorized to edit this gallery</h1>
  );
}
