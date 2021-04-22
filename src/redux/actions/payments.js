import axios from "axios";
import {
  GET_PAYMENTS,
  GET_PAYMENT,
  ADD_PAYMENT,
  EDIT_PAYMENT,
  CANCEL_PAYMENT,
  PAYMENT_ERROR,
} from "../types";

// Get pyament
export const getPayment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/cycles/payments/${id}`);

    dispatch({
      type: GET_PAYMENT,
      payload: res.data.data.payment,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PAYMENT_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status },
      payload: err.response.data.data,
    });
  }
};

// Get all pyaments
export const getPayments = () => async (dispatch) => {
  try {
    const res = await axios.get("/cycles/payments");
    // console.log({ res });
    dispatch({
      type: GET_PAYMENTS,
      payload: res.data.data.payments,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PAYMENT_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Add pyament - warehouse
export const addPayment = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/cycles/payments`, formData, config);
    console.log({ res });
    console.log({ formData });
    dispatch({
      type: ADD_PAYMENT,
      payload: res.data.data.payment,
    });
  } catch (err) {
    // console.log({ err });

    dispatch({
      type: PAYMENT_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Edit pyament - warehouse
export const editPayment = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`/cycles/payments/${id}`, formData, config);
    dispatch({
      type: EDIT_PAYMENT,
      payload: res.data,
    });
    console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PAYMENT_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Cancel (delete) pyament - warehouse
export const cancelPayment = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/cycles/payments/${id}`, config);
    dispatch({
      type: CANCEL_PAYMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PAYMENT_ERROR,
      payload: err.response.data.data,
    });
  }
};
