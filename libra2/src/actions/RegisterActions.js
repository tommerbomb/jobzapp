import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  REGISTER_USER,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  MOBILE_NUMBER_CHANGED,
  REGISTER_EMAIL_CHANGED,
  REGISTER_PASSWORD_CHANGED,
  REGISTER_RESET
} from '../actions/types';

export const firstNameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};

export const lastNameChanged = (text) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text
  };
};

export const registerEmailChanged = (text) => {
  return {
    type: REGISTER_EMAIL_CHANGED,
    payload: text
  };
};

export const mobileNumberChanged = (text) => {
  return {
    type: MOBILE_NUMBER_CHANGED,
    payload: text
  };
};

export const registerPasswordChanged = (text) => {
  return {
    type: REGISTER_PASSWORD_CHANGED,
    payload: text
  };
};

export const registerReset = () => {
  return dispatch => {
    dispatch({ type: REGISTER_RESET });
  };
};


export const createUser = ({ firstName, lastName, mobileNumber, email, password }) => {
  return (dispatch) => {
    console.log('creating user');
    dispatch({ type: REGISTER_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        registerUserSuccess(dispatch, user, email, password);
        addUserInfo(firstName, lastName, mobileNumber, email);
      })
        .catch((error) => {
          console.log(error);
          dispatch({ type: REGISTER_USER_FAIL, payload: error });
        });
  };
};

const addUserInfo = (firstName, lastName, mobileNumber, email) => {
  const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/info`)
      .push({ firstName, lastName, mobileNumber, email })
      .then(() => {
        Actions.main();
      });
};

const registerUserSuccess = (dispatch, user, email, password) => {
  // dispatch({ type: REGISTER_USER_SUCCESS });
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => dispatch({ type: LOGIN_USER_SUCCESS, payload: user }));
};
