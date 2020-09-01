// CONTAINS ALL ENDPOINTS TO BACKEND RELATED TO DEALS

import axios from 'axios';

import { NEW_VIDEO, GET_VIDEO, GET_VIDEOS, GET_CREATORS } from './types';
import { getCustomer, getCustomers } from './contact';
import { getCreator } from './creator';
import { HOST } from './config';
import { getAllTasks } from './task';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getVideo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getVideo/${id}`);
    dispatch({
      type: GET_VIDEO,
      payload: res.data.data,
    });
    res.data.data.video.assigned_to && dispatch(getCreator(res.data.data.video.assigned_to));
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const getVideos = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getVideos`);
    dispatch({
      type: GET_VIDEOS,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const updateDealStage = ({ id, deal_stage }) => async (dispatch) => {
  try {
    await axios.post(`${HOST}/updateDealStage`, { id, deal_stage }, config);
    dispatch(getVideos());
    dispatch(getAllTasks());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const newVideo = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/newVideo`, formData, config);
    dispatch(getVideos());
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const editVideo = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/editVideo`, formData, config);
    dispatch(getVideos());
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const clearAssignedCreator = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/clearAssigned/${id}`);
    dispatch(getVideos());
    dispatch(getVideo(id));
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const findPossibleCreatorsinVideo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/findPossibleCreatorsinVideo/${id}`);
    dispatch({
      type: GET_CREATORS,
      payload: res.data.data.creators,
    });
    dispatch(getVideo(id));
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const changeCreator = ({ video_id, creator_user_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/changeCreator`, { video_id, creator_user_id }, config);
    dispatch(getVideos());
    dispatch(getVideo(video_id));
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};
