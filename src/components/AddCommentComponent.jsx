import React, { useState } from "react";
import Comments from "../services/Comments";
import { useDispatch } from "react-redux";
import { getAll } from "../store/comments/slice";

export default function AddComment({ id }) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({
    body: "",
  });

  const onAddComment = async (e) => {
    e.preventDefault();

    const handleAddComment = async () => {
      await Comments.add(id, newComment);
    };
    if (handleAddComment) {
      handleAddComment();
      const response = await Comments.getAll(id);
      dispatch(getAll(response.data));
      setNewComment({ body: "" });
    }
  };
  return (
    <div className="body-signin p-1">
      <div className="form-signin w-100 m-auto">
        <form onSubmit={onAddComment}>
          <div className="form-group form-floating">
            <textarea
              required
              rows="3"
              className="form-control"
              placeholder="Comment"
              value={newComment.body}
              onChange={(e) =>
                setNewComment({ ...newComment, body: e.target.value })
              }
            />
            <label className="text-sm">Add Comment</label>
          </div>
          <button className="btn btn-sm btn-secondary m-1" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
