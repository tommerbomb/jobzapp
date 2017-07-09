import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import LocationReducer from './LocationReducer';


export default combineReducers({
  auth: AuthReducer,
  register: RegisterReducer,
  location: LocationReducer
});
