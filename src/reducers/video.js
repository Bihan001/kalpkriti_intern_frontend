import { GET_VIDEO, GET_VIDEOS } from '../actions/types';

const initialStates = {
  video: null,
  videos: null,
  orange_count: 0,
  red_count: 0,
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_VIDEO:
      return {
        ...state,
        video: payload.video,
      };
    case GET_VIDEOS:
      return {
        ...state,
        orange_count: payload.orange_count,
        red_count: payload.red_count,
        videos: payload.videos,
      };
    default:
      return state;
  }
}
