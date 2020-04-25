import { combineReducers } from 'redux';
import loggedInReducer from './loggedInReducer';

export default combineReducers({
    loggedIn: loggedInReducer,
});
