import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_RESET
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
  dispatch({ type: LOGIN_USER });
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      loginUserSuccess(dispatch, user);
      firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/status/loggedIn`)
              .set(true);
    })
        .catch(() => loginUserFail(dispatch));
  };
};

export const logoutUser = () => {
  return dispatch => {
    const currentUser = firebase.auth().currentUser;
    const DB = firebase.database();
    DB.ref(`/users/${currentUser.uid}/status/loggedIn`)
      .set(false);
    DB.ref(`/users/${currentUser.uid}/status/online`)
      .set(false);
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: LOGOUT_USER });
      });
  };
};

export const loginReset = () => {
  return dispatch => {
    dispatch({ type: LOGIN_RESET });
  };
};

const loginUserFail = (dispatch) => {
   dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
   dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  //  dispatch({ type: LOGGED_IN });
   Actions.main();
};
