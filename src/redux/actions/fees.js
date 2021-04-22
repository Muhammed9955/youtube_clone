import axios from "axios";
import { GET_FEES, GET_FEE, ADD_FEE, EDIT_FEE, FEE_ERROR } from "../types";

// Get fees
export const getFees = () => async (dispatch) => {
  try {
    const res = await axios.get(`/fees/`);
    dispatch({
      type: GET_FEES,
      payload: res.data.data.fees,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: FEE_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get a fee
export const getFee = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/fees/${id}/`);
    dispatch({
      type: GET_FEE,
      payload: res.data.data.fees,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: FEE_ERROR,
      payload: err.response.data.data,
    });
  }
};
// add a fee
export const addFee = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/fees/${id}/`, formData, config);

    dispatch({
      type: ADD_FEE,
      payload: res.data.data.fees,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: FEE_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Edit a fee
export const editFee = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.patch(`/fees/${id}/`, formData, config);

    dispatch({
      type: EDIT_FEE,
      payload: res.data.data.fees,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: FEE_ERROR,
      payload: err.response.data.data,
    });
  }
};
