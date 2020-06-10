import axios from 'axios';
import { GET_LIKES } from './Types';

export const getLikes = (postId) => async dispatch =>{
  try {    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const Authorization = `Bearer ${userDetails.token}`;
    const res = await axios.get(`/post/${postId}/likes/count`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization
      }
    });
    dispatch({
      type:GET_LIKES,
      payload:res.data.data
    })
  } catch (error) {        
  }
}
