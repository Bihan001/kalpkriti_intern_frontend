import axios from 'axios';

// If token is valid, adding it to request headers else removing it from headers if present.

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['token'] = token;
  } else {
    delete axios.defaults.headers.common['token'];
  }
};

export default setAuthToken;
