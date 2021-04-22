import axios from "axios";
import {
  GET_DELIVERER,
  GET_DELIVERERS,
  CREATE_DELIVERER,
  EDIT_DELIVERER,
  GET_ITEMS_WITH_DELIVERER,
  GET_ITEM_WITH_DELIVERER,
  RECLAIM_ITEM_FROM_DELIVERER,
  DELIVERER_ERROR,
} from "../types";

// Get deliverer
export const getDeliverer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/deliverers/${id}?_populate=user.name`);

    dispatch({
      type: GET_DELIVERER,
      payload: res.data.data.deliverer,
    });
    return res.data.data.deliverer;
  } catch (err) {
    console.log({ err });
    dispatch({
      type: DELIVERER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get all deliverers
export const getDeliverers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/deliverers?_populate=user.name`);

    dispatch({
      type: GET_DELIVERERS,
      payload: res.data.data.deliverers,
    });
    // console.log("deliverers", res.data.data.deliverers);
  } catch (err) {
    console.log({ err });
    dispatch({
      type: DELIVERER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// create deliverer
export const createDeliverer = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/deliverers/`, formData, config);

    dispatch({
      type: CREATE_DELIVERER,
      payload: res.data.data.deliverer,
    });
  } catch (err) {
    console.log("err", err.response.data.data);
    dispatch({
      type: DELIVERER_ERROR,
      payload: err.response.data.data,
    });
  }
};

//edit deliverer
export const editDeliverer = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`/deliverers/${id}`, formData, config);
    dispatch({
      type: EDIT_DELIVERER,
      payload: res.data.data.deliverer,
    });
  } catch (err) {
    dispatch({
      type: DELIVERER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// RECLAIM_ITEM_FROM_DELIVERER
export const reclaim_Item_From_Deliverer = (delivererID, itemID) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(
      `/deliverers/${delivererID}/items/${itemID}`,
      config
    );
    dispatch({
      type: RECLAIM_ITEM_FROM_DELIVERER,
      payload: res.data.data.item,
    });
  } catch (err) {
    dispatch({
      type: DELIVERER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// GET_ITEMS_WITH_DELIVERER
export const get_items_with_deliverers = (delivererID) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/deliverers/${delivererID}/items/`, config);
    dispatch({
      type: GET_ITEMS_WITH_DELIVERER,
      payload: res.data.data.items,
    });
  } catch (err) {
    dispatch({
      type: DELIVERER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// GET_ITEM_WITH_DELIVERER
export const get_item_with_deliverer = (delivererID, itemID) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/deliverers/${delivererID}/items/`, config);
    dispatch({
      type: GET_ITEM_WITH_DELIVERER,
      payload: res.data.data.items,
    });
  } catch (err) {
    dispatch({
      type: DELIVERER_ERROR,
      payload: err.response.data.data,
    });
  }
};
