import { COUNT_FOLLOWERS, COUNT_FOLLOWING } from '../actions/Types';

const initialState = {
  numOfFollowers:"",
  numOfFollowing:""
};

export default function(state=initialState, action){
  switch (action.type) {
    case COUNT_FOLLOWERS:
      return{
          ...state,
        numOfFollowers:action.payload
      }
    case COUNT_FOLLOWING:
      return{
          ...state,
        numOfFollowing:action.payload
      }  
    default:
      return state;
  }
}

