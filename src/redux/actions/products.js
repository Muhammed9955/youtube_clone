import axios from "axios";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_ITEMS,
  GET_ITEM,
  GET_ITEMS,
  PRODUCT_ERROR,
  GET_HISTORY_CL,
  CREATE_PRODUCT_CL,
  EDIT_PRODUCT_CL,
  GET_ITEM_HISTORY_WH,
  GET_ITEMS_FOR_PRODUCT,
} from "../types";

// create Product
export const createProduct = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/products/`, formData, config);
    // console.log({ createProduct: res });
    // console.log({ formData });
    dispatch({
      type: CREATE_PRODUCT_CL,
      payload: res.data.data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
    // console.log({ err });
  }
};

// edit Product
export const editProduct = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.patch(`/products/${id}`, formData, config);
    // console.log({ createProduct: res });
    // console.log({ formData });
    dispatch({
      type: EDIT_PRODUCT_CL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
    // console.log({ err });
  }
};

// Get all products
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.data.products,
    });
    // console.log({ res });
  } catch (err) {
    // console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get product
export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data.data.product,
    });
    // console.log({ res });
  } catch (err) {
    // console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get item
export const getItem = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/items/${id}`);

    dispatch({
      type: GET_ITEM,
      payload: res.data.data.item,
    });
    // console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get items
export const getItems = () => async (dispatch) => {
  try {
    const res = await axios.get(`/products/items?_limit=2`);

    dispatch({
      type: GET_ITEMS,
      payload: res.data.data.items,
    });
    // console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get item history warehouse
export const getItemHistory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/items/${id}/history`);

    dispatch({
      type: GET_ITEM_HISTORY_WH,
      payload: res.data.data.history,
    });
    // console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get product history client
export const getHistory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/${id}/history`);

    dispatch({
      type: GET_HISTORY_CL,
      payload: res.data.data.history,
    });
    // console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get product items - warehouse
export const getProductItems = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/${id}/items`);

    dispatch({
      type: GET_PRODUCT_ITEMS,
      payload: res.data.data,
    });
    // console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get items for product - client
export const getItemsForProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/${id}/items`);

    dispatch({
      type: GET_ITEMS_FOR_PRODUCT,
      payload: res.data.data.items,
    });
    // console.log({ res });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.data,
    });
  }
};
