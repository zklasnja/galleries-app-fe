import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllComments, getAll } from "../store/comments/slice";
import { selectUser } from "../store/user/slice";
import SingleGalleryImage from "../components/SingleGalleryImage";
import CommentsComponent from "../components/CommentsComponent";
import AddCommentComponent from "../components/AddCommentComponent";
import Galleries from "../services/Galleries";
import Comments from "../services/Comments";
import { format, parseISO } from "date-fns";

export default function SingleGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const commentsData = useSelector(selectAllComments);
  const usersData = useSelector(selectUser);
  const [gallery, setGallery] = useState([""]);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const handleSingleGallery = async (id) => {
    const response = await Galleries.get(id);
    const commentsReponse = await Comments.getAll(id);
    setGallery(response);
    setFirst_name(response.user.first_name);
    setLast_name(response.user.last_name);
    dispatch(getAll(commentsReponse.data));
  };

  const handleDeleteGallery = async (id) => {
    const choice = window.confirm(
      "Are you sure you want to delete this gallery?"
    );
    if (!choice) return;
    await Galleries.delete(id);
    history.push("/my-galleries");
  };

  useEffect(() => {
    handleSingleGallery(id);
  }, [id]);
  return (
    <div>
      <section className="py-1 text-center">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{gallery.name}</h1>
            <p className="lead text-muted">{gallery.description}</p>
            <p className="card-text">
              <Link to={`/authors/${usersData.id}`}>
                {first_name} {last_name}
              </Link>
            </p>
            <small className="">
              {new Date(gallery?.created_at).toLocaleString()}
            </small>
            {gallery?.user_id === usersData.id ? (
              <div className="btn-group">
                <Link
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  to={`/edit-gallery/${id}`}
                >
                  Edit Gallery
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteGallery(id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {gallery?.images?.map((image) => (
              <SingleGalleryImage key={image.id} image={image} />
            ))}
          </div>
        </div>
      </div>

      <div>
        {commentsData?.map((comment) => (
          <CommentsComponent key={comment.id} {...comment} />
        ))}
      </div>
      {usersData?.first_name ? (
        <div>
          <AddCommentComponent id={id} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
