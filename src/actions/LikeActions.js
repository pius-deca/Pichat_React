import axios from "axios";
import { GET_LIKES, LIKE_POST } from "./Types";

export const likePost = (postId) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.post(`/post/${postId}/like`, (postId = postId), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: LIKE_POST,
      payload: res.data.data.likes,
    });
    window.location.reload(false);
  } catch (error) {}
};

export const getLikes = (postId) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/post/${postId}/likes/count`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: GET_LIKES,
      payload: res.data.data,
    });
  } catch (error) {}
};
