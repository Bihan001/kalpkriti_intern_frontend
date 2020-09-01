import { combineReducers } from 'redux';
import user from './user';
import customer from './customer';
import video from './video';
import activity from './activity';
import creator from './creator';
import language from './language';
import task from './task';
export default combineReducers({
  user,
  customer,
  video,
  activity,
  creator,
  language,
  task,
});
