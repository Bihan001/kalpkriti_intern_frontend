// CONTAINS ALL ENDPOINTS TO BACKEND RELATED TO VIDEO ACTIVITY

import axios from 'axios';
import { getVideos } from './deals';
import { CREATE_ACTIVITY, GET_ACTIVITY, GET_ACTIVITIES, DELETE_ACTIVITY, EDIT_ACTIVITY } from './types';

import { HOST } from './config';

// To send JSON type body in requests
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getActivity = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getActivity/${id}`);
    dispatch({
      type: GET_ACTIVITY,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const getActivities = (video_id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getActivities/${video_id}`);
    dispatch({
      type: GET_ACTIVITIES,
      payload: res.data.data,
    });
    dispatch(getVideos());
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const createActivity = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/createActivity`, formData, config);
    dispatch({
      type: CREATE_ACTIVITY,
      payload: res.data.data,
    });
    alert(res.data.data.message);
    dispatch(getActivities(formData.video_id));
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const editActivity = ({ formData, history }) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/editActivity`, formData, config);
    dispatch({
      type: EDIT_ACTIVITY,
      payload: res.data.data,
    });
    alert(res.data.data.message);
    history.push('/dashboard');
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const deleteActivity = ({ id, video_id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`${HOST}/deleteActivity/${id}`);
    dispatch({
      type: DELETE_ACTIVITY,
      payload: res.data.data,
    });
    alert(res.data.data.message);
    dispatch(getActivities(video_id));
    dispatch(getVideos());
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};
