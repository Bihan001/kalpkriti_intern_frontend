import { GET_TASK, GET_TASKS } from '../actions/types';

const initialStates = {
  task: null,
  tasks: [],
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TASK:
      return {
        ...state,
        task: payload.task,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: payload.tasks,
      };
    default:
      return state;
  }
}
