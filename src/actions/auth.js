// CONTAINS ALL ENDPOINTS TO BACKEND RELATED TO USERS

import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  CREATE_USER,
  GET_USERS,
} from './types';

import { HOST } from './config';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`${HOST}/user/getUser`);
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getUsers`);
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${HOST}/deleteUserAccount/${id}`);
    dispatch(getUsers());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`${HOST}/user/login`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
    dispatch(loadUser());
  } catch (err) {
    alert(err.response.data.data.error);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const createUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/user/createUser`, formData, config);
    alert('Account created successfully');
    dispatch({
      type: CREATE_USER,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const completeAccount = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/user/completeAccount/${formData.token}`, formData, config);
    dispatch(
      login({
        email: res.data.data.user.email,
        password: res.data.data.user.password,
      })
    );
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const changePassword = (password) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/user/changePassword`, { password }, config);
    dispatch(loadUser());
    alert('Changed Password');
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const getOperators = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getOperators`);
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const sendVerificationEmail = (email) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/user/forgotPassword/${email}`);
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const resetPassword = (formData) => async (dispatch) => {
  try {
    console.log('reset');
    const res = await axios.post(`${HOST}/user/resetPassword/${formData.token}`, formData, config);
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};
