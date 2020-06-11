import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './Types';
import setToken from '../securityUtils/setToken';

export const createNewUser = (newUser, history) => async dispatch =>{
  try {
    await axios.post("/auth/signup", newUser)
    history.push("/account/login")
    dispatch({
      type:GET_ERRORS,
      payload:{}
    })
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload:error.response
    })        
  }
}

export const loginUser = (LoginRequest, history) => async dispatch =>{
  try {
    const response = await axios.post("/auth/login", LoginRequest);
    const userDatails = response.data.data;    
    localStorage.setItem("userDetails", JSON.stringify(userDatails))
    setToken(userDatails.token)
    dispatch({
      type:SET_CURRENT_USER,
      payload:userDatails
    })     
    history.push(`/${userDatails.username}`)
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload:error.response
    })
  }
}

export const logout = () => dispatch =>{
  localStorage.removeItem("userDetails")
  setToken(false)
  dispatch({
    type:SET_CURRENT_USER,
    payload:{}
  })
}

