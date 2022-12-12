import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../store/user/slice";
import { selectAllComments, getAll } from "../store/comments/slice";
import Comments from "../services/Comments";
import useAuth from "../hooks/useAuth";

export default function CommentsComponent(comment) {
  const { id } = useParams();
  const usersData = useSelector(selectUser);
  const dispatch = useDispatch();
  const commentsData = useSelector(selectAllComments);
  const { getUser } = useAuth();

  const onDeleteComment = async (cId) => {
    const choice = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!choice) return;
    const response = await Comments.delete(id, cId);
    if (response) {
      dispatch(getAll(commentsData.filter((comment) => comment.id !== cId)));
    }
  };

  const getUsersData = async () => {
    await getUser();
  };

  useEffect(() => {
    if (!usersData) {
      getUsersData();
    }
  }, []);
  return (
    <div className="list-group w-auto">
      <a
        href="#"
        className="list-group-item list-group-item-action d-flex gap-3 py-3"
        aria-current="true"
      >
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 className="mb-0">
              {comment?.user?.first_name} {comment?.user?.last_name}
            </h6>
            <p className="mb-0 opacity-75">{comment?.body}</p>
          </div>
          <small className="opacity-50 text-nowrap">
            {comment?.created_at}
          </small>
        </div>
        <div>
          {comment.user_id === usersData.id ? (
            <button
              className="btn btn-danger"
              onClick={() => onDeleteComment(comment.id)}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </a>
    </div>
  );
}
