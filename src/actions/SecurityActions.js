import axios from "axios";
import { GET_SECURITY_ERRORS, SET_CURRENT_USER, MESSAGE } from "./Types";
import setToken from "../securityUtils/setToken";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/signup", newUser);
    const userDatails = res.data.data;
    localStorage.setItem("userDetails", JSON.stringify(userDatails));
    setToken(userDatails.token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: userDatails,
    });
    dispatch({
      type: MESSAGE,
      payload: res.data.message,
    });
    history.push(`/${userDatails.username}`);
  } catch (error) {
    dispatch({
      type: GET_SECURITY_ERRORS,
      payload: error.response.data,
    });
  }
};

export const loginUser = (LoginRequest, history) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/login", LoginRequest);
    const userDatails = response.data.data;
    localStorage.setItem("userDetails", JSON.stringify(userDatails));
    setToken(userDatails.token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: userDatails,
    });
    history.push(`/${userDatails.username}`);
  } catch (error) {
    dispatch({
      type: GET_SECURITY_ERRORS,
      payload: error.response.data,
    });
  }
};

export const forgotPass = (forgotPasswordRequest) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/auth/password/forgot",
      forgotPasswordRequest
    );
    dispatch({
      type: MESSAGE,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: GET_SECURITY_ERRORS,
      payload: error.response.data,
    });
  }
};

export const resetPass = (resetPasswordRequest, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/auth/password/reset?token=${token}`,
      resetPasswordRequest
    );
    dispatch({
      type: MESSAGE,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: GET_SECURITY_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userDetails");
  localStorage.removeItem("user_profile");
  setToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: false,
  });
};
