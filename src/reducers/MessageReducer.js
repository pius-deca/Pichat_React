import {MESSAGE} from "../actions/Types"

const initialState = {
  message:""
}

export default function(state = initialState, action){
  switch(action.type){
    case MESSAGE:
      return {
        ...state,
        message:action.payload
      }
    default:
      return state    
  }
}

