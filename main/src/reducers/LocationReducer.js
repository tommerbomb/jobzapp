import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../styles/GlobalStyles';
import {
LOCATION_CHANGED,
ONLINE_BUTTON_PRESSED,
OFFLINE_BUTTON_PRESSED
} from '../actions/types.js';


const INITIAL_STATE = {
  screenLocation: {
    latitude: 122,
    longitude: 40,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05
  },
  markerLocation: {
    latitude: 122,
    longitude: 40
  },
  errorMessage: null,
  loaded: false,
  showModal: false,
  pinColor: BACKGROUND_COLOR,
  onlineButtonText: 'Go Online',
  online: false,
  buttonDisabled: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_CHANGED:
    return { ...state, location: action.payload };
    case OFFLINE_BUTTON_PRESSED:
    console.log('OFFLINE_BUTTON_PRESSED reducer case firing');
    return { ...state, pinColor: BACKGROUND_COLOR, online: false, onlineButtonText: 'Go Online' };
    case ONLINE_BUTTON_PRESSED:
    console.log('ONLINE_BUTTON_PRESSED reducer case firing');
    return { ...state, pinColor: BUTTON_COLOR, online: true, onlineButtonText: 'Go Offline' };
    default:
    return state;
  }
};
