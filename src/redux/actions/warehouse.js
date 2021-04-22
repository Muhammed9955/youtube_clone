import axios from "axios";
import { GET_WAREHOUSES, GET_WAREHOUS, WAREHOUS_ERROR } from "../types";

// Get warehosue
export const getWarehouse = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/warehouses/${id}/?_populate=managers`);

    dispatch({
      type: GET_WAREHOUS,
      payload: res.data.data.warehouse,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: WAREHOUS_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Get all warehouses
export const getWarehouses = () => async (dispatch) => {
  try {
    const res = await axios.get("/warehouses");

    dispatch({
      type: GET_WAREHOUSES,
      payload: res.data.data.warehouses,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: WAREHOUS_ERROR,
      payload: err.response.data.data,
    });
  }
};
