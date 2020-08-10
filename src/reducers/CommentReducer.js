import { COUNT_COMMENTS, COMMENT_POST, GET_COMMENTS } from "../actions/Types";

const initialState = {
  allComments: {
    payload: [],
  },
  numOfComments: "",
  comment: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMENT_POST:
      return {
        ...state,
        comment: action.payload,
      };
    case COUNT_COMMENTS:
      return {
        ...state,
        numOfComments: action.payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        allComments: action.payload,
      };
    default:
      return state;
  }
}
