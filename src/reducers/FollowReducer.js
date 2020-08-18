import {
  COUNT_FOLLOWERS,
  COUNT_FOLLOWING,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  IS_FOLLOWING,
} from "../actions/Types";

const initialState = {
  isFollowing: "",
  numOfFollowers: "",
  numOfFollowing: "",
  followers: [],
  following: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_FOLLOWING:
      return {
        ...state,
        isFollowing: action.payload,
      };
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
