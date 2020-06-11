import axios from 'axios';
import { GET_ALL_POSTS, GET_ALL_USER_POSTS, COUNT_USER_POSTS, GET_POST, GET_ERRORS } from './Types';

export const getPost = postId => async dispatch =>{
  try {    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;    
    const res = await axios.get(`/post/${postId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:GET_POST,
      payload:res.data.data
    })
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload:error.response.data.message
    })          
  }
}

export const getAllPosts = () => async dispatch =>{
  try {    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get("/post/all", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:GET_ALL_POSTS,
      payload:res.data.data
    })
  } catch (error) {        
  }
}

export const getUserPosts = (username) => async dispatch =>{
  try {    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/${username}/post`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:GET_ALL_USER_POSTS,
      payload:res.data.data
    })
  } catch (error) {        
  }
}

export const countUserPosts = (username) => async dispatch =>{
  try {    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/post/${username}/count`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:COUNT_USER_POSTS,
      payload:res.data.data
    })
  } catch (error) {        
  }
}