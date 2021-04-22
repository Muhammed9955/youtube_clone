import axios from "axios";
import { GET_USERS, GET_USER, EDIT_USER, ADD_USER, USER_ERROR } from "../types";

// Get Users
export const getUsers = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`/users/`, config);

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};
// Get User
export const getUser = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`/users/${id}/`,config);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
    // return res.data.data.user;
  } catch (err) {
    console.log({ err });
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};
// Add User
export const addUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/users/`, formData, config);

    dispatch({
      type: ADD_USER,
      payload: res.data.data.user,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: USER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Edit User
export const editUser = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.patch(`/users/${id}/`, formData, config);
    console.log({ id });
    dispatch({
      type: EDIT_USER,
      payload: res.data.data.user,
    });
  } catch (err) {
    console.log({ err });
    console.log({ id });

    dispatch({
      type: USER_ERROR,
      payload: err.response.data.data,
    });
  }
};
