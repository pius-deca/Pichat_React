import { combineReducers } from 'redux';
import ErrorReducer from './ErrorReducer';
import SecurityReducer from './SecurityReducer';
import PostReducer from './PostReducer';
import LikeReducer from './LikeReducer';
import CommentReducer from './CommentReducer';
import UserReducer from './UserReducer';
import FollowReducer from './FollowReducer';
import UserActiveReducer from './UserActiveReducer'

export default combineReducers({
  errors: ErrorReducer,
  security: SecurityReducer,
  post: PostReducer,
  like: LikeReducer,
  comment: CommentReducer,
  user: UserReducer,
  follow: FollowReducer,
  isActive: UserActiveReducer
}) 