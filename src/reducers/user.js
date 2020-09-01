import {
  USER_LOADED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  GET_USERS,
} from '../actions/types';

const initialStates = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  request: {
    loginRequest: false,
  },
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          loginRequest: true,
        },
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        request: {
          loginRequest: false,
        },
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
        request: {
          loginRequest: false,
        },
      };
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload.users,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        request: {
          loginRequest: false,
        },
      };
    default:
      return state;
  }
}
