import axios from 'axios';
import { GET_USER } from './Types';

export const searchUser = (username) => async dispatch =>{
  try {    
    console.log(username);      
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));    
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.post(`/user/${username}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    console.log(res);
    
    dispatch({
      type:GET_USER,
      payload:res.data.data
    })
  } catch (error) {  
    console.log(error);              
  }
}