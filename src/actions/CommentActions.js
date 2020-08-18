import axios from "axios";
import {
  COUNT_COMMENTS,
  COMMENT_POST,
  GET_COMMENTS,
  GET_ERRORS,
} from "./Types";

export const countComments = (postId) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/post/${postId}/comments/count`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: COUNT_COMMENTS,
      payload: res.data.data,
    });
  } catch (error) {}
};

export const commentPost = (commentRequest, postId) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.post(`/post/${postId}/comment`, commentRequest, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: COMMENT_POST,
      payload: res.data.data,
    });
    window.location.reload(false);
  } catch (error) {}
};

export const getComments = (postId) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/post/${postId}/comments`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: GET_COMMENTS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.exception,
    });
  }
};
