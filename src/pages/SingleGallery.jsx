import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllComments, getAll } from "../store/comments/slice";
import SingleGalleryImage from "../components/SingleGalleryImage";
import CommentsComponent from "../components/CommentsComponent";
import AddCommentComponent from "../components/AddCommentComponent";
import Galleries from "../services/Galleries";
import Comments from "../services/Comments";

export default function SingleGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const commentsData = useSelector(selectAllComments);
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
              {first_name} {last_name}
            </p>
          </div>
        </div>
      </section>

      {gallery?.images?.map((image) => (
        <div key={image.id} className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div className="col">
                <div className="card shadow-sm ">
                  <SingleGalleryImage key={image.id} image={image} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
        {commentsData?.map((comment) => (
          <CommentsComponent key={comment.id} {...comment} />
        ))}
      </div>
      <div>
        <AddCommentComponent id={id} />
      </div>
    </div>
  );
}
