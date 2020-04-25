import { combineReducers } from 'redux';
import deleteTasksListReducer from './deleteTasksListReducer';
import loggedInReducer from './loggedInReducer';

export default combineReducers({
    loggedIn: loggedInReducer,
});
