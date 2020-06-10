import { GET_LIKES } from '../actions/Types';

const initialState = {
    likes:""
};

export default function(state=initialState, action){
  switch (action.type) {
    case GET_LIKES:
        return{
            ...state,
          likes:action.payload
        }
    default:
      return state;
  }
}

