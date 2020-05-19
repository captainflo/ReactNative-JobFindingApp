import { combineReducers } from 'redux';
import auth from './auth_reducers';

export default combineReducers({
  auth: auth,
});
