import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // LOGOUT,
} from "../types";

// Register User
export const register = (user) => async (dispatch) => {
  console.log({ user });

  localStorage.setItem("jwtToken", user.jwt);

  try {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: user,
    });

  } catch (err) {
    const errors = err.response.data.data[0].messages[0].message;
    console.log({ err });
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
  }
};

// Login User
export const login = (user) => async (dispatch) => {
  console.log({ user });
  try {
    localStorage.setItem("jwtToken", user.jwt);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user.user,
    });
    // console.log({ res });
  } catch (err) {
    const errors = err;
    console.log({ errors });
    console.log({ err });
    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
    return errors;
  }
};

// loadUser
export const loadUser = (user) => (dispatch) => {
  dispatch({ type: "LOAD_USER", payload: user });
};
// Logout / Clear Profile
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch({ type: "LOGOUT" });
};
