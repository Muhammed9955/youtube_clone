import axios from "axios";
import {
  GET_ORDERS,
  GET_ORDER,
  ORDER_HISTORY,
  CREATE_ORDER,
  EDIT_ORDER,
  CANCEL_ORDER,
  ORDER_ERROR,
  ADD_ORDER_MESSAGE,
  GET_ORDER_MESSAGES,
  GET_ORDER_ITEMS,
  GET_ORDER_ITEM,
  ADD_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
} from "../types";

// Get order
export const getOrder = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/orders/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: res.data.data.order,
    });
    return res.data.data.order;
  } catch (err) {
    console.log({ err });
    const errors = err.response.data.message;

    dispatch({
      type: ORDER_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status },
      payload: errors,
    });
  }
};

// Get all orders
export const getOrders = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`/orders`, config);
    console.log({ res });
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log({ err });
    // const errors = err.response.data.message;

    dispatch({
      type: ORDER_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status },
      payload: err,
    });
  }
};

// create Order
export const createOrder = (formData, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.post(`/orders/`, formData, config);
    console.log({ res });
    dispatch({
      type: CREATE_ORDER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.message;
    console.log({ err });
    dispatch({
      type: ORDER_ERROR,
      payload: errors,
    });
  }
};

//edit Order
export const editOrder = (id, formData, token) => async (dispatch) => {
  console.log({ id });
  console.log({ formData });
  console.log({ token });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.put(`/orders/${id}`, formData, config);
    dispatch({
      type: EDIT_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};

// Cancel (delete) order
export const cancelOrder = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/orders/${id}`, config);
    dispatch({
      type: CANCEL_ORDER,
      payload: res.data.data.order,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// addOrderMessage
export const addOrderMessage = (id, text) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/orders/${id}/messages`, text, config);
    dispatch({
      type: ADD_ORDER_MESSAGE,
      payload: res.data.data.message,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get messages - deliverer
export const getOrderMessages = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/orders/${id}/messages`);

    dispatch({
      type: GET_ORDER_MESSAGES,
      payload: res.data.data.messages,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get order items - deliverer
export const getOrderItems = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/orders/${id}/items`);

    dispatch({
      type: GET_ORDER_ITEMS,
      payload: res.data.data.items,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err.response.data.data,
    });
  }
};

// // Get order items - deliverer
// export const getOrderItem = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/orders/${id}/item`);

//     dispatch({
//       type: GET_ORDER_MESSAGES,
//       payload: res.data.data.items,
//     });
//   } catch (err) {
//     dispatch({
//       type: ORDER_ERROR,
//       payload: err.response.data.data,
//     });
//   }
// };

// addOrderItems - deliverer
export const addOrderItems = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/orders/${id}/items`);

    dispatch({
      type: ADD_ORDER_ITEM,
      payload: res.data.data.item,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err.response.data.data,
    });
  }
};
// deleteOrderItem - deliverer
export const deleteOrderItem = (orderId, itemId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/orders/${orderId}/items/${itemId}`);

    dispatch({
      type: ADD_ORDER_ITEM,
      payload: res.data.data.item,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err.response.data.data,
    });
  }
};
