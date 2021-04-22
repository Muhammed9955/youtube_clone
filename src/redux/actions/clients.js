import axios from "axios";
import {
  GET_CLIENT,
  EDIT_CLIENT,
  GET_CLIENT_HISTORY,
  CLIENT_ERROR,
} from "../types";

// Get History
export const getClientHistory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/clients/${id}/history`);
    dispatch({
      type: GET_CLIENT_HISTORY,
      payload: res.data.data.history,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: CLIENT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get client
export const getClient = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/clients/${id}/`);
    dispatch({
      type: GET_CLIENT,
      payload: res.data.data.client,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: CLIENT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Edit Client
export const editClient = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.patch(`/clients/${id}/`, formData, config);

    dispatch({
      type: EDIT_CLIENT,
      payload: res.data.data.client,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: CLIENT_ERROR,
      payload: err.response.data.data,
    });
  }
};
