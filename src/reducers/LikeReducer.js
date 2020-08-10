import { GET_LIKES, LIKE_POST } from "../actions/Types";
import { likePost } from "../actions/LikeActions";

const initialState = {
  likes: "",
  isLiked: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIKES:
      return {
        ...state,
        likes: action.payload,
      };
    case LIKE_POST:
      return {
        ...state,
        isLiked: action.payload,
      };
    default:
      return state;
  }
}
