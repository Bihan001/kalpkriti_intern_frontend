import {
  GET_CREATOR,
  GET_CREATORS,
  CREATE_CREATOR,
  EDIT_CREATOR,
  DELETE_CREATOR,
} from '../actions/types';

const initialStates = {
  creator: null,
  creators: null,
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CREATOR:
      return {
        ...state,
        creator: payload,
      };
    case GET_CREATORS:
      return {
        ...state,
        creators: payload,
      };
    default:
      return state;
  }
}
