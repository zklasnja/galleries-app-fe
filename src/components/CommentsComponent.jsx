import React from "react";

export default function CommentsComponent({ body, created_at, user }) {
  return (
    <div>
      <p>{body}</p>
      <p>
        {user?.first_name} {user?.last_name}
      </p>
      <p>{created_at}</p>
    </div>
  );
}
