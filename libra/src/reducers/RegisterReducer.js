import {
  REGISTER_USER,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  MOBILE_NUMBER_CHANGED,
  REGISTER_EMAIL_CHANGED,
  REGISTER_PASSWORD_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  mobileNumber: '',
  email: '',
  password: '',
  loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };
    case MOBILE_NUMBER_CHANGED:
      return { ...state, mobileNumber: action.payload };
    case REGISTER_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case REGISTER_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case REGISTER_USER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
