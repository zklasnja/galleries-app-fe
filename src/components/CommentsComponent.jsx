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
    getUsersData();
  }, [onDeleteComment]);
  return (
    <div>
      <p>{comment?.body}</p>
      <p>
        {comment?.user?.first_name} {comment?.user?.last_name}
      </p>
      <p>{comment?.created_at}</p>

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
  );
}
