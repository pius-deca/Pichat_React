import axios from "axios";
import {
  COUNT_FOLLOWERS,
  COUNT_FOLLOWING,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_ERRORS,
} from "./Types";

export const listOfFollowers = (username) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/user/${username}/followers`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: GET_FOLLOWERS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.exception,
    });
  }
};

export const listOfFollowing = (username) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/user/${username}/following`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: GET_FOLLOWING,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.exception,
    });
  }
};

export const countFollowers = (username) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/user/${username}/followers/count`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: COUNT_FOLLOWERS,
      payload: res.data.data,
    });
  } catch (error) {}
};

export const countFollowing = (username) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/user/${username}/following/count`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: COUNT_FOLLOWING,
      payload: res.data.data,
    });
  } catch (error) {}
};
