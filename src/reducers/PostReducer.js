import { GET_POST, GET_ALL_POSTS, GET_ALL_USER_POSTS, COUNT_USER_POSTS } from '../actions/Types';

const initialState = {
  allPosts:[],
  userPosts:[],
  post:{},
  countUserPosts:""
};

export default function(state=initialState, action){
  switch (action.type) {
    case GET_POST:
      return{
          ...state,
        post:action.payload
      }
    case GET_ALL_POSTS:
      return{
          ...state,
        allPosts:action.payload
      }
    case GET_ALL_USER_POSTS:
      return{
          ...state,
        userPosts:action.payload
      }
    case COUNT_USER_POSTS:
      return{
          ...state,
        countUserPosts:action.payload
      }  
    default:
      return state;
  }
}

