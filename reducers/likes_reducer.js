import _ from 'lodash';
import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';
import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants';

export default function (state = [], action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_JOB:
      // only capture one job and not duplicate job
      // contain new array where the new job ha has liked and push with the other
      // loadash will take unique job by jobkey
      return _.unionBy([action.payload, ...state], 'jobkey');
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
