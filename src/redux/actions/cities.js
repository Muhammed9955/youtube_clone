import axios from "axios";
import {
  GET_CITIES,
  GET_CITY,
  EDIT_CITY,
  ADD_CITY,
  CITY_ERROR,
} from "../types";

// Get cities
export const getCities = (limit = 10) => async (dispatch) => {
  try {
    const res = await axios.get(`/cities`);

    dispatch({
      type: GET_CITIES,
      payload: res.data.data.cities,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: CITY_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Get city
export const getCity = (cityName) => async (dispatch) => {
  try {
    const res = await axios.get(`/cities/${cityName}/`);

    dispatch({
      type: GET_CITY,
      payload: res.data.data.city,
    });
    return res.data.data.city;
  } catch (err) {
    console.log({ err });
    dispatch({
      type: CITY_ERROR,
      payload: err.response.data.data,
    });
  }
};
// Add city
export const addCity = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/cities/`, formData, config);

    dispatch({
      type: ADD_CITY,
      payload: res.data.data.user,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: CITY_ERROR,
      payload: err.response.data.data,
    });
  }
};

// Edit City
export const editCity = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.patch(`/cities/${id}/`, formData, config);

    dispatch({
      type: EDIT_CITY,
      payload: res.data.data.user,
    });
  } catch (err) {
    console.log({ err });
    dispatch({
      type: CITY_ERROR,
      payload: err.response?.data?.data,
    });
  }
};
