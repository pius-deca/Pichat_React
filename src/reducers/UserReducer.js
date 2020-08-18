import {
  IS_ACTIVE,
  GET_USER,
  GET_SEARCHED_USERS,
  GET_USER_ERRORS,
  PROFILE_PIC,
  ADD_USER_BIO,
  GET_USER_BIO,
} from "../actions/Types";

const initialState = {
  isActive: "",
  searchedUser: {},
  allSearchedUsers: [],
  userErrors: "",
  profilePic: "",
  bio: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        searchedUser: action.payload,
      };
    case GET_SEARCHED_USERS:
      return {
        ...state,
        allSearchedUsers: action.payload,
      };
    case GET_USER_ERRORS:
      return {
        ...state,
        userErrors: action.payload,
      };
    case PROFILE_PIC:
      return {
        ...state,
        profilePic: action.payload,
      };
    case ADD_USER_BIO && GET_USER_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
}
