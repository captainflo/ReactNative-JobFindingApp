import { combineReducers } from 'redux';
import auth from './auth_reducers';
import jobs from './jobs_reducers';
import likedJobs from './likes_reducer';

export default combineReducers({
  auth: auth,
  jobs: jobs,
  likedJobs: likedJobs,
});
