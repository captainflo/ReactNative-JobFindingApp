import axios from 'axios';
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
// Location.setApiKey(process.env.GOOGLE_API_KEY);
// used to take raw javascript object and turning into url save query string
import qs from 'qs';
// Because you need to have key valid for indeed lets play with json data
import JOB_DATA from './IndeedJobData.json';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
};

const buildJobsUrl = (zip) => {
  //  ... mean passing all the entire job query programs object
  //  and also the zip code on top of it
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // const { latitude, longitude } = region;

    // const zip = await Location.reverseGeocodeAsync({
    //   latitude,
    //   longitude,
    // }).catch((error) => {
    //   return console.log(error);
    // });

    // const url = buildJobsUrl(zip);
    // let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: JOB_DATA });
    callback();
    console.log(JOB_DATA);
  } catch (err) {
    console.error(err);
  }
};

export const likeJob = (job) => {
  return { payload: job, type: LIKE_JOB };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
