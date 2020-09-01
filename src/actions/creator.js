// CONTAINS ALL ENDPOINTS TO BACKEND RELATED TO CREATORS

import axios from 'axios';
import { getVideos } from './deals';
import { GET_CREATOR, GET_CREATORS, EDIT_CREATOR, CREATE_CREATOR, DELETE_CREATOR } from './types';

import { HOST } from './config';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getCreator = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getCreator/${id}`);
    console.log(res);
    dispatch({
      type: GET_CREATOR,
      payload: res.data.data.creator,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCreators = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getCreators`);
    dispatch({
      type: GET_CREATORS,
      payload: res.data.data.creators,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createCreator = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/createCreator`, formData, config);
    dispatch({
      type: CREATE_CREATOR,
      payload: res.data.data,
    });
    alert(res.data.data.message);
    dispatch(getCreators());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const editCreator = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/editCreator`, formData, config);
    dispatch({
      type: EDIT_CREATOR,
      payload: res.data.data,
    });
    alert(res.data.data.message);
    dispatch(getCreators());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const updatePaymentDue = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/updatePaymentDue`, formData, config);
    alert(res.data.data.message);
    dispatch(getCreators());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const deleteCreator = (user_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${HOST}/deleteCreator/${user_id}`);
    dispatch(getCreators());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const setCreatorAvailability = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/setCreatorAvailability`, formData, config);
    dispatch(getCreators());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const assignVideosToCreator = (user_id) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/assignVideosToCreator`, { user_id }, config);
    dispatch(getCreators());
    alert(`Number of videos assigned: ${res.data.data.videos.length}`);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const findPossibleCreators = (language) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/findPossibleCreators/${language}`);
    dispatch({
      type: GET_CREATORS,
      payload: res.data.data.creators,
    });
  } catch (err) {
    console.log(err);
  }
};
