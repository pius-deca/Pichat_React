import axios from "axios";
import {
  GET_USER,
  GET_ERRORS,
  GET_SEARCHED_USERS,
  GET_USER_ERRORS,
  MESSAGE,
  PROFILE_PIC,
  ADD_USER_BIO,
  GET_USER_BIO,
  IS_ACTIVE,
} from "./Types";
import store from "../store";
import { logout } from "./SecurityActions";

export const isUserActive = () => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const response = await axios.get(`/user/is_active`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: IS_ACTIVE,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ERRORS,
      payload: error.response.data.exception,
    });
  }
};

export const activateUser = (code) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const response = await axios.get(`/user/activate?code=${code}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: MESSAGE,
      payload: response.data.message,
    });
    window.location.reload(false);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.exception,
    });
  }
};

export const searchUser = (username) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/user/${username}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: GET_USER,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ERRORS,
      payload: error.response.data.exception,
    });
  }
};

export const search = (searchRequest) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/user/found?username=${searchRequest}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: GET_SEARCHED_USERS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ERRORS,
      payload: error.response.data.exception,
    });
  }
};

export const changePassword = (request) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.post("/user/changePassword", request, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: MESSAGE,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateAccountDetails = (request, history) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.patch("/user/update_account", request, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: MESSAGE,
      payload: res.data.message,
    });
    const updatedUserDatails = res.data.data;
    if (res.data.data.token) {
      store.dispatch(logout());
      history.push("/");
    } else {
      const username = updatedUserDatails.username;
      const newUserDetails = JSON.parse(localStorage.getItem("userDetails"));
      const newAuthorization = `Bearer ${newUserDetails.token}`;
      const newRes = await axios.get(`/user/${username}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: newAuthorization,
        },
      });
      dispatch({
        type: GET_USER,
        payload: newRes.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
    dispatch({
      type: GET_USER_ERRORS,
      payload: error.response.data.message,
    });
  }
};

export const getProfilePic = () => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get("/user/profile", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: PROFILE_PIC,
      payload: res.data.data,
    });
  } catch (error) {}
};

export const uploadProfilePic = (request) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    await axios.post("/user/profile", request, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    window.location.reload(false);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const removeProfilePic = () => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const profile = JSON.parse(localStorage.getItem("user_profile"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.delete(`/user/profile?pic=${profile.image_name}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: MESSAGE,
      payload: res.data.message,
    });
    localStorage.removeItem("user_profile");
    window.location.reload(false);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const addBio = (request) => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.post("/user/bio", request, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: ADD_USER_BIO,
      payload: res.data.data,
    });
    dispatch({
      type: MESSAGE,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.exception,
    });
  }
};

export const userBio = () => async (dispatch) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get("/user/bio", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    });
    dispatch({
      type: GET_USER_BIO,
      payload: res.data.data,
    });
  } catch (error) {}
};
