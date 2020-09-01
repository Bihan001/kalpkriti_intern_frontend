import { GET_LANGUAGES } from '../actions/types';

const initialStates = {
  languages: [],
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LANGUAGES:
      return {
        ...state,
        languages: payload.languages,
      };
    default:
      return state;
  }
}
