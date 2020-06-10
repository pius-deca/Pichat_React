import axios from 'axios';
import { COUNT_FOLLOWERS, COUNT_FOLLOWING } from './Types';

export const countFollowers = () => async dispatch =>{
  try {    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get("/user/followers", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:COUNT_FOLLOWERS,
      payload:res.data.data
    })
  } catch (error) {        
  }
}

export const countFollowing = () => async dispatch =>{
  try {    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get("/user/following", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:COUNT_FOLLOWING,
      payload:res.data.data
    })
  } catch (error) {        
  }
}