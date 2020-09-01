// CONTAINS ALL ENDPOINTS TO BACKEND RELATED TO LANGUAGE

// Mainly fixed, there won't be much of a change here, I guess.

import axios from 'axios';

import { GET_LANGUAGES } from './types';

import { HOST } from './config';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getLanguages = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/getLanguages`);
    dispatch({
      type: GET_LANGUAGES,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.data.error);
  }
};
