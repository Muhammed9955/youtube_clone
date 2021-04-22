import jwtDecode from "jwt-decode";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

const token = localStorage.getItem("jwtToken");
const initialState = {
  token: token || null,
  isAuthenticated: token ? true : null,
  loading: token ? false : true,
  user: null,
  errors: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  console.log({ decodedToken });
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.token = decodedToken;
  }
}

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      // if (payload.token) localStorage.setItem("jwtToken", payload.token);
      return {
        ...state,
        user: {
          client: payload.client,
          ...payload.user,
        },
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...payload,
        },
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
};
export default auth;
