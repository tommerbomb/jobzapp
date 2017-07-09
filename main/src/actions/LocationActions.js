import firebase from 'firebase';
import {
  ONLINE_BUTTON_PRESSED,
  OFFLINE_BUTTON_PRESSED
} from './types';

export const goOnline = () => {
  return (dispatch) => {
    dispatch({ type: ONLINE_BUTTON_PRESSED });
    updateUserOnlineStatus(true);
  };
};

export const goOffline = () => {
  return (dispatch) => {
    dispatch({ type: OFFLINE_BUTTON_PRESSED });
    updateUserOnlineStatus(false);
  };
};

function updateUserOnlineStatus(onlineStatus) {
  const currentUser = firebase.auth().currentUser;
  firebase.database().ref(`/users/${currentUser.uid}/status/online`)
    .set(onlineStatus);
}
