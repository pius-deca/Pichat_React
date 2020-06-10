import { GET_USER } from '../actions/Types';

const initialState = {
  searchedUser:{}
};

export default function(state=initialState, action){
  switch (action.type) {
    case GET_USER:
      return{
          ...state,
        searchedUser:action.payload
      }  
    default:
      return state;
  }
}

