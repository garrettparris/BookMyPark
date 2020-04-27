import { combineReducers } from 'redux';
import loggedInReducer from './loggedInReducer';
import accessTokenReducer from './accessTokenReducer';
import refreshTokenReducer from './refreshTokenReducer';

export default combineReducers({
    loggedIn: loggedInReducer,
    accessToken: accessTokenReducer,
    refreshToken: refreshTokenReducer,
});
