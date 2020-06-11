import axios from 'axios';
import { GET_USER, GET_ERRORS, IS_ACTIVE } from './Types';

export const activateUser = (code) => async dispatch =>{
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;    
    const response = await axios.get(`/user/activate?code=${code}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });   
    dispatch({
      type:IS_ACTIVE,
      payload:response.data.message
    })     
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload:error.response.data.message
    })
  }
}

export const searchUser = (username) => async dispatch =>{
  try {         
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));    
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/user/${username}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:GET_USER,
      payload:res.data.data
    })
  } catch (error) { 
    dispatch({
      type:GET_ERRORS,
      payload:error.response.data.message
    })        
  }
}