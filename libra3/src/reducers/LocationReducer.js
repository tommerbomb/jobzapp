import {
LOCATION_CHANGED
} from '../actions/types.js';

const INITIAL_STATE = {
  location: {
    latitude: 122,
    longitude: 40,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_CHANGED:
    return { ...state, location: action.payload };
    default:
    return state;
  }
};
