import React from 'react';
import { Link } from 'react-router-dom';

export const UserPost = (userPosts) => {
  
  if (userPosts.length < 1) {
    return(
      <div className="alert alert-info text-center my-5" role="alert">
          No Posts available
      </div>
    )
  }

  return (
    <div className="user-post-item my-5">
      {userPosts.map(post =>(
        <Link className="link" to={`/post/${post.post}`}>
          <img key={post.id} src={post.url} alt="hello" />        
        </Link> 
      ))}      
    </div>
  )
}