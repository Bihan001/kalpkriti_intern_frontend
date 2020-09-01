// CONTAINS ALL ENDPOINTS TO BACKEND RELATED TO CUSTOMERS

import axios from 'axios';

import { CREATE_CUSTOMER, GET_CUSTOMERS, GET_CUSTOMER, EDIT_CUSTOMER, ADD_MONEY } from './types';

import { HOST } from './config';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createCustomer = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/createCustomer`, formData, config);
    dispatch({
      type: CREATE_CUSTOMER,
      payload: res.data.data,
    });
    dispatch(getCustomers());
    alert(res.data.data.message);
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const getCustomer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getCustomer/${id}`);
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const getCustomers = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/getCustomers`, formData || {}, config);
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const editCustomer = ({ formData, history }) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/editCustomer`, formData, config);
    dispatch({
      type: EDIT_CUSTOMER,
      payload: res.data.data,
    });
    dispatch(getCustomer(formData.id));
    dispatch(getCustomers());
    history.push('/dashboard');
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const addMoney = (submitData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/addMoney`, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({
      type: ADD_MONEY,
      payload: res.data.data,
    });
    dispatch(getCustomers());
    alert('Money Added');
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${HOST}/deleteCustomer/${id}`);
    dispatch(getCustomers());
  } catch (err) {
    alert(err.response.data.data.error);
  }
};

export const touched = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/touched/${id}`);
    dispatch(getCustomers());
    alert('Touched');
  } catch (err) {
    alert(err.response.data.data.error);
  }
};
