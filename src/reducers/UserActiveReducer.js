import { IS_ACTIVE } from '../actions/Types';

const initialState = {
  isActive: false,
  message:""
};

const booleanActionPayload = payload =>{
  if (payload) {
    return true;
  }else{
    return false;
  }
}

export default function(state=initialState, action){
  switch (action.type) {
    case IS_ACTIVE:
      return{
          ...state,
        isActive:booleanActionPayload(action.payload),
        message:action.payload
      }  
    default:
      return state;
  }
}

