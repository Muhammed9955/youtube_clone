import axios from "axios";
import {
  GET_TRANSFER,
  GET_TRANSFERS,
  TARNSFERS_HISTORY,
  CREATE_TRANSFER,
  CANCEL_TRANSFER,
  TRANSFER_ERROR,
  ADD_TRANSFER_MESSAGE,
  GET_TRANSFER_MESSAGES,
  GET_TRANSFER_ITEMS,
  GET_TRANSFER_ITEM,
} from "../types";

// Get transfer
export const getTarnsfer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/transfers/${id}`);
    console.log({ res });
    dispatch({
      type: GET_TRANSFER,
      payload: res.data.data.transfer,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get all transfers
export const getTransfers = () => async (dispatch) => {
  try {
    const res = await axios.get("/transfers/?_limit=1");
    // console.log({ res });

    dispatch({
      type: GET_TRANSFERS,
      payload: res.data.data.transfers,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get History
export const getTransferHistory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/transfers/${id}/history`);

    dispatch({
      type: TARNSFERS_HISTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Add transfer
export const createTransfer = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/transfers/`, formData, config);
    console.log({ transferAction: res });
    console.log({ formData });
    dispatch({
      type: CREATE_TRANSFER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Cancel (delete) transfer
export const cancelTransfer = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/transfers/${id}`, config);
    dispatch({
      type: CANCEL_TRANSFER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// addTransferMessage
export const addTransferMessage = (id, text) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/transfers/${id}/messages`, text, config);
    dispatch({
      type: ADD_TRANSFER_MESSAGE,
      payload: res.data.data.message,
    });
  } catch (err) {
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get messages - deliverer
export const getTransfersMessages = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/transfers/${id}/messages`);

    dispatch({
      type: GET_TRANSFER_MESSAGES,
      payload: res.data.data.messages,
    });
  } catch (err) {
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// getTransferItem - followup
export const getTransferItem = (transferId, itemId) => async (dispatch) => {
  try {
    const res = await axios.get(`/transfers/${transferId}/items/${itemId}`);

    dispatch({
      type: GET_TRANSFER_ITEM,
      payload: res.data.data.item,
    });
  } catch (err) {
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// getTransferItems - followup
export const getTransferItems = (transferId) => async (dispatch) => {
  try {
    const res = await axios.get(`/transfers/${transferId}/items/`);

    dispatch({
      type: GET_TRANSFER_ITEMS,
      payload: res.data.data.itema,
    });
  } catch (err) {
    dispatch({
      type: TRANSFER_ERROR,
      payload: err.response.data.data,
    });
  }
};
