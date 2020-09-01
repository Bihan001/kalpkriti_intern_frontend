import {
  CREATE_ACTIVITY,
  GET_ACTIVITY,
  GET_ACTIVITIES,
  EDIT_ACTIVITY,
  DELETE_ACTIVITY,
} from '../actions/types';

const initialStates = {
  activity: null,
  activities: null,
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ACTIVITY:
      return {
        ...state,
        activity: payload.activity,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload.activities,
      };
    default:
      return state;
  }
}
