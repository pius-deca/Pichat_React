import { SET_CURRENT_USER, GET_SECURITY_ERRORS } from "../actions/Types";

const initialState = {
  user: {},
  validToken: false,
  errors: "",
};

const booleanActionPayload = (payload) => {
  return payload ? true : false;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };
    case GET_SECURITY_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}
