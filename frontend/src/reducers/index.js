import { combineReducers } from 'redux';
import loggedInReducer from './loggedInReducer';
import accessTokenReducer from './accessTokenReducer';
import refreshTokenReducer from './refreshTokenReducer';
import uidReducer from './userIdReducer'
import emailReducer from './emailReducer'
import fnameReducer from './firstNameReducer'
import usernameReducer from './usernameReducer'

export default combineReducers({
    loggedIn: loggedInReducer,
    accessToken: accessTokenReducer,
    refreshToken: refreshTokenReducer,
    uid: uidReducer,
    userEmail: emailReducer,
    firstName: fnameReducer,
    userName: usernameReducer,
});
