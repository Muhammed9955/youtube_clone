import axios from "axios";
import {
  GET_PICKUPS,
  GET_PICKUP,
  PICKUP_ERROR,
  PICKUP_HISTORY,
  ADD_PICKUP,
  EDIT_PICKUP,
  CANCEL_PICKUP,
  ADD_PICKUP_MESSAGE,
  GET_PICKUP_MESSAGES,
} from "../types";

// Get pickup
export const getPickup = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/pickups/${id}`);

    dispatch({
      type: GET_PICKUP,
      payload: res.data.data.pickup,
    });
    return res.data.data.pickup;
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PICKUP_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get all pickups
export const getPickups = () => async (dispatch) => {
  try {
    const res = await axios.get("/pickups");

    dispatch({
      type: GET_PICKUPS,
      payload: res.data.data.pickups,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PICKUP_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get History
export const getPickupHistory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/pickups/${id}/history`);

    dispatch({
      type: PICKUP_HISTORY,
      payload: res.data.data.history,
    });
  } catch (err) {
    dispatch({
      type: PICKUP_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Add pickup
export const addPickup = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/pickups/`, formData, config);
    console.log({ pickupAction: res });
    console.log({ formData });
    dispatch({
      type: ADD_PICKUP,
      payload: res.data.data.pickup,
    });
  } catch (err) {
    dispatch({
      type: PICKUP_ERROR,
      payload: err?.response.data.data,
    });
  }
};

// Edit pickup
export const editPickup = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`/pickups/${id}`, formData, config);
    dispatch({
      type: EDIT_PICKUP,
      payload: res.data,
    });
    console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PICKUP_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Cancel (delete) pickup
export const cancelPickup = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/pickups/${id}`, config);
    dispatch({
      type: CANCEL_PICKUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PICKUP_ERROR,
      payload: err.response.data.data,
    });
  }
};

// add mesage - deliverer
export const addPickupMessage = (id, text) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/pickups/${id}/messages`, text, config);
    dispatch({
      type: ADD_PICKUP_MESSAGE,
      payload: res.data.data.mesage,
    });
  } catch (err) {
    dispatch({
      type: PICKUP_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get messages -deliverer
export const getPickupMessages = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/pickups/${id}/messages`);

    dispatch({
      type: GET_PICKUP_MESSAGES,
      payload: res.data.data.messages,
    });
  } catch (err) {
    dispatch({
      type: PICKUP_ERROR,
      payload: err.response.data.data,
    });
  }
};
