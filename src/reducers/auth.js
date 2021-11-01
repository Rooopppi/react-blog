import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_SUCCESS,
  LOGOUT,
} from "../actions/types";

const token = localStorage.getItem("token");
const { email, id, userName } = localStorage.getItem("userData");

const initialState = token
  ? { id, userName, email, isLoggedIn: true }
  : { id: null, userName: null, email: null, isLoggedIn: false };

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        id: payload._id,
        userName: payload.name,
        email: payload.email,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
