import {
  COUNT_FOLLOWERS,
  COUNT_FOLLOWING,
  GET_FOLLOWERS,
  GET_FOLLOWING,
} from "../actions/Types";

const initialState = {
  numOfFollowers: "",
  numOfFollowing: "",
  followers: [],
  following: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COUNT_FOLLOWERS:
      return {
        ...state,
        numOfFollowers: action.payload,
      };
    case COUNT_FOLLOWING:
      return {
        ...state,
        numOfFollowing: action.payload,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    default:
      return state;
  }
}
