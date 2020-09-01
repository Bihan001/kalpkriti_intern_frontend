// CONTAINS ALL ENDPOINTS TO BACKEND RELATED TO TASKS

import axios from 'axios';
import { getVideo } from './deals';
import { GET_TASK, GET_TASKS } from './types';

import { HOST } from './config';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getTask = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getTask/${id}`);
    dispatch({
      type: GET_TASK,
      payload: res.data.data,
    });
    res.data.data.task.video_id && dispatch(getVideo(res.data.data.task.video_id));
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const getCustomTasks = (filter) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/getTasks`, filter, config);
    dispatch({
      type: GET_TASKS,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const getAllTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getAllTasks`);
    dispatch({
      type: GET_TASKS,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const createTask = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/createTask`, formData, config);
    dispatch(getAllTasks());
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const editTask = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/editTask/${formData.id}`, formData, config);
    dispatch(getTask(formData.id));
    dispatch(getAllTasks());
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${HOST}/deleteTask/${id}`);
    dispatch(getAllTasks());
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};

export const setTaskComplete = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/setTaskComplete/${id}`);
    dispatch(getTask(id));
    dispatch(getAllTasks());
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
  }
};
