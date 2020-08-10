import React from "react";
import { Link } from "react-router-dom";

export const UserPost = (userPosts) => {
  if (userPosts.empty) {
    return (
      <div className="alert alert-info text-center my-3" role="alert">
        No Posts available
      </div>
    );
  }

  return (
    <div className="user-posts my-5 p-3  shadow rounded">
      <h5 className="user-posts-title">Posts</h5>
      {userPosts.payload.map((post) => (
        <Link key={post.post} className="link" to={`/post/${post.post}`}>
          <img src={post.url} alt="hello" className="m-2" />
        </Link>
      ))}
    </div>
  );
};
