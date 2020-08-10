import React from "react";
import { Link } from "react-router-dom";

export const Search = (allSearchedUsers) => {
  const defaultPic =
    "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

  const src = (pic) => {
    if (pic != null) {
      return pic.url;
    }
    return defaultPic;
  };

  return (
    <div>
      {allSearchedUsers.map((user) => (
        <div
          className="d-flex justify-content-between post-user-link my-2 p-3"
          key={user.id}
        >
          <div className="link-wrapper">
            <Link
              to={`/${user.username}`}
              onClick={() => (window.location.href = `/${user.username}`)}
              className="link py-2"
            >
              <img src={src(user.profilePic)} alt="hi" className="mr-2" />
              <p>{user.username}</p>
            </Link>
          </div>
          <div>
            <span>following</span>
            <button className="btn btn-info p-1">follow</button>
            <button className="btn btn-info p-1">unfollow</button>
          </div>
        </div>
      ))}
    </div>
  );
};
